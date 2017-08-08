//语音控制类
class Voice{
	
	constructor(h){
		this.home = h;
	}
	
	start(){
		//发送信息，开始监听		
		this.home.send({type:'voice-remote', result:'open'});
		document.querySelector(".speech-loader").style.visibility = 'visible';
	}
	
	//聆听与显示
	listen(msg){
		document.querySelector(".speech-text").innerHTML = msg;
	}
	
	//理解与执行
	end(msg){
		if(/(播放音乐|播放)/.test(msg)){
		    this.home.music.m.play();
		}else if(/(暂停音乐|暂停)/.test(msg)){
		    this.home.music.m.pause();
		}else if(/(上一曲)/.test(msg)){
		    this.home.music.m.prev();
		}else if(/(下一曲)/.test(msg)){
		    this.home.music.m.next();
		}else if(/(播放广播)/.test(msg)){
		
		}
		setTimeout(function(){
			document.querySelector(".speech-loader").style.visibility = 'hidden';
		}, 3000);
	}
	
	//关闭语音识别
	close(){
		this.home.send({type:'voice-remote', result:'close'});
	}
}