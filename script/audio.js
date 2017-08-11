var audioPalyUrl = "http://h5.xf-yun.com/audioStream/";
/**
  * 初始化Session会话
  * url                 连接的服务器地址（可选）
  * reconnection        客户端是否支持断开重连
  * reconnectionDelay   重连支持的延迟时间   
  */

class Media {
	constructor(v){
		this.video = v;
		
		this.session = new IFlyTtsSession({
									'url'                : 'ws://h5.xf-yun.com/tts.do',
									'reconnection'       : true,
									'reconnectionDelay'  : 30000
								});
		
	}	
	ShowMsg (msg,time,callback){
		var _self = this;
		if(time==null) time==3000;
		try{
			
			var vcn = 'yefang',	
			ssb_param = {"appid": '577ca2ac', "appkey":"9a77addd1154848d", "synid":"12345", "params" : "ent=aisound,appid=577ca2ac,aue=lame,vcn="+vcn};

			this.session.start(ssb_param, msg, function (err, obj)
			{
				var audio_url = audioPalyUrl + obj.audio_url;
				if( audio_url != null && audio_url != undefined )
				{
					_self.play(audio_url);
				}
			});	
			
			
			//play(msg, 'vivixiaoxin')
			//play(msg, 'yefang');
			/*
			  this.audio.src="http://tts.baidu.com/text2audio?idx=1&tex="+msg+"&cuid=baidu_speech_demo&cod=2&lan=zh&ctp=1&pdt=1&spd=5&per=0&vol=5&pit=5";
			  this.audio.play();	
			*/
		}catch(ex){
			
		}
		
		this.ShowTips(msg);
				
		if(callback!=null) callback();
	}
	
	play (url){	
		var video = this.video;
		if(url.indexOf('.m3u8') > 0){
			if(Hls.isSupported()) {
				var hls = new Hls();
				hls.loadSource(url);
				hls.attachMedia(video);
				hls.on(Hls.Events.MANIFEST_PARSED,function() {
				  video.play();
				});	
			}
		}else{
			video.src= url;
			video.play();
		}		
	}

	ShowTips(msg){
		Snackbar.show({pos: 'bottom-right',text:msg, actionText:''});
	}
}