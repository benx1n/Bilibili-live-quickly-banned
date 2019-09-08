$(function(){
	$('.save').click(function (e) { 
    var t=$('.time').val()
    if($.trim(t)!=""){
      chrome.storage.sync.set({"fengjinTime": $.trim(t)});
      layer.msg("保存成功！")
    }
    else{
      layer.msg("请先填写，不能为空")
    }
    
  });

  chrome.storage.sync.get("fengjinTime", function (obj) {
    if(typeof obj["fengjinTime"] != 'undefined'){
      var time=obj["fengjinTime"];
      $('.time').val(time)
    }
  })
})