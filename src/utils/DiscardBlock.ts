

class DiscardBlock extends eui.Component implements  eui.UIComponent {

	private pokers:eui.Group;
	private poker_controllers = {};
	private tbm:TweenBatchManager
	private init_poker_values


	private min_space:number = 30;
	private max_space:number = 40;

	public constructor() {
		super();
		this.verticalCenter = 1;
		this.horizontalCenter = 1;
		this.tbm = new TweenBatchManager();

		this.init_poker_values = [
			"1","2",
			"3","4","5","6","7","8",
			"1","2","3","4","5","6","7","8",
			"1","2","3","4","5","6","7","8",
			"1","2","3","4","5","6","7","8",
			"1","2","3","4","5","6","7","8",
			"1","2","3","4","5","6","7","8",
			// "1","2","3","4","5","6","7","8",
			// "1","2","3","4","5","6","7","8",
			]
		
	}

	protected partAdded(partName:string,instance:any):void{
		super.partAdded(partName,instance);
	}


	protected childrenCreated():void{
		super.childrenCreated();
		
		this.init_pokers()//发牌

	}

	private get_last_poker_position(){
		let child_count = this.pokers.numChildren;
		let last_poker_position 
		if(!child_count){
			last_poker_position = {x:this.width/2,y:this.height/2,is_first_poker:true} 
		}else{
			let last_poker = this.pokers.getChildAt(this.pokers.numChildren-1);
			last_poker_position = {x:last_poker.x,y:last_poker.y,is_first_poker:false}
		}
		return last_poker_position
	}

	private adjust_all_cards(callback=null,callbackThisObj=null,...callbackArgs){

		//计算中间空的距离inner_space和牌之间的距离
		let card_width = this.height / Poker.height_width_rate;
		let inner_space = this.width - card_width;//中间可以空的距离
		let space 
		
		if (this.pokers.numChildren!=0){
			space = inner_space/(this.pokers.numChildren - 1);
			console.log("space",space)
			if (space>this.max_space){
				space = this.max_space
			}else if(space<this.min_space){
				space = this.min_space
			}
		}else{
			space = 0
		}

		inner_space = space *(this.pokers.numChildren - 1);
		let start_x = this.width/2 - (inner_space/2)
		for(let i=0;i<this.pokers.numChildren;i++){
			let des_x = start_x + i * space;
			let poker = <Poker>this.pokers.getChildAt(i);
			let tw = poker.tween.to({x:des_x},400).setPaused(false)
			this.tbm.add_tween(tw);
		}
		this.tbm.BatchPlay(callback,callbackThisObj,...callbackArgs);

	}

	private init_pokers():void{
		// 获取最后一张牌的位置
		let poker_value = this.init_poker_values.shift()
		if (poker_value==undefined){

			return
		}
		let poker = new Poker(poker_value,this.height);
		let last_poker_position = this.get_last_poker_position()
		poker.x = last_poker_position.x;
		poker.y = last_poker_position.y;

		// 添加牌的位置到最后一张牌上
		this.pokers.addChild(poker);//不知道能不能回调
		// console.log(poker_value);
		

		// 调整所有牌的位置
		this.adjust_all_cards(this.init_pokers,this)
	}

	public add_poker(poker_values:string[]){

		// 创建对象
		let pokers = [];
		for (let poker_value  of poker_values){
			pokers.push({
				poker_ui:new Poker(poker_value,this.height),
				position:0
			})
		}

		
		// 找到对象应该插入的位置
		// 插入对象
		// 调整对象,

	}

	
	
}