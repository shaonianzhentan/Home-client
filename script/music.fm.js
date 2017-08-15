//定义类
class FM {	
  constructor(t) {
	this.parent = t;
  }

  getInfo() {
    return this.parent.getInfo("fm");
  }
  
  next() {
    this.parent.next('next();');
  }
  
  prev() {
    this.parent.prev('prev();');
  }
  
  play() {
    this.parent.play('video.play();');
  }
  
  pause() {
    this.parent.pause('video.pause();');
  }
  
  random() {
	this.parent.random('run();');
  }
}