var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var Poker = (function (_super) {
    __extends(Poker, _super);
    function Poker(value, parent_height) {
        var _this = _super.call(this) || this;
        _this.value = value;
        _this.parent_height = parent_height;
        _this.tween = egret.Tween.get(_this);
        return _this;
    }
    Poker.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    Poker.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.poker_value.text = this.value;
        // this.height = this.parent.height;//failed,group 的宽高取决于内部元素，内部元素宽和高未计算，因此，这样取不行
        this.height = this.parent_height; //因此往外取2层，取到外层组即可
        this.width = this.height / Poker.height_width_rate;
        this.poker_bg.ellipseHeight = this.height * Poker.height_explicitHeight_rate;
        this.poker_bg.ellipseWidth = this.height * Poker.height_explicitHeight_rate;
        // console.log(this.height,this.width)
        this.anchorOffsetX = this.width / 2;
        this.anchorOffsetY = this.height / 2;
    };
    Poker.height_width_rate = 3 / 2;
    Poker.height_explicitHeight_rate = 1 / 4;
    return Poker;
}(eui.Component));
__reflect(Poker.prototype, "Poker", ["eui.UIComponent", "egret.DisplayObject"]);
//# sourceMappingURL=Poker.js.map