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
import { Action, LabeledAction, ValidationStatus } from '@eclipse-glsp/protocol';
import { AutocompleteResult, AutocompleteSettings } from 'autocompleter';
import { ILogger, SModelRoot } from 'sprotty';
import { IValidationDecorator } from './validation-decorator';
export interface AutoCompleteSettings {
    readonly noSuggestionsMessage?: string;
    readonly suggestionsClass?: string;
    readonly debounceWaitMs?: number;
    readonly showOnFocus?: boolean;
}
export interface InputValidator {
    validate(input: string): Promise<ValidationStatus>;
}
export interface SuggestionProvider {
    provideSuggestions(input: string): Promise<LabeledAction[]>;
}
export interface InputValueInitializer {
    initializeValue(containerElement: HTMLElement, root: Readonly<SModelRoot>, ...contextElementIds: string[]): string;
}
export interface SuggestionSubmitHandler {
    executeFromSuggestion(input: LabeledAction | Action | Action[]): void;
}
export interface TextSubmitHandler {
    executeFromTextOnlyInput(input: string): void;
}
export declare class AutoCompleteWidget {
    autoSuggestionSettings: AutoCompleteSettings;
    suggestionProvider: SuggestionProvider;
    suggestionSubmitHandler: SuggestionSubmitHandler;
    protected notifyClose: () => void;
    protected logger?: ILogger | undefined;
    loadingIndicatorClasses: string[];
    protected containerElement: HTMLElement;
    protected inputElement: HTMLInputElement;
    protected loadingIndicator: HTMLSpanElement;
    protected autoCompleteResult: AutocompleteResult;
    protected contextActions?: LabeledAction[];
    protected previousContent?: string;
    protected inputValidator?: InputValidator;
    protected validationDecorator: IValidationDecorator;
    protected textSubmitHandler?: TextSubmitHandler;
    constructor(autoSuggestionSettings: AutoCompleteSettings, suggestionProvider: SuggestionProvider, suggestionSubmitHandler: SuggestionSubmitHandler, notifyClose?: () => void, logger?: ILogger | undefined);
    configureValidation(inputValidator: InputValidator, validationDecorator?: IValidationDecorator): void;
    configureTextSubmitHandler(textSubmitHandler: TextSubmitHandler): void;
    initialize(containerElement: HTMLElement): void;
    protected createInputElement(): HTMLInputElement;
    protected handleKeyDown(event: KeyboardEvent): void;
    protected isInputElementChanged(): boolean;
    protected invalidateValidationResultAndContextActions(): void;
    open(root: Readonly<SModelRoot>, ...contextElementIds: string[]): void;
    protected autocompleteSettings(root: Readonly<SModelRoot>): AutocompleteSettings<LabeledAction>;
    protected customizeInputElement(input: HTMLInputElement, inputRect: ClientRect | DOMRect, container: HTMLDivElement, maxHeight: number): void;
    protected updateSuggestions(update: (items: LabeledAction[]) => void, text: string, root: Readonly<SModelRoot>, ...contextElementIds: string[]): void;
    protected onLoading(): void;
    protected doUpdateSuggestions(text: string, root: Readonly<SModelRoot>, ...contextElementIds: string[]): Promise<LabeledAction[]>;
    protected onLoaded(_success: 'success' | 'error'): void;
    protected renderSuggestions(item: LabeledAction, value: string): HTMLDivElement;
    protected espaceForRegExp(value: string): string;
    protected renderIcon(itemElement: HTMLDivElement, icon: string): void;
    protected filterActions(filterText: string, actions: LabeledAction[]): LabeledAction[];
    protected onSelect(item: LabeledAction): void;
    protected validateInputIfNoContextActions(): void;
    private isNoOrExactlyOneMatchingContextAction;
    protected isSuggestionAvailable(): boolean | undefined;
    validateInput(): void;
    protected handleErrorDuringValidation(error: Error): void;
    protected executeFromSuggestion(input: LabeledAction | Action[] | Action): void;
    protected executeFromTextOnlyInput(): void;
    get inputField(): HTMLInputElement;
    dispose(): void;
}
export declare function toActionArray(input: LabeledAction | Action[] | Action): Action[];
//# sourceMappingURL=auto-complete-widget.d.ts.map