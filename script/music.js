class Music{
  constructor(wv) {
	this.wv = wv;
	var _self = this;
	this.wv.addEventListener('dom-ready', (e) => {
		_self.title = _self.wv.getTitle();
		_self.status = '载入链接';		
	});
	this.wv.addEventListener('new-window', (e) => {
	  const protocol = require('url').parse(e.url).protocol
	  if (protocol === 'http:' || protocol === 'https:') {
		_self.wv.src = e.url;
	  }
	})

	this.m = new _163(this);
  }
  load(link){
	var _self = this;
	this.url = link;
	this.wv.src = link;
	
	if(link.indexOf('app/radio.html') >=0 ){
		this.m = new FM(this);
	}else if(link.indexOf('music.163.com') >=0 ){
		this.m = new _163(this);
		setTimeout(function(){
			_self.m.load();
		},5000);
	}else if(link.indexOf('www.ximalaya.com') >=0 ){
		this.m = new XMLA(this);
	}else if(link.indexOf('fm.baidu.com') >=0 ){
		this.m = new BaiDu(this);
	}
	this.setStatus('载入链接');
  }
  exec(script) {
    this.wv.executeJavaScript(script);
  }
  setStatus(ss) {
	this.status = ss;
	this.optime = (new Date()).toLocaleString();
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