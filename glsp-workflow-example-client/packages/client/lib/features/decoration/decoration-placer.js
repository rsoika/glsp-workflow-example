"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var GlspDecorationPlacer_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.GlspDecorationPlacer = void 0;
const inversify_1 = require("inversify");
const sprotty_1 = require("sprotty");
let GlspDecorationPlacer = GlspDecorationPlacer_1 = class GlspDecorationPlacer extends sprotty_1.DecorationPlacer {
    getPosition(element) {
        if (element instanceof sprotty_1.SChildElement && element.parent instanceof sprotty_1.SRoutableElement) {
            return super.getPosition(element);
        }
        if (sprotty_1.isSizeable(element)) {
            return {
                x: GlspDecorationPlacer_1.DECORATION_OFFSET.x * element.bounds.width,
                y: GlspDecorationPlacer_1.DECORATION_OFFSET.y * element.bounds.height
            };
        }
        return sprotty_1.ORIGIN_POINT;
    }
};
GlspDecorationPlacer.DECORATION_OFFSET = { x: 12, y: 10 };
GlspDecorationPlacer = GlspDecorationPlacer_1 = __decorate([
    inversify_1.injectable()
], GlspDecorationPlacer);
exports.GlspDecorationPlacer = GlspDecorationPlacer;
//# sourceMappingURL=decoration-placer.js.map