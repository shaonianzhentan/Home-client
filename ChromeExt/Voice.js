﻿//https://www.google.com/intl/en/chrome/demos/speech.html

window.onload = function () {

	document.querySelector("#select_language").selectedIndex = 36;
	document.querySelector("#select_dialect").options.add(new Option("普通话 (中国大陆)", "cmn-Hans-CN"));
	document.querySelector("#select_dialect").value = "cmn-Hans-CN";
}

var ws = null,
	input = document.querySelector("#interim_span"),
	final_span = document.querySelector("#final_span");

function LoadVoice() {
	try {
		ws = new WebSocket("ws://localhost:8888");
		ws.onopen = function (e) {
			console.log('连接成功！');
			//end();
		};
		ws.onmessage = function (e) {
			console.log(e.data);
			try {
				var obj = JSON.parse(e.data);
				switch (obj.type) {
					case 'voice-remote':
						var result = obj.result;
						switch (result) {
							case 'open':
								//开启语音识别								
								input.removeEventListener("DOMSubtreeModified", Listen, false);
								//input.value = "";
								input.addEventListener("DOMSubtreeModified", Listen, false);
								document.querySelector("#start_img").click();
								break;
							case 'close':
								//关闭语音识别
								break;
						}
						break;
				}
			} catch (ex) {
				console.log(ex);
			}
		};
		ws.onerror = function (e) {
			console.log(e.data);

			setTimeout(function () {
				LoadVoice();
			}, 3000);
		};
		ws.onclose = function (e) {
			console.log('连接关闭！');
			setTimeout(function () {
				LoadVoice();
			}, 3000);
		};

	} catch (ex) {
		console.log(ex);
	}
}
LoadVoice();

var IsSend = false;

//开始监听
function Listen() {
	if (ws == null) return;
	if (input.innerText == "" && final_span.innerText != "") {
		end();
		return;
	}
	var listenText = input.innerText;
	if (listenText.indexOf('我说完了') > 0) {
		final_span.innerText = listenText;
		input.innerText = "";
		return;
	}
	ws.send(JSON.stringify({
		type: 'voice',
		result: 'listen',
		msg: listenText
	}));
}

//结束监听，发送需要解析的消息
function end() {
	if (IsSend) return;
	IsSend = true;
	console.log('sending...');
	var endText = final_span.innerText;

	document.querySelector("#start_img").click();


	if (ws == null || (input.innerText == "" && endText == "")) return;
	ws.send(JSON.stringify({
		type: 'voice',
		result: 'end',
		msg: endText
	}));
	final_span.innerText = "";
	setTimeout(function () {
		IsSend = false;
	}, 2000);
}
