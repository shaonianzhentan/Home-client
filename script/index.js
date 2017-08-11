﻿class HOME {
	constructor() {		
		this.clock = new Clock();
		this.music = new Music(document.querySelector("#mainFrame"));
		this.conn();
		this.tick();
		this.voice = new Voice(this);	
		this.media = media;	
	}
	conn() {
		var _self = this;
		this.ws = new WebSocket('ws://localhost:8888');
		this.ws.onmessage = function (data) {
			try {
				var obj = JSON.parse(data.data);
				switch (obj.type) {
					//音乐控制
					case 'music':
						var result = obj.result;
						switch (result) {
							case 'load':
								_self.music.load(obj.msg);
								return;
							case 'play':
								_self.music.m.play();
								break;
							case 'random':
								_self.music.m.random();
								break;
							case 'up':
								_self.music.load('app/radio.html');
								break;
							case 'down':
								_self.music.load('http://music.163.com/#/playlist?id=42711144');
								break;
							case 'prev':
								_self.music.m.prev();
								break;
							case 'next':
								_self.music.m.next();
								break;
							case 'pause':
								_self.music.m.pause();
								break;
						}
						media.ShowMsg(obj.msg);
						break;
					//程序控制
					case 'program':
						switch (obj.result) {
							case 'status':
								_self.send({
									k: 'status', v: {
										MusicTitle: _self.music.title,
										MusicStatus: _self.music.status,
										MusicUrl: _self.music.url,
										MusicTime: _self.music.optime
									}
								})
								break;
							case 'reload':
								location.reload();
								break;
							case 'menu-click': //菜单切换
								$(".NavPanel").fadeToggle();
								break;
							case 'refresh': //更新配置数据								
								_self.clock.load();
								break;
							case 'screenshots':
								ipcRenderer.send('system', 'capturePage');
								break;
							case 'baoshi':
								_self.clock.play(obj.msg);
								break;
							case 'lock': //锁屏

								break;
							case 'tips': //提示信息
								_self.media.ShowTips(obj.msg);
								break;
							case 'speak': //说话
								_self.media.ShowMsg(obj.msg);
								break;
							case 'voice': //声音
								_self.media.play(obj.msg);
								break;
							case 'write': //输入
								clipboard.writeText(obj.msg);
								setTimeout(function () {
									_self.music.wv.paste();
								}, 1000);
								break;
						}
						break;
					//语音控制
					case 'voice':
						switch (obj.result) {
							case 'ready':
								_self.voice.text('语音助手小白已经准备好了~');
								break;
							case 'start':
								_self.voice.start();
								break;
							case 'listen': //显示听到的文字
								_self.voice.listen(obj.msg);
								break;
							case 'end': //结束聆听
								_self.voice.end(obj.msg);
								break;
						}
						break;
				}
			} catch (ex) {

			}
			console.log(data);
		}
		this.ws.onerror = function (err) {
			console.log(err);
		}

		this.ws.onopen = function () {
			_self.media.ShowMsg('连接成功');
		}

		this.ws.onclose = function () {
			_self.media.ShowMsg('连接关闭，30秒后重新连接');
			setTimeout(function () {
				_self.conn();
			}, 30000);
		}

	}

	send(data) {
		try {
			if (this.ws && this.ws.readyState == 1) this.ws.send(JSON.stringify(data));
		} catch (ex) {
			console.log(ex);
		}
	}

	//定时器，每秒触发一次
	tick() {
		var _self = this;
		setTimeout(function () {
			setInterval(function () {

				_self.clock.start();

			}, 1000);
		}, 1000);
	}
}

var media = new Media();
var home = new HOME();

const { ipcRenderer, clipboard } = require('electron');

ipcRenderer.on('capturePage', (event, arg) => {
	console.log(arg);
	$.post('http://localhost:8888/program', { key: 'screenshots-up', value: arg });
})
