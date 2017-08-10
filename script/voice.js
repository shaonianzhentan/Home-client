//语音控制类
class Voice {

	constructor(h) {
		this.home = h;
	}

	start() {
		//发送信息，开始监听		
		this.home.send({ type: 'voice-remote', result: 'open' });
		this.listen('开始聆听...');
	}

	//聆听与显示
	listen(msg) {
		document.querySelector(".speech-text").innerHTML = msg;
	}

	//理解与执行
	end(msg) {
		var _self = this;
		if (/(播放音乐|播放)/.test(msg)) {
			this.home.music.m.play();
		} else if (/(暂停音乐|暂停)/.test(msg)) {
			this.home.music.m.pause();
		} else if (/(上一曲)/.test(msg)) {
			this.home.music.m.prev();
		} else if (/(下一曲)/.test(msg)) {
			this.home.music.m.next();
		} else if (/(收音机)/.test(msg)) {
			this.home.music.load('app/radio.html');
		} else if (/(百度音乐)/.test(msg)) {
			this.home.music.load('http://fm.baidu.com/');
		} else if (/(网易音乐)/.test(msg)) {
			this.home.music.load('http://music.163.com/#/playlist?id=42711144');
		} else {
			$.getJSON("http://jiluxinqing.com:8887/search?code=" + encodeURIComponent(JSON.stringify({ "key": msg.replace('小白', '') })) + "&name=tuling123&uid=201708101641", function (data) {
				console.log(data);
				var obj = JSON.parse(data.data);								
				_self.home.media.ShowMsg(obj.text);
			})
		}
		setTimeout(function () {
			_self.listen('家庭控制系统语音助手，小白还要为您服务');
		}, 3000);
	}

	//关闭语音识别
	close() {
		this.home.send({ type: 'voice-remote', result: 'close' });
	}
}