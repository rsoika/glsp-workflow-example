"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isArrayMatching = exports.isStringArray = exports.isArrayOfPrimitive = exports.isArrayOfClass = exports.isArrayOfType = exports.distinctAdd = exports.flatPush = exports.remove = void 0;
function remove(array, value) {
    const index = array.indexOf(value);
    if (index >= 0) {
        array.splice(index, 1);
        return true;
    }
    return false;
}
exports.remove = remove;
function flatPush(array, toPush) {
    toPush.forEach(value => (Array.isArray(value) ? array.push(...value) : array.push(value)));
}
exports.flatPush = flatPush;
function distinctAdd(array, value) {
    if (!array.includes(value)) {
        array.push(value);
        return true;
    }
    return false;
}
exports.distinctAdd = distinctAdd;
function isArrayOfType(object, typeGuard, supportEmpty = false) {
    return isArrayMatching(object, element => typeGuard(element), supportEmpty);
}
exports.isArrayOfType = isArrayOfType;
function isArrayOfClass(object, className, supportEmpty = false) {
    return isArrayMatching(object, element => element instanceof className, supportEmpty);
}
exports.isArrayOfClass = isArrayOfClass;
function isArrayOfPrimitive(object, primitiveType, supportEmpty = false) {
    return isArrayMatching(object, element => typeof element === primitiveType, supportEmpty);
}
exports.isArrayOfPrimitive = isArrayOfPrimitive;
function isStringArray(object, supportEmpty = false) {
    return isArrayOfPrimitive(object, 'string', supportEmpty);
}
exports.isStringArray = isStringArray;
function isArrayMatching(object, predicate, supportEmpty = false) {
    return Array.isArray(object) && object.every(predicate) && (supportEmpty || object.length > 0);
}
exports.isArrayMatching = isArrayMatching;
//# sourceMappingURL=array-util.js.map