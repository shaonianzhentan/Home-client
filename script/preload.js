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
    getInfo: function (type) {
        try {
            var obj = {};
            if (type === "163") {
                obj['title'] = document.querySelector(".play .name").innerText;
                obj['name'] = document.querySelector(".play .by").innerText;
            }else if (type === "baidu") {
                obj['title'] = document.querySelector(".fm-song-title").innerText;
                obj['name'] = document.querySelector(".fm-artist-name").innerText;
            }else if (type === "fm") {
                obj['title'] = "";
                obj['name'] = "";
            }else if (type === "xmly") {
                obj['title'] = document.querySelector(".player-panel .title").innerText;
                obj['name'] = document.querySelector(".detailContent_title").innerText;
            }
            copy(JSON.stringify(obj));
        } catch (ex) {
            //copy(ex);
        }
    }
}