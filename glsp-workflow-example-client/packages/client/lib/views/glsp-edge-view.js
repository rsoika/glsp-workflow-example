"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GEdgeView = void 0;
const inversify_1 = require("inversify");
const sprotty_1 = require("sprotty");
const argument_utils_1 = require("../utils/argument-utils");
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const JSX = { createElement: sprotty_1.svg };
let GEdgeView = class GEdgeView extends sprotty_1.PolylineEdgeView {
    render(edge, context) {
        const router = this.edgeRouterRegistry.get(edge.routerKind);
        const route = router.route(edge);
        if (route.length === 0) {
            return this.renderDanglingEdge('Cannot compute route', edge, context);
        }
        return (JSX.createElement("g", Object.assign({ "class-sprotty-edge": true, "class-mouseover": edge.hoverFeedback }, this.addtionalClasses(edge, context)),
            this.renderLine(edge, route, context),
            this.renderAdditionals(edge, route, context),
            context.renderChildren(edge, { route })));
    }
    addtionalClasses(_edge, _context) {
        return {};
    }
    renderLine(_edge, segments, _context) {
        return JSX.createElement("path", { d: this.createPathForSegments(segments) });
    }
    renderAdditionals(edge, segments, _context) {
        // for additional padding we draw another transparent path with larger stroke width
        const edgePadding = argument_utils_1.EdgePadding.from(edge);
        return edgePadding ? [this.renderMouseHandle(segments, edgePadding)] : [];
    }
    renderMouseHandle(segments, padding) {
        return (JSX.createElement("path", { "class-mouse-handle": true, d: this.createPathForSegments(segments), "style-stroke-width": padding * 2, "style-stroke": 'transparent', "style-stroke-dasharray": 'none', "style-stroke-dashoffset": '0' }));
    }
    createPathForSegments(segments) {
        const firstPoint = segments[0];
        let path = `M ${firstPoint.x},${firstPoint.y}`;
        for (let i = 1; i < segments.length; i++) {
            const p = segments[i];
            path += ` L ${p.x},${p.y}`;
        }
        return path;
    }
};
GEdgeView = __decorate([
    inversify_1.injectable()
], GEdgeView);
exports.GEdgeView = GEdgeView;
//# sourceMappingURL=glsp-edge-view.js.map