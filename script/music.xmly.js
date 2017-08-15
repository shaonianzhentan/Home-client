//定义类
class XMLA {
  constructor(t) {
    this.parent = t;
  }

  getInfo() {
    return this.parent.getInfo("xmla");
  }

  next() {
    this.parent.next('$(".nextBtn").click();');
  }

  prev() {
    this.parent.prev('$(".prevBtn").click();');
  }

  play() {
    this.parent.play('$(".detailContent_playcount .playBtn").mousedown();');
  }

  pause() {
    this.parent.pause('$(".detailContent_playcount .pauseBtn").mousedown();');
  }

  random() {
    this.play();
  }
}