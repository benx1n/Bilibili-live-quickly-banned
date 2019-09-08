var href=window.location.href;
console.log(href);
var time=1
chrome.storage.sync.get("fengjinTime", function (obj) {
    if(typeof obj["fengjinTime"] != 'undefined'){
      time=obj["fengjinTime"];
      $('.time').val(time)
    }
    console.log(time);
    
})

var roomId=href.split('.com/')[1]
if(roomId.indexOf('/')>0){
    roomId=roomId.split('/')[0]
}
if(roomId.indexOf('?')>0){
    roomId=roomId.split('?')[0]
}
roomId=parseInt(roomId)

var CSRF_TOKEN=getCookie('bili_jct')

console.log(CSRF_TOKEN,roomId);

$(function(){
	/* chrome.runtime.sendMessage({greeting: xinxi}, function(response) {  
        console.log(response.farewell + ' ---  main 已经接收到'); 
    }); */
    $(document).on('mousedown','.user_fengjin_crx span',function(){
        console.log('dianji');
        

        if(!$(this).hasClass('menu_add')){
            userId=$('.danmaku-menu.p-fixed.z-danmaku-menu .username').next().find('.go-space a').attr('href')

        }
        else{
            userId=$(this).parent().prev().find('a').attr('href')
        }
        console.log(userId);
        
        userId=userId.split('.com/')[1].split('/')[0]

        console.log(userId);
        
        var jinyan_res=block(userId , time,roomId,CSRF_TOKEN)
        if(jinyan_res){
            console.log('禁言成功');
            
        }
        else{
            console.log(jinyan_res);

        }
    })


    var jiance=setInterval(() => {
        if($('.danmaku-menu.p-fixed.z-danmaku-menu .username').length){
            clearInterval(jiance);
            $('.danmaku-menu.p-fixed.z-danmaku-menu .username').next().after(`
                <div class="user_fengjin_crx"><span>快速封禁</span></div>
            `)
            console.log($('.bilibili-live-player-context-menu-container .context-menu-ul .context-menu-ul').length);
            
            if($('.bilibili-live-player-context-menu-container .context-menu-ul li[data-auto-remove="1"]').length){
                
            }
            
        }
    }, 300);
    
    $(document).on('mouseenter','.bilibili-live-player-context-menu-container .context-menu-ul li[data-auto-remove="1"]',function(){
        console.log(122221);
        
        var that=$(this)
        setTimeout(() => {
            if(!that.find('.user_fengjin_crx').length)
                that.find('.context-menu-ul').append(`
                    <li class="user_fengjin_crx"><span class="menu_add">快速封禁</span></li>
                `)
        }, 200);
    })
   
   
    
})

function getCookie(name){
    let arr;
    const reg = new RegExp(`(^| )${name}=([^;]*)(;|$)`);
    if ((arr = document.cookie.match(reg))) {
        return unescape(arr[2]);
    } else {
        return null;
    }
};


async function block(userId, time,roomId,CSRF_TOKEN) {
    let ret = await $.ajax({
        type: 'post',
        url: '//api.live.bilibili.com/banned_service/v2/Silent/add_block_user',
        crossDomain: true,
        dataType: 'json',
        data: {
            roomid: roomId,
            block_uid: userId,
            hour: time,
            csrf: CSRF_TOKEN,
            csrf_token: CSRF_TOKEN,
            visit_id: null
        },
        xhrFields: {
            withCredentials: true
        }
    });
    if (ret.code == -400) {
        console.log(ret);
        return false;
    } else if (ret.code == -403) {
        //forbiden
        return false;
    }
    else {
        return true;
    }
}

// https://api.live.bilibili.com/banned_service/v2/Silent/add_block_user

/* roomid:11588230
block_uid:37413137
hour:1
csrf_token:10f0020032c22fc05e4a12440ae0728b
csrf:10f0020032c22fc05e4a12440ae0728b
visit_id:
 */