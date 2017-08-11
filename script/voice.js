//语音控制类
class Voice {

	constructor(h) {
		this.home = h;
		this.isListening = false;
	}

	start() {
		//发送信息，开始监听		
		this.home.send({ type: 'voice-remote', result: 'open' });
		this.text('开始聆听...');
		var _self = this;
		setTimeout(function(){
			if(_self.isListening == false){
				_self.reset();
			}
		}, 5000);
	}

	//设置显示文本
	text(msg) {
		document.querySelector(".speech-text").innerHTML = msg;
	}

	//聆听与显示
	listen(msg) {
		document.querySelector(".speech-text").innerHTML = msg;
		this.isListening = true;
	}

	//理解与执行
	end(msg) {
		this.text(msg);
		var _self = this;
		if (/(播放音乐|播放)/.test(msg)) {
			this.home.music.m.play();
			this.home.media.ShowMsg('播放音乐');
		} else if (/(暂停音乐|暂停)/.test(msg)) {
			this.home.music.m.pause();
			this.home.media.ShowMsg('暂停音乐');
		} else if (/(上一曲)/.test(msg)) {
			this.home.music.m.prev();
			this.home.media.ShowMsg('上一曲');
		} else if (/(下一曲)/.test(msg)) {
			this.home.music.m.next();
			this.home.media.ShowMsg('下一曲');
		} else if (/(收音机)/.test(msg)) {
			this.home.music.load('app/radio.html');
			this.home.media.ShowMsg('播放收音机');
		} else if (/(百度音乐)/.test(msg)) {
			this.home.music.load('http://fm.baidu.com/');
			this.home.media.ShowMsg('播放百度音乐');
		} else if (/(网易音乐)/.test(msg)) {
			this.home.music.load('http://music.163.com/#/playlist?id=42711144');
			this.home.media.ShowMsg('播放网易云音乐');
		} else {
			$.getJSON("http://jiluxinqing.com:8887/search?code=" + encodeURIComponent(JSON.stringify({ "key": msg.replace('小白', '') })) + "&name=tuling123&uid=201708101641", function (data) {
				console.log(data);
				var obj = JSON.parse(data.data);								
				_self.home.media.ShowMsg(obj.text);
			})
		}
		setTimeout(function () {
			_self.reset();
		}, 3000);
	}

	//关闭语音识别
	close() {
		this.home.send({ type: 'voice-remote', result: 'close' });
	}

	//还原
	reset() {
		this.text('语音助手小白竭诚为您服务');
		this.isListening = false;
	}
}
