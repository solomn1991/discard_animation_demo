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
var DiscardBlock = (function (_super) {
    __extends(DiscardBlock, _super);
    function DiscardBlock() {
        var _this = _super.call(this) || this;
        _this.poker_controllers = {};
        _this.min_space = 30;
        _this.max_space = 40;
        _this.verticalCenter = 1;
        _this.horizontalCenter = 1;
        _this.tbm = new TweenBatchManager();
        _this.init_poker_values = [
            "1", "2",
            "3", "4", "5", "6", "7", "8",
            "1", "2", "3", "4", "5", "6", "7", "8",
            "1", "2", "3", "4", "5", "6", "7", "8",
            "1", "2", "3", "4", "5", "6", "7", "8",
            "1", "2", "3", "4", "5", "6", "7", "8",
            "1", "2", "3", "4", "5", "6", "7", "8",
        ];
        return _this;
    }
    DiscardBlock.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    DiscardBlock.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.init_pokers(); //发牌
    };
    DiscardBlock.prototype.get_last_poker_position = function () {
        var child_count = this.pokers.numChildren;
        var last_poker_position;
        if (!child_count) {
            last_poker_position = { x: this.width / 2, y: this.height / 2, is_first_poker: true };
        }
        else {
            var last_poker = this.pokers.getChildAt(this.pokers.numChildren - 1);
            last_poker_position = { x: last_poker.x, y: last_poker.y, is_first_poker: false };
        }
        return last_poker_position;
    };
    DiscardBlock.prototype.adjust_all_cards = function (callback, callbackThisObj) {
        if (callback === void 0) { callback = null; }
        if (callbackThisObj === void 0) { callbackThisObj = null; }
        var callbackArgs = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            callbackArgs[_i - 2] = arguments[_i];
        }
        //计算中间空的距离inner_space和牌之间的距离
        var card_width = this.height / Poker.height_width_rate;
        var inner_space = this.width - card_width; //中间可以空的距离
        var space;
        if (this.pokers.numChildren != 0) {
            space = inner_space / (this.pokers.numChildren - 1);
            console.log("space", space);
            if (space > this.max_space) {
                space = this.max_space;
            }
            else if (space < this.min_space) {
                space = this.min_space;
            }
        }
        else {
            space = 0;
        }
        inner_space = space * (this.pokers.numChildren - 1);
        var start_x = this.width / 2 - (inner_space / 2);
        for (var i = 0; i < this.pokers.numChildren; i++) {
            var des_x = start_x + i * space;
            var poker = this.pokers.getChildAt(i);
            var tw = poker.tween.to({ x: des_x }, 400).setPaused(false);
            this.tbm.add_tween(tw);
        }
        (_a = this.tbm).BatchPlay.apply(_a, [callback, callbackThisObj].concat(callbackArgs));
        var _a;
    };
    DiscardBlock.prototype.init_pokers = function () {
        // 获取最后一张牌的位置
        var poker_value = this.init_poker_values.shift();
        if (poker_value == undefined) {
            return;
        }
        var poker = new Poker(poker_value, this.height);
        var last_poker_position = this.get_last_poker_position();
        poker.x = last_poker_position.x;
        poker.y = last_poker_position.y;
        // 添加牌的位置到最后一张牌上
        this.pokers.addChild(poker); //不知道能不能回调
        // console.log(poker_value);
        // 调整所有牌的位置
        this.adjust_all_cards(this.init_pokers, this);
    };
    DiscardBlock.prototype.add_poker = function (poker_values) {
        // 创建对象
        var pokers = [];
        for (var _i = 0, poker_values_1 = poker_values; _i < poker_values_1.length; _i++) {
            var poker_value = poker_values_1[_i];
            pokers.push({
                poker_ui: new Poker(poker_value, this.height),
                position: 0
            });
        }
        // 找到对象应该插入的位置
        // 插入对象
        // 调整对象,
    };
    return DiscardBlock;
}(eui.Component));
__reflect(DiscardBlock.prototype, "DiscardBlock", ["eui.UIComponent", "egret.DisplayObject"]);
//# sourceMappingURL=DiscardBlock.js.map