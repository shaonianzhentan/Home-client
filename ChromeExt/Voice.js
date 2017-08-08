
var ws = null, 
	input = document.querySelector("#lst-ib");

function LoadVoice(){	
	try{
		ws=new WebSocket("ws://localhost:8888");
		ws.onopen=function(e){
			console.log('连接成功！');
			end();
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
								input.value = "";

								var testinput = document.createElement('input');      
								if('oninput' in testinput){
									input.addEventListener("input",Listen,false);  
								}else{  
									input.onpropertychange = Listen;  
								}  
								document.querySelector("#gsri_ok0").click();								
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
		msg: input.value
	}));
}

//结束监听，发送需要解析的消息
function end(){
	if(ws == null || input.value == "") return;
	ws.send(JSON.stringify({
		type:'voice',
		result:'end',
		msg:input.value
	}));
}