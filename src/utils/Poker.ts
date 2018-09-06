class Poker extends eui.Component implements  eui.UIComponent {

	private poker_bg:eui.Rect;
	private poker_mask:eui.Rect;
	private poker_value:eui.Label;
	public is_pop_up:boolean = false;


	public static height_width_rate:number = 3/2; //牌的宽高比
	public static height_explicitHeight_rate = 1/4; //圆角大小比例


	private value:string
	private parent_height;
	private init_y;

	public tween:egret.Tween;
	public constructor(value:string,parent_height:number) {
		super();
		this.value = value;
		this.parent_height = parent_height;
		this.tween = egret.Tween.get(this);

		// this.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.onSelect,this)
		// this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.offSelected,this)


	}

	protected partAdded(partName:string,instance:any):void
	{
		super.partAdded(partName,instance);

	}


	protected childrenCreated():void
	{
		super.childrenCreated();
		
		this.poker_value.text = this.value
		// this.height = this.parent.height;//failed,group 的宽高取决于内部元素，内部元素宽和高未计算，因此，这样取不行，特此小记
		this.height = this.parent_height;//因此往外取2层，取到外层组即可

		this.width = this.height / Poker.height_width_rate;
		this.poker_bg.ellipseHeight= this.height * Poker.height_explicitHeight_rate;
		this.poker_bg.ellipseWidth = this.height * Poker.height_explicitHeight_rate;


		this.anchorOffsetX = this.width /2
		this.anchorOffsetY = this.height/2;

		this.init_y = this.height/2;
		
	}




	darken(){
		this.poker_mask.fillAlpha = 0.3
		
	}
	shallower(){
		this.poker_mask.fillAlpha = 0
	}
	


	is_point_in(x,y)//弃用
	{
		if (x>this.x - this.width/2&&x<this.x+this.width/2 && y<this.y-this.height/2 && y> this.y/2+this.height/2){
			return true;
		}else{
			return false;
		}
	}

	pop_up(){
		if (!this.is_pop_up){
				this.is_pop_up = true;
				this.y = this.y - this.height/4
		}
	}

	reset(){
		this.is_pop_up = false;
		this.y = this.init_y;
	}

	toggle(){
		if (this.is_pop_up){
			this.reset()
		}else{
			this.pop_up();
		}
	}
}