//网易云音乐
class _163 {
  constructor(t) {
    this.parent = t;
  }

  load() {
    this.parent.play('var WIN=document.querySelector("#g_iframe").contentWindow; \
			WIN.document.querySelector(".u-btni-addply,.u-btni-playall").click();');
  }

  getInfo() {
    return this.parent.getInfo("163");
  }

  next() {
    this.parent.next('document.querySelector(".nxt").click();');
  }

  prev() {
    this.parent.prev('document.querySelector(".prv").click();');
  }

  play() {
    this.parent.play('if(document.querySelector(".pas")==null) document.querySelector(".ply").click();');
  }

  pause() {
    this.parent.pause('if(document.querySelector(".pas")) document.querySelector(".ply").click();');
  }

  random() {
    this.parent.random('var WIN=document.querySelector("#g_iframe").contentWindow; \
			var list = WIN.document.querySelectorAll(".j-flag table tr"); \
			list[Math.round(Math.random() * list.length-1)].querySelector(".ply").click();');
  }
}