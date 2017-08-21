class Music {
	constructor(wv) {
		this.wv = wv;
		var _self = this;
		this.wv.addEventListener('new-window', (e) => {
			const protocol = require('url').parse(e.url).protocol
			if (protocol === 'http:' || protocol === 'https:') {
				_self.wv.src = e.url;
			}
		})

		this.m = new _163(this);
	}
	load(link) {
		var _self = this;
		this.url = link;
		this.wv.src = link;

		return new Promise(function (resolve, reject) {

			_self.wv.addEventListener('dom-ready', (e) => {

				_self.title = _self.wv.getTitle();
				_self.setStatus('载入链接');

				if (link.indexOf('app/radio.html') >= 0) {
					_self.m = new FM(_self);
				} else if (link.indexOf('music.163.com') >= 0) {
					_self.m = new _163(_self);
					setTimeout(function () {
						_self.m.load();
					}, 1000);
				} else if (link.indexOf('www.ximalaya.com') >= 0) {
					_self.m = new XMLA(_self);
				} else if (link.indexOf('fm.baidu.com') >= 0) {
					_self.m = new BaiDu(_self);
				}
				console.log('载入链接成功');
				resolve();
			});
		});
	}
	exec(script) {
		this.wv.executeJavaScript(script);
	}
	setStatus(ss) {
		this.status = ss;
		this.optime = (new Date()).toLocaleString();
		var _self = this;
		setTimeout(function () {
			_self.m.getInfo().then(function (obj) {
				var title = obj.title || 'HAPPY';
				var name = obj.name || 'MUSIC';
				document.getElementById("music-title").innerHTML = title + " - " + name;
			})
			//发送状态信息到服务器
			$.post('http://localhost:8888/os', {
				key: 'setStatus', value: {
					MusicTitle: _self.title,
					MusicStatus: _self.status,
					MusicUrl: _self.url,
					MusicTime: _self.optime
				}
			}, function (result) {
				console.log(result);
			})
		}, 1000);
	}
	getInfo(ss) {
		var _self = this;
		return new Promise(function (resolve, reject) {
			_self.exec('HOME_MUSIC.getInfo("' + ss + '")');
			setTimeout(function () {
				try {
					var value = JSON.parse(clipboard.readText());
					resolve(value);
				} catch (ex) {
					reject(ex);
				}
			}, 1000);
		});
	}
	next(ss) {
		this.exec(ss);
		this.setStatus('下一曲');
	}

	prev(ss) {
		this.exec(ss);
		this.setStatus('上一曲');
	}

	play(ss) {
		this.exec(ss);
		this.setStatus('播放');
	}

	pause(ss) {
		this.exec(ss);
		this.setStatus('暂停');
	}

	random(ss) {
		this.exec(ss);
		this.setStatus('随机播放');
	}
}