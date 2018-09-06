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
        _this.operation_pokers = [];
        _this.min_space = 30;
        _this.max_space = 40;
        _this.verticalCenter = 1;
        _this.horizontalCenter = 1;
        _this.tbm = new TweenBatchManager();
        _this.init_poker_values = [
            "1", "2",
            "3", "4", "5",
        ];
        //滑动触发顺序begin,move,end,tap
        //点击触发顺序begin,end,tap
        _this.addEventListener(egret.TouchEvent.TOUCH_MOVE, _this.add_operation_pokers, _this);
        _this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, _this.add_operation_pokers, _this);
        _this.addEventListener(egret.TouchEvent.TOUCH_END, _this.toggle_operation_pokers, _this);
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
            var tw = poker.tween.to({ x: des_x, y: this.height / 2 }, 400).setPaused(false);
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
        // 调整所有牌的位置
        this.adjust_all_cards(this.init_pokers, this);
    };
    DiscardBlock.prototype.add_pokers = function () {
        var args = Array.prototype.slice.call(arguments, 0, arguments.length - 1);
        var poker_values = args[0];
        // 创建对象
        var pokers = [];
        // 设置牌到待调整牌的位置
        var y = this.height / 2 - this.height - 10;
        var space = 30; //待处理牌之间的间隔
        var start_x = this.width / 2 - (space * (pokers.length - 1));
        for (var i = 0; i < poker_values.length; i++) {
            var tmp_poker_value = poker_values[i];
            var tmp_poker = new Poker(tmp_poker_value, this.height);
            tmp_poker.y = y;
            tmp_poker.x = start_x + i * space;
            pokers.push(tmp_poker);
        }
        // 找到对象应该插入的位置,插入对象,先都放到最后层
        for (var _i = 0, pokers_1 = pokers; _i < pokers_1.length; _i++) {
            var poker = pokers_1[_i];
            var position = this.get_new_poker_position(poker);
            this.pokers.addChild(poker);
        }
        // 调整对象,
        egret.setTimeout(this.readjust_all_cards.bind(this, pokers), this, 800);
    };
    DiscardBlock.prototype.get_new_poker_position = function (poker) {
        return 0;
    };
    DiscardBlock.prototype.readjust_all_cards = function (pokers) {
        for (var _i = 0, pokers_2 = pokers; _i < pokers_2.length; _i++) {
            var poker = pokers_2[_i];
            var postion = this.get_new_poker_position(poker);
            this.pokers.setChildIndex(poker, postion);
        }
        this.adjust_all_cards();
    };
    DiscardBlock.prototype.add_operation_pokers = function (evt) {
        var poker = evt.target.parent;
        if (poker instanceof Poker) {
            this.add_to_operation_pokers(poker);
        }
    };
    DiscardBlock.prototype.add_to_operation_pokers = function (poker) {
        if (this.operation_pokers.indexOf(poker) == -1) {
            this.operation_pokers.push(poker);
            poker.darken();
        }
    };
    DiscardBlock.prototype.toggle_operation_pokers = function () {
        for (var i = 0; i < this.operation_pokers.length; i++) {
            var poker = this.operation_pokers[i];
            poker.toggle();
            poker.shallower();
        }
        this.operation_pokers = [];
    };
    DiscardBlock.prototype.discard = function () {
        //获取所有选中的牌
        var selected_pokers = [];
        for (var i = 0; i < this.pokers.numChildren; i++) {
            var poker = this.pokers.getChildAt(i);
            if (poker.is_pop_up) {
                selected_pokers.push(poker);
            }
        }
        for (var _i = 0, selected_pokers_1 = selected_pokers; _i < selected_pokers_1.length; _i++) {
            var poker = selected_pokers_1[_i];
            this.pokers.removeChild(poker);
        }
        this.adjust_all_cards();
    };
    return DiscardBlock;
}(eui.Component));
__reflect(DiscardBlock.prototype, "DiscardBlock", ["eui.UIComponent", "egret.DisplayObject"]);
//# sourceMappingURL=DiscardBlock.js.map