
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
				var msg = e.data;
				
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