/***************菜单***********************/
$('.BackHome').click(function(){
	location.reload();
});

$('.linkAction').click(function(){
	var type=$(this).data('type');
	switch(type){
		case 'back':
			home.music.wv.goBack();
		break;
		case 'forward':
			home.music.wv.goForward();
		break;
		case 'reload':
			home.music.wv.reload();
		break;
		case 'dev':
			ipcRenderer.send('system', 'dev');
		break;
		case 'cursor':
			var cursor = $('html,body').css('cursor');
			if(cursor == 'auto'){
				cursor = 'url(favicon.ico),auto';
			}else{
				cursor='auto';
			}
			$('html,body').css('cursor',cursor);
		break;
	}
});

/***************天气预报***********************/
function LoadWeather(){
	var doc = document.querySelector("#weather").contentWindow.document;	
	
	doc.querySelectorAll("a").forEach(function(ele){			
		ele.removeAttribute('target');
		ele.removeAttribute('href');
	});
	
	console.log(doc);
	var link = doc.createElement("link");
	link.type = "text/css";
	link.rel = "stylesheet";
	link.href="http://localhost:8888/weather/weather.css";
	doc.head.appendChild(link);
	
	var script = doc.createElement("script")
	script.src="http://localhost:8888/weather/weather.js";
	doc.body.appendChild(script);
	
	
	ipcRenderer.send('system', 'closeDev');
	console.log('dev...');
}
		
/***************动画插件定义***********************/
$.fn.extend({
	animateCss: function (animationName) {
		var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
		$(this).addClass('animated ' + animationName).one(animationEnd, function() {
			$(this).removeClass('animated ' + animationName);
		});
}
});
		
/***************文本显示***********************/
(function(){
	var textArr=['你好傻','你真是一个笨蛋','你是个好人','我TM还能说些什么','就这样吧','算了，走了就走了','有些事，不能强求的','做人最重要就是要开心咯！'],
		textIndex = 0;
	function LoadingText(){
		$('#welcome').text(textArr[textIndex]).animateCss('fadeInDown');
		textIndex += 1;
		if(textIndex >= textArr.length){
			textIndex = 0;
		}
		setTimeout(function(){
			LoadingText();				
		},5000);
	}
	LoadingText();
})();