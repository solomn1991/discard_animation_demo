// 对于egret,tween动画难以批量调用所自定义的类，用于批量play动画，以及回调
// 目前的缺陷
// 1.放多个动画(tween)指向同一个对象都可以放入，这本质是不合情理的，多段动画应该放在多段流程中进行播放，但是没有做相关检测，可能导致难以预测的后果
// 2.由于egret.Watch.watch自身的缺陷:watch的回调函数中继续修改Watcher所监视的值,并不会再次出发watch的回调函数，所以目前暂时在调整状态上只能通过自己的回调来实现

// 调用的例子
// let tw1 = egret.Tween.get(obj) //初始化动画对象
// tw1.to({x:300}).to({y:100}).setPaused(true);//设置好本次动画的所有行动轨迹

// let tw2 = egret.Tween.get(obj) //初始化动画对象
// tw2.to({x:300}).to({y:100}).setPaused(true);//设置好本次动画的所有行动轨迹

// let tbm = new TweenBatchManager();
// tbm.add_tween(tw1);
// tbm.add_tween(tw2);

// function callback(){
// 	console.log(this)
// }

// tbm.BatchPlay(callback,"solomn")


class TweenBatchManager extends egret.EventDispatcher{

	private _tw_group:egret.Tween[] = []

	public playing_batch_tween = {
		tween_objects:[],
		status:null,//STATUS:null,ready,playing
	}

	public constructor() {
		super();
	}
	public add_tween(tween_obj){
		this._tw_group.push(tween_obj)
	}

	public remove_tween(tween_obj_idx){
		this._tw_group.splice(tween_obj_idx,1);
	}

	public BatchPlay(callback=null,callbackThisObj=null,...callbackArgs){
		// 参数检查
		if (callback&&!callbackThisObj){
			throw new Error("回调函数必须指明参数callbackThisObj")
		}

		if (this.playing_batch_tween.status!=null&&this.playing_batch_tween.status!="ready"){
			console.log("该批动画处于不可播放状态")
			return false
		}

		// 清理上一批动画
		this.playing_batch_tween.tween_objects = []

		// 将本次要播放的动画的放入playing_batch_tween.tween_objects中,并修改playing_batch_tween的状态
		for (let tw of this._tw_group){
			if (this._tw_group.indexOf(tw)!=-1){
				this.playing_batch_tween.tween_objects.push(tw);
			}
			
		}

		// 给playing_batch_tween.tween_objects添加回调,并且播放所有动画
		this.playing_batch_tween.status = "playing"
		for (let tw of this.playing_batch_tween.tween_objects){
			tw.call(function clear_from_this_batch(tw){
				let index = this.playing_batch_tween.tween_objects.indexOf(tw)
				this.playing_batch_tween.tween_objects.splice(index,1);
				if (this.playing_batch_tween.tween_objects.length==0){
					this.playing_batch_tween.status = "ready";
					// console.log("所有动画都播放完毕了");
					if (callback){
						callback.bind(callbackThisObj)(...callbackArgs)
					}
					
				}

			},this,[tw]).setPaused(false);
		}
	}

	clear_tw_group(){
		this._tw_group = [];
	}

	// onPlayingStatusChange(value){
	// 	console.log(value)
	// 	this.playing_batch_tween.status = "ready";
	// 	console.log(this.playing_batch_tween.status);
	// }

}