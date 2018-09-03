class Poker extends eui.Component implements  eui.UIComponent {

	private poker_bg:eui.Rect
	private poker_value:eui.Label

	public static height_width_rate:number = 3/2;
	public static height_explicitHeight_rate = 1/4;


	private value:string
	private parent_height;

	public tween:egret.Tween;

	
	public constructor(value:string,parent_height:number) {
		super();
		this.value = value;
		this.parent_height = parent_height;
		this.tween = egret.Tween.get(this);
	}

	protected partAdded(partName:string,instance:any):void
	{
		super.partAdded(partName,instance);

	}


	protected childrenCreated():void
	{
		super.childrenCreated();
		
		this.poker_value.text = this.value
		// this.height = this.parent.height;//failed,group 的宽高取决于内部元素，内部元素宽和高未计算，因此，这样取不行
		this.height = this.parent_height;//因此往外取2层，取到外层组即可

		this.width = this.height / Poker.height_width_rate;
		this.poker_bg.ellipseHeight= this.height * Poker.height_explicitHeight_rate;
		this.poker_bg.ellipseWidth = this.height * Poker.height_explicitHeight_rate;

		// console.log(this.height,this.width)

		this.anchorOffsetX = this.width /2
		this.anchorOffsetY = this.height/2;
	}
	
}