"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CornerRadius = exports.EdgePadding = exports.GArgument = void 0;
const argumentable_1 = require("../base/argumentable");
var GArgument;
(function (GArgument) {
    function asNumber(argValue) {
        return typeof argValue === 'number' ? argValue : undefined;
    }
    GArgument.asNumber = asNumber;
    function asNumbers(argValues) {
        return argValues.map(asNumber);
    }
    GArgument.asNumbers = asNumbers;
    function asString(argValue) {
        return typeof argValue === 'string' ? argValue : undefined;
    }
    GArgument.asString = asString;
    function asStrings(argValues) {
        return argValues.map(asString);
    }
    GArgument.asStrings = asStrings;
    function asBoolean(argValue) {
        return typeof argValue === 'boolean' ? argValue : undefined;
    }
    GArgument.asBoolean = asBoolean;
    function asBooleans(argValues) {
        return argValues.map(asBoolean);
    }
    GArgument.asBooleans = asBooleans;
    function getArgument(element, key) {
        return argumentable_1.hasArguments(element) ? element.args[key] : undefined;
    }
    GArgument.getArgument = getArgument;
    function getNumber(element, key) {
        return argumentable_1.hasArguments(element) ? asNumber(element.args[key]) : undefined;
    }
    GArgument.getNumber = getNumber;
    function getString(element, key) {
        return argumentable_1.hasArguments(element) ? asString(element.args[key]) : undefined;
    }
    GArgument.getString = getString;
    function getBoolean(element, key) {
        return argumentable_1.hasArguments(element) ? asBoolean(element.args[key]) : undefined;
    }
    GArgument.getBoolean = getBoolean;
    function getArguments(element, ...keys) {
        if (!argumentable_1.hasArguments(element)) {
            return undefined;
        }
        const values = [];
        for (const key of keys) {
            const value = element.args[key];
            if (value) {
                values.push(value);
            }
        }
        return values;
    }
    GArgument.getArguments = getArguments;
    function getNumbers(element, ...keys) {
        const values = getArguments(element, ...keys);
        return values ? asNumbers(values) : undefined;
    }
    GArgument.getNumbers = getNumbers;
    function getStrings(element, ...keys) {
        const values = getArguments(element, ...keys);
        return values ? asStrings(values) : undefined;
    }
    GArgument.getStrings = getStrings;
    function getBooleans(element, ...keys) {
        const values = getArguments(element, ...keys);
        return values ? asBooleans(values) : undefined;
    }
    GArgument.getBooleans = getBooleans;
    function hasNValues(values, length) {
        return values.length === length && values.filter(e => e === undefined).length === 0;
    }
    GArgument.hasNValues = hasNValues;
})(GArgument = exports.GArgument || (exports.GArgument = {}));
var EdgePadding;
(function (EdgePadding) {
    const KEY = 'edgePadding';
    function from(element) {
        return GArgument.getNumber(element, KEY);
    }
    EdgePadding.from = from;
})(EdgePadding = exports.EdgePadding || (exports.EdgePadding = {}));
class CornerRadius {
    constructor(topLeft = 0, topRight = topLeft, bottomRight = topLeft, bottomLeft = topRight) {
        this.topLeft = topLeft;
        this.topRight = topRight;
        this.bottomRight = bottomRight;
        this.bottomLeft = bottomLeft;
    }
    static from(element) {
        const radius = GArgument.getNumbers(element, this.KEY_RADIUS_TOP_LEFT, this.KEY_RADIUS_TOP_RIGHT, this.KEY_RADIUS_BOTTOM_RIGHT, this.KEY_RADIUS_BOTTOM_LEFT);
        if (radius === undefined || radius[0] === undefined) {
            return undefined;
        }
        return GArgument.hasNValues(radius, 4) ? new CornerRadius(radius[0], radius[1], radius[2], radius[3]) : new CornerRadius(radius[0]);
    }
}
exports.CornerRadius = CornerRadius;
CornerRadius.NO_RADIUS = new CornerRadius(0);
CornerRadius.KEY_RADIUS_TOP_LEFT = 'radiusTopLeft';
CornerRadius.KEY_RADIUS_TOP_RIGHT = 'radiusTopRight';
CornerRadius.KEY_RADIUS_BOTTOM_RIGHT = 'radiusBottomRight';
CornerRadius.KEY_RADIUS_BOTTOM_LEFT = 'radiusBottomLeft';
//# sourceMappingURL=argument-utils.js.map