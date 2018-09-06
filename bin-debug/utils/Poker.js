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
        _this.is_pop_up = false;
        _this.value = value;
        _this.parent_height = parent_height;
        _this.tween = egret.Tween.get(_this);
        return _this;
        // this.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.onSelect,this)
        // this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.offSelected,this)
    }
    Poker.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    Poker.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.poker_value.text = this.value;
        // this.height = this.parent.height;//failed,group 的宽高取决于内部元素，内部元素宽和高未计算，因此，这样取不行，特此小记
        this.height = this.parent_height; //因此往外取2层，取到外层组即可
        this.width = this.height / Poker.height_width_rate;
        this.poker_bg.ellipseHeight = this.height * Poker.height_explicitHeight_rate;
        this.poker_bg.ellipseWidth = this.height * Poker.height_explicitHeight_rate;
        this.anchorOffsetX = this.width / 2;
        this.anchorOffsetY = this.height / 2;
        this.init_y = this.height / 2;
    };
    Poker.prototype.darken = function () {
        this.poker_mask.fillAlpha = 0.3;
    };
    Poker.prototype.shallower = function () {
        this.poker_mask.fillAlpha = 0;
    };
    Poker.prototype.is_point_in = function (x, y) {
        if (x > this.x - this.width / 2 && x < this.x + this.width / 2 && y < this.y - this.height / 2 && y > this.y / 2 + this.height / 2) {
            return true;
        }
        else {
            return false;
        }
    };
    Poker.prototype.pop_up = function () {
        if (!this.is_pop_up) {
            this.is_pop_up = true;
            this.y = this.y - this.height / 4;
        }
    };
    Poker.prototype.reset = function () {
        this.is_pop_up = false;
        this.y = this.init_y;
    };
    Poker.prototype.toggle = function () {
        if (this.is_pop_up) {
            this.reset();
        }
        else {
            this.pop_up();
        }
    };
    Poker.height_width_rate = 3 / 2; //牌的宽高比
    Poker.height_explicitHeight_rate = 1 / 4; //圆角大小比例
    return Poker;
}(eui.Component));
__reflect(Poker.prototype, "Poker", ["eui.UIComponent", "egret.DisplayObject"]);
//# sourceMappingURL=Poker.js.map