
$(function(){
	$('#save').click(function(){
		var txt=$('#txt').val();
		var colors = [txt,'F1B52C','4585EC','49D76E','755AEA'];
		
		chrome.storage.sync.set({"myColors": colors});
		//layer.alert('保存成功', {icon: 6,title:'保存结果'});
		layer.msg('保存成功', {
			icon: 6,
			time: 800
		});
	})
})