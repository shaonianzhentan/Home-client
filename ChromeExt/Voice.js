
var ws = null;

function LoadVoice(){	
	try{
		ws=new WebSocket("ws://127.0.0.1:8888");
		ws.onopen=function(e){
			console.log('连接成功！');
		};
		ws.onmessage=function(e){
			console.log(e.data);
			try{
				var obj = JSON.parse(e.data);
				switch(obj.type){	
					case 'voice-remote':
						var result = obj.result;
						switch(result){
							case 'open':
								//开启语音识别
								Listen();
							break;
							case 'close':
								//关闭语音识别
							break;
						}
					break;
				}
			}catch(ex){
				console.log(ex);
			}							
		};
		ws.onerror=function(e){					
			console.log(e.data);

			setTimeout(function(){				
				LoadVoice();				
			},3000);			
		};
		ws.onclose=function(e){
			console.log('连接关闭！');	
			setTimeout(function(){				
				LoadVoice();
			},3000);
		};
		
	}catch(ex){
		console.log(ex);
	}
}
LoadVoice();

//开始监听
function Listen(){
	if(ws == null) return;
	ws.send(JSON.stringify({
		type:'voice',
		result:'listen',
		msg:'这里是监听到的结果。。。'
	}));
}

//结束监听，发送需要解析的消息
function end(){
	if(ws == null) return;
	ws.send(JSON.stringify({
		type:'voice',
		result:'listen',
		msg:'这里是监听到的结果。。。'
	}));
}