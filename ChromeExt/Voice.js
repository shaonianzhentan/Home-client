//https://www.google.com/intl/en/chrome/demos/speech.html

window.onload = function () {
	document.querySelector("#select_language").selectedIndex = 36;
	document.querySelector("#select_dialect").options.add(new Option("普通话 (中国大陆)", "cmn-Hans-CN"));
	document.querySelector("#select_dialect").value = "cmn-Hans-CN";
}
var input = document.querySelector("#interim_span"),
	final_span = document.querySelector("#final_span");

//开始监听
function Listen() {
	if (ws == null) return;
	if (input.innerText == "" && final_span.innerText != "") {
		end();
		return;
	}
	var listenText = input.innerText;
	if (listenText.indexOf('小白') > 0) {
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
var IsSend = false;
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

/*******************************WebSocket操作*************************************/
var ws;//websocket实例
var lockReconnect = false;//避免重复连接
var wsUrl = 'ws://localhost:8888';

function createWebSocket(url) {
	try {
		ws = new WebSocket(url);
		initEventHandle();
	} catch (e) {
		reconnect(url);
	}
}

function initEventHandle() {
	ws.onclose = function () {
		reconnect(wsUrl);
	};
	ws.onerror = function () {
		reconnect(wsUrl);
	};
	ws.onopen = function () {
		//心跳检测重置
		heartCheck.reset().start();
	};
	ws.onmessage = function (e) {
		//如果获取到消息，心跳检测重置
		//拿到任何消息都说明当前连接是正常的
		heartCheck.reset().start();


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
	}
}

function reconnect(url) {
	if (lockReconnect) return;
	lockReconnect = true;
	//没连接上会一直重连，设置延迟避免请求过多
	setTimeout(function () {
		createWebSocket(url);
		lockReconnect = false;
	}, 3000);
}


//心跳检测
var heartCheck = {
	timeout: 60000,//60秒
	timeoutObj: null,
	serverTimeoutObj: null,
	reset: function () {
		clearTimeout(this.timeoutObj);
		clearTimeout(this.serverTimeoutObj);
		return this;
	},
	start: function () {
		var self = this;
		this.timeoutObj = setTimeout(function () {
			//这里发送一个心跳，后端收到后，返回一个心跳消息，
			//onmessage拿到返回的心跳就说明连接正常
			ws.send(JSON.stringify({ type: 'voice-remote', result: 'alive' }));
			self.serverTimeoutObj = setTimeout(function () {//如果超过一定时间还没重置，说明后端主动断开了
				ws.close();//如果onclose会执行reconnect，我们执行ws.close()就行了.如果直接执行reconnect 会触发onclose导致重连两次
			}, self.timeout)
		}, this.timeout)
	}
}

createWebSocket(wsUrl);