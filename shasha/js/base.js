//按ID名获得节点引用
function $id(id){
	return document.getElementById(id)
	}
//按表签名获得节点引用
function $tag(tagname){
	return document.getElementsByTagName(tagname)
	}
//检测浏览器
(function(){
	window.sys={};
	var ua=navigator.userAgent.toLowerCase();
	var s;
	if(ua.match(/msie ([\d\.]+)/)){//判断ie
		s=ua.match(/msie ([\d\.]+)/);
		sys.ie=s[1]
		}
	if ((/firefox\/([\d.]+)/).test(ua)) { //判断火狐浏览器
		s = ua.match(/firefox\/([\d.]+)/);
		sys.firefox = s[1];
		}
	if ((/chrome\/([\d.]+)/).test(ua)) { //判断谷歌浏览器
		s = ua.match(/chrome\/([\d.]+)/);
		sys.chrome = s[1];
		}
	if ((/opera.*version\/([\d.]+)/).test(ua)) { //判断opera 浏览器
		s = ua.match(/opera.*version\/([\d.]+)/);
		sys.opera = s[1];
		}
	if ((/version\/([\d.]+).*safari/).test(ua)) { //判断safari 浏览器
		s = ua.match(/version\/([\d.]+).*safari/);
		sys.safari = s[1];
		}
	})();	
	
//注册事件
function addEvent(element,type,eventfunction){
	if(element.addEventListener)
	{element.addEventListener(type,eventfunction,false)}
	else{
		//创建一个存放事件的哈希表(散列表)若关键字为k，则其值存放F(k)在的存储位置上。由此，不需比较便可直接取得所查记录。称这个对应关系为散列函数（Hash function），按这个思想建立的表为散列表。F()是关系函数
		if(!element.events){element.events={}}//哈希表要建立在element对象的属性上，因为在删除对象时要用到这个哈希表
		//第一次注册该事件是
		if(!element.events[type]){
			//建立一个处理函数的数组
			element.events[type]=[];
			}
		//注册同一个函数进行屏蔽
		if(addEvent.same(element.events[type],eventfunction)){
			element.events[type][addEvent.ID++]=eventfunction;
		}	
		element["on"+type]=function(e){
			Event=e||window.event;
			//依次注册事件处理函数
			for(var i in element.events[type]){//因为利用addEvent.ID为数组下标添加的数组不是依次的，可能有element.events.click[0]然后有注册别的类型的事件再回来注册click事件此时第二个时间函数的下标为10呢；所以需要用到for in遍历数组；
				element.events[type][i].call(element,Event);
				}
			}
		}
	}
	
//为每个事件分配一个计数器
addEvent.ID=0;
//处理同一对象多次注册同一类型事件同一函数
addEvent.same=function(es,fn){
	for(var i in es){
		if(es[i]==fn){
			return false;
		}
		}
	return true;
	
	}

//移除事件
function removeEvent(element,type,eventfunction){
	if(element.removeEventListener)
	{element.removeEventListener(type,eventfunction,false)}
	else{
		for(var i in element.events[type]){
			if(element.events[type][i]==eventfunction){
				delete element.events[type][i];
				}
			}
		}
	}
//获取事件对象的引用
function getEvent(Event){
	return Event||window.event;
	}
//获取事件目标
function getTarget(eventObject){
	return eventObject.target||eventObject.srcElement;
	}
//取消事件默认行为
function preventDefault(eventObject){
	if(eventObject.preventDefault){
		eventObject.preventDefault();}
		else{eventObject.returnValue=false
			}
	}
//取消事件冒泡
function stopPropagation(eventObject){
	if(eventObject.stopPropagation){
		eventObject.stopPropagation();}
		else{eventObject.cancelBubble=true}
	}
//获取键盘事件字符编码
function getCharCode(eventObject){
	return eventObject.charCode||eventObject.keyCode;
	}
//表单字段文本选取
function selectText(formElement,start,num){
	if(formElement.setSelectionRange){
		formElement.setSelectionRange(start,num)
		}else if(formElement.createTextRange){
			var range=formElementt.createTextRange();
			range.collapse(true);
    			range.moveStart("character",start);
			range.moveEnd("character",num-start);
			range.select();
			}
			}
//兼容获取浏览器内容区域，因为火狐会有滚动条边				
var getInner={
	width:function(){
		if(typeof window.innerWidth=="number"){
			return window.innerWidth
			}else{return document.documentElement.clientWidth}
		},
	height:function(){
		if(typeof window.innerHeight=="number"){
			return window.innerHeight
			}else{
				return document.documentElement.clientHeight;
				}
		}
	}
//去除字符串前后空白
function trim(str){
	return str.replace(/(^\s+)|(\s+$)/g,'');
	
	}
	
//获取计算后css样式
function getStyle(element,attr){
	if(typeof window.getComputedStyle=="function"){
			return window.getComputedStyle(element,null)[attr];
			}else if(typeof element.currentStyle=="object"){
				return element.currentStyle[attr];
		}
	}
	
//跨浏览器获取和设置Text
function getText(element){
	return (typeof element.textContent=="string")?element.textContent:element.innerText;
	}
function setText(element,text){
	if(typeof element.textContent=="string"){
		element.textConten=text;
	}else{
		element.innerText=text;
		}
	}
//获取元素在页面上的偏移量
function getPosition(element){
	var actl=element.offsetLeft;
	var actt=element.offsetTop;
	var curr=element.offsetParent;
	while(curr!=null){
		actl+=curr.offsetLeft;
		actt+=curr.offsetTop;
		curr=curr.offsetParent;
		}
	return {
		top:actt,
		left:actl
		};
	}	
//拖拽
function drag(element,parentElement){
	addEvent(element,'mousedown',function(e){
		preventDefault(e);//兼容低版本火狐
		if(this.setCapture){//兼容ie浏览器，
			this.setCapture();
			}
		var dx=e.clientX-getPosition(this).left;
		var dy=e.clientY-getPosition(this).top;
		addEvent(this,'mousemove',fn);
		addEvent(this,'mouseup',func);
		function fn(e){
			var x=e.clientX-dx;
			var y=e.clientY-dy;
			var px=getPosition(parentElement).left;
			var py=getPosition(parentElement).top;
			var pwidth=parentElement.offsetWidth;
			var pheight=parentElement.offsetHeight;
			if(x<px){
				x=px
				}else if(x+this.offsetWidth>px+pwidth){
					x=px+pwidth-this.offsetWidth}
			if(y<py){
				y=py;
				}else if(y+this.offsetHeight>py+pheight){
					y=py+pheight-this.offsetHeight}
			this.style.left=x+'px';
			this.style.top=y+'px';		
			}
			function func(){
				removeEvent(this,'mousemove',fn);
				removeEvent(this,'mouseup',func);
				if(this.releaseCapture){//兼容ie浏览器，
					this.releaseCapture();
				}
				}
		})
	}
//调试工具
function log(message){
	var console=document.getElementById('debuginfo');
	if(console==null){
		console=document.createElement('div');
		console.id='debuginfo';
		console.style.background="#dedede";
		console.style.border='1px solid silver';
		console.style.padding='5px';
		console.style.width='200px';
		console.style.position='absolute';
		console.style.right='0px';
		console.style.top='0px';
		document.body.appendChild(console);
		}
	console.innerHTML+='<p>'+message+'</p>';
	}	
	
	
	
	
	
	
	
	
	
	
	
	