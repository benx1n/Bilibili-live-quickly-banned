function tip(text,time,n,direction){
	//n的值 red black blue	，不填则为blue	
	var name=(new Date()).getTime();
	var tip_div='<div id="sirui_tips_box" data-name="'+ name +'"><span>' + text + '</span></div>';
	$('body').append(tip_div);
		
	$('#sirui_tips_box[data-name="'+ name +'"]').css({
		'opacity':'1'
	}).stop().animate({
		top:'40%',
		width:'auto',
		height:'auto'			
	});
	
	var left=direction;
	if(direction=="" || typeof direction == "undefined")
		left="100%";
	if(n == "" || typeof n == "undefined")
		n="blue";
	$('#sirui_tips_box[data-name="'+ name +'"]').attr('data-color',n)
	setTimeout(function(){
		$('#sirui_tips_box[data-name="'+ name +'"]').stop().animate({
			opacity:0,
			top:'-10%',
			left:left,
			width:0,
			height:0
		},function(){
			$('#sirui_tips_box[data-name="'+ name +'"]').remove()
		})
	},time)
}
//滚动到底部
function scrollToEnd(){
	var h = $(document).height()-$(window).height();
	$(document).scrollTop(h); 
}
function trim(s){
	return s.replace(/(^\s*)|(\s*$)/g, "");
}
function imgUrl_webp(img){
	if(img.indexOf('//')==0){
		img='https:'+img;
	}
	
	if(img.indexOf('_.webp')>0){
		img=img.replace('_.webp','');
	}
	return img;
}

function p(s) {
	return s < 10 ? '0' + s : s;
}

function now() {
	var myDate = new Date();
	//获取当前年
	var year = myDate.getFullYear();
	//获取当前月
	var month = myDate.getMonth() + 1;
	//获取当前日
	var date = myDate.getDate();
	var h = myDate.getHours(); //获取当前小时数(0-23)
	var m = myDate.getMinutes(); //获取当前分钟数(0-59)
	var s = myDate.getSeconds();

	var nows = year + '-' + p(month) + "-" + p(date) + " " + p(h) + ':' + p(m) + ":" + p(s);
	return nows;
}


function my_ROUND(begin,end){
	begin=parseInt(begin)
	end=parseInt(end)
	var num = Math.round(Math.random()*(end-begin)+begin);
	return num;
}