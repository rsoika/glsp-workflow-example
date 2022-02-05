"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toActionArray = exports.AutoCompleteWidget = void 0;
/********************************************************************************
 * Copyright (c) 2020-2021 EclipseSource and others.
 *
 * This program and the accompanying materials are made available under the
 * terms of the Eclipse Public License v. 2.0 which is available at
 * http://www.eclipse.org/legal/epl-2.0.
 *
 * This Source Code may also be made available under the following Secondary
 * Licenses when the conditions for such availability set forth in the Eclipse
 * Public License v. 2.0 are satisfied: GNU General Public License, version 2
 * with the GNU Classpath Exception which is available at
 * https://www.gnu.org/software/classpath/license.html.
 *
 * SPDX-License-Identifier: EPL-2.0 OR GPL-2.0 WITH Classpath-exception-2.0
 ********************************************************************************/
const protocol_1 = require("@eclipse-glsp/protocol");
const sprotty_1 = require("sprotty");
const iterable_1 = require("sprotty/lib/utils/iterable");
const keyboard_1 = require("sprotty/lib/utils/keyboard");
const auto_complete_actions_1 = require("./auto-complete-actions");
const validation_decorator_1 = require("./validation-decorator");
// eslint-disable-next-line @typescript-eslint/no-var-requires
const configureAutocomplete = require('autocompleter');
class AutoCompleteWidget {
    constructor(autoSuggestionSettings, suggestionProvider, suggestionSubmitHandler, 
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    notifyClose = () => { }, logger) {
        this.autoSuggestionSettings = autoSuggestionSettings;
        this.suggestionProvider = suggestionProvider;
        this.suggestionSubmitHandler = suggestionSubmitHandler;
        this.notifyClose = notifyClose;
        this.logger = logger;
        this.loadingIndicatorClasses = sprotty_1.codiconCSSClasses('loading', false, true, ['loading']);
        this.validationDecorator = validation_decorator_1.IValidationDecorator.NO_DECORATION;
    }
    configureValidation(inputValidator, validationDecorator = validation_decorator_1.IValidationDecorator.NO_DECORATION) {
        this.inputValidator = inputValidator;
        this.validationDecorator = validationDecorator;
    }
    configureTextSubmitHandler(textSubmitHandler) {
        this.textSubmitHandler = textSubmitHandler;
    }
    initialize(containerElement) {
        this.containerElement = containerElement;
        this.inputElement = this.createInputElement();
        this.containerElement.appendChild(this.inputElement);
        this.containerElement.style.position = 'absolute';
    }
    createInputElement() {
        const inputElement = document.createElement('input');
        inputElement.style.position = 'absolute';
        inputElement.spellcheck = false;
        inputElement.autocapitalize = 'false';
        inputElement.autocomplete = 'false';
        inputElement.style.width = '100%';
        inputElement.addEventListener('keydown', event => this.handleKeyDown(event));
        inputElement.addEventListener('blur', () => window.setTimeout(() => this.notifyClose(), 200));
        return inputElement;
    }
    handleKeyDown(event) {
        if (keyboard_1.matchesKeystroke(event, 'Escape')) {
            this.notifyClose();
            return;
        }
        if (keyboard_1.matchesKeystroke(event, 'Enter') && !this.isInputElementChanged() && this.isSuggestionAvailable()) {
            return;
        }
        if (this.isInputElementChanged()) {
            this.invalidateValidationResultAndContextActions();
        }
        if (!keyboard_1.matchesKeystroke(event, 'Enter') || this.isSuggestionAvailable()) {
            return;
        }
        if (!this.validationDecorator.isValidatedOk()) {
            event.stopImmediatePropagation();
            return;
        }
        if (this.textSubmitHandler) {
            this.executeFromTextOnlyInput();
            this.notifyClose();
        }
    }
    isInputElementChanged() {
        return this.inputElement.value !== this.previousContent;
    }
    invalidateValidationResultAndContextActions() {
        this.contextActions = undefined;
        this.validationDecorator.invalidate();
    }
    open(root, ...contextElementIds) {
        this.contextActions = undefined;
        this.autoCompleteResult = configureAutocomplete(this.autocompleteSettings(root));
        this.previousContent = this.inputElement.value;
        this.inputElement.setSelectionRange(0, this.inputElement.value.length);
        this.inputElement.focus();
    }
    autocompleteSettings(root) {
        return {
            input: this.inputElement,
            emptyMsg: this.autoSuggestionSettings.noSuggestionsMessage,
            className: this.autoSuggestionSettings.suggestionsClass,
            showOnFocus: this.autoSuggestionSettings.showOnFocus,
            debounceWaitMs: this.autoSuggestionSettings.debounceWaitMs,
            minLength: -1,
            fetch: (text, update) => this.updateSuggestions(update, text, root),
            onSelect: (item) => this.onSelect(item),
            render: (item, currentValue) => this.renderSuggestions(item, currentValue),
            customize: (input, inputRect, container, maxHeight) => {
                this.customizeInputElement(input, inputRect, container, maxHeight);
            }
        };
    }
    customizeInputElement(input, inputRect, container, maxHeight) {
        // move container into our UIExtension container as this is already positioned correctly
        if (this.containerElement) {
            this.containerElement.appendChild(container);
        }
    }
    updateSuggestions(update, text, root, ...contextElementIds) {
        this.onLoading();
        this.doUpdateSuggestions(text, root)
            .then(actions => {
            this.contextActions = this.filterActions(text, actions);
            update(this.contextActions);
            this.onLoaded('success');
        })
            .catch(reason => {
            if (this.logger) {
                this.logger.error(this, 'Failed to obtain suggestions', reason);
            }
            this.onLoaded('error');
        });
    }
    onLoading() {
        if (this.loadingIndicator && this.containerElement.contains(this.loadingIndicator)) {
            return;
        }
        this.loadingIndicator = document.createElement('span');
        this.loadingIndicator.classList.add(...this.loadingIndicatorClasses);
        this.containerElement.appendChild(this.loadingIndicator);
    }
    doUpdateSuggestions(text, root, ...contextElementIds) {
        return this.suggestionProvider.provideSuggestions(text);
    }
    onLoaded(_success) {
        if (this.containerElement.contains(this.loadingIndicator)) {
            this.containerElement.removeChild(this.loadingIndicator);
        }
        this.validationDecorator.invalidate();
        this.validateInputIfNoContextActions();
        this.previousContent = this.inputElement.value;
    }
    renderSuggestions(item, value) {
        const itemElement = document.createElement('div');
        const wordMatcher = this.espaceForRegExp(value).split(' ').join('|');
        const regex = new RegExp(wordMatcher, 'gi');
        if (item.icon) {
            this.renderIcon(itemElement, item.icon);
        }
        itemElement.innerHTML += item.label.replace(regex, match => '<em>' + match + '</em>');
        return itemElement;
    }
    espaceForRegExp(value) {
        return value.replace(/([.?*+^$[\]\\(){}|-])/g, '\\$1');
    }
    renderIcon(itemElement, icon) {
        itemElement.innerHTML += `<span class="icon ${icon}"></span>`;
    }
    filterActions(filterText, actions) {
        return iterable_1.toArray(actions.filter(action => {
            const label = action.label.toLowerCase();
            const searchWords = filterText.split(' ');
            return searchWords.every(word => label.indexOf(word.toLowerCase()) !== -1);
        }));
    }
    onSelect(item) {
        if (auto_complete_actions_1.isSetAutoCompleteValueAction(item)) {
            this.inputElement.value = item.text;
            // trigger update of suggestions with an keyup event
            window.setTimeout(() => this.inputElement.dispatchEvent(new Event('keyup')));
        }
        else {
            this.executeFromSuggestion(item);
            this.notifyClose();
        }
    }
    validateInputIfNoContextActions() {
        if (this.isNoOrExactlyOneMatchingContextAction()) {
            this.validateInput();
        }
        else {
            this.validationDecorator.dispose();
        }
    }
    isNoOrExactlyOneMatchingContextAction() {
        return (!this.isSuggestionAvailable() ||
            (this.contextActions && this.contextActions.length === 1 && this.inputElement.value.endsWith(this.contextActions[0].label)));
    }
    isSuggestionAvailable() {
        return this.contextActions && this.contextActions.length > 0;
    }
    validateInput() {
        if (this.inputValidator) {
            this.inputValidator
                .validate(this.inputElement.value)
                .then(result => this.validationDecorator.decorateValidationResult(result))
                .catch(error => this.handleErrorDuringValidation(error));
        }
    }
    handleErrorDuringValidation(error) {
        if (this.logger) {
            this.logger.error(this, 'Failed to validate input', error);
        }
        this.validationDecorator.dispose();
    }
    executeFromSuggestion(input) {
        this.suggestionSubmitHandler.executeFromSuggestion(input);
    }
    executeFromTextOnlyInput() {
        if (this.textSubmitHandler) {
            this.textSubmitHandler.executeFromTextOnlyInput(this.inputElement.value);
        }
    }
    get inputField() {
        return this.inputElement;
    }
    dispose() {
        this.validationDecorator.dispose();
        if (this.autoCompleteResult) {
            this.autoCompleteResult.destroy();
        }
    }
}
exports.AutoCompleteWidget = AutoCompleteWidget;
function toActionArray(input) {
    if (protocol_1.isLabeledAction(input)) {
        return input.actions;
    }
    else if (protocol_1.isAction(input)) {
        return [input];
    }
    return [];
}
exports.toActionArray = toActionArray;
//# sourceMappingURL=auto-complete-widget.js.map