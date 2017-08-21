var inputText = null;
window.copy = function (text) {
    if (inputText == null) {
        inputText = document.createElement("input");
        document.body.appendChild(inputText);
    }
    inputText.value = text;
    inputText.focus();
    inputText.setSelectionRange(0, inputText.value.length);
    document.execCommand("copy", true);
}


window.HOME_MUSIC = {
    //播放歌手专辑
    playSinger: function () {
        try {
            var doc = document.getElementById("g_iframe").contentDocument;
            var timer = setInterval(function () {
                var a = doc.querySelector(".u-cover a");
                if (a) {
                    clearInterval(timer);
                    a.click();
		    timer = setInterval(function () {
                        doc = document.getElementById("g_iframe").contentDocument;
			var songsize = doc.querySelectorAll(".j-flag table tr").length;
			if(songsize > 0){
				if(parseFloat(document.querySelector(".cur").style.width) > 0){
					clearInterval(timer);	
				}else{
					doc.querySelector('.u-btni-addply,.u-btni-playall').click();
				}
			}
                    }, 2000);
                }
            }, 1000);
        } catch (ex) {
            //alert(ex);
        }
    },
    getInfo: function (type) {
        try {
            var obj = {};
            if (type === "163") {
                obj['title'] = document.querySelector(".play .name").innerText;
                obj['name'] = document.querySelector(".play .by").innerText;
            } else if (type === "baidu") {
                obj['title'] = document.querySelector(".fm-song-title").innerText;
                obj['name'] = document.querySelector(".fm-artist-name").innerText;
            } else if (type === "fm") {
                obj['title'] = "";
                obj['name'] = "";
            } else if (type === "xmly") {
                obj['title'] = document.querySelector(".player-panel .title").innerText;
                obj['name'] = document.querySelector(".detailContent_title").innerText;
            }
            copy(JSON.stringify(obj));
        } catch (ex) {
            //copy(ex);
        }
    }
}
