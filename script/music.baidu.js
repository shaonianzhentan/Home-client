//百度音乐
class BaiDu {
  constructor(t) {
    this.parent = t;
  }

  getInfo() {
     return this.parent.getInfo("baidu");
  }

  next() {
    this.parent.next('document.querySelector(".fm-next a").click();');
  }

  prev() {
    this.parent.prev('document.querySelector(".mask-text").click();');
  }

  play() {
    this.parent.play('if(document.querySelector(".stop") != null)	document.querySelector(".play").click();');
  }

  pause() {
    this.parent.pause('if(document.querySelector(".stop") == null)	document.querySelector(".play").click();');
  }

  random() {
    this.parent.random('$(".next-page").click();setTimeout(function(){var item=$(".channel-item").eq(Math.round(Math.random()*$(".channel-item").size()));item.click();},1000);');
  }
}