"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeMarquee = exports.drawMarquee = exports.MARQUEE = exports.marqueeId = exports.MarqueeEndMovingMouseListener = exports.RemoveMarqueeCommand = exports.RemoveMarqueeAction = exports.DrawMarqueeCommand = exports.DrawMarqueeAction = void 0;
const inversify_1 = require("inversify");
const sprotty_1 = require("sprotty");
const model_1 = require("./model");
class DrawMarqueeAction {
    constructor(startPoint, endPoint, kind = DrawMarqueeCommand.KIND) {
        this.startPoint = startPoint;
        this.endPoint = endPoint;
        this.kind = kind;
    }
}
exports.DrawMarqueeAction = DrawMarqueeAction;
let DrawMarqueeCommand = class DrawMarqueeCommand extends model_1.FeedbackCommand {
    constructor(action) {
        super();
        this.action = action;
    }
    execute(context) {
        drawMarquee(context, this.action.startPoint, this.action.endPoint);
        return context.root;
    }
};
DrawMarqueeCommand.KIND = 'drawMarquee';
DrawMarqueeCommand = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(sprotty_1.TYPES.Action)),
    __metadata("design:paramtypes", [DrawMarqueeAction])
], DrawMarqueeCommand);
exports.DrawMarqueeCommand = DrawMarqueeCommand;
class RemoveMarqueeAction {
    constructor(kind = RemoveMarqueeCommand.KIND) {
        this.kind = kind;
    }
}
exports.RemoveMarqueeAction = RemoveMarqueeAction;
let RemoveMarqueeCommand = class RemoveMarqueeCommand extends model_1.FeedbackCommand {
    execute(context) {
        removeMarquee(context.root);
        return context.root;
    }
};
RemoveMarqueeCommand.KIND = 'removeMarqueeCommand';
RemoveMarqueeCommand = __decorate([
    inversify_1.injectable()
], RemoveMarqueeCommand);
exports.RemoveMarqueeCommand = RemoveMarqueeCommand;
class MarqueeEndMovingMouseListener extends sprotty_1.MouseListener {
    constructor(anchorRegistry) {
        super();
        this.anchorRegistry = anchorRegistry;
    }
    mouseMove(target, event) {
        return [];
    }
}
exports.MarqueeEndMovingMouseListener = MarqueeEndMovingMouseListener;
function marqueeId(root) {
    return root.id + '_' + exports.MARQUEE;
}
exports.marqueeId = marqueeId;
exports.MARQUEE = 'marquee';
function drawMarquee(context, startPoint, endPoint) {
    const root = context.root;
    removeMarquee(root);
    const marqueeSchema = {
        type: exports.MARQUEE,
        id: marqueeId(root),
        startPoint: startPoint,
        endPoint: endPoint
    };
    const marquee = context.modelFactory.createElement(marqueeSchema);
    root.add(marquee);
}
exports.drawMarquee = drawMarquee;
function removeMarquee(root) {
    const marquee = root.index.getById(marqueeId(root));
    if (marquee instanceof sprotty_1.SChildElement) {
        root.remove(marquee);
    }
}
exports.removeMarquee = removeMarquee;
//# sourceMappingURL=marquee-tool-feedback.js.map