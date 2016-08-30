/* 
* @Author: zzx
* @Date:   2016-03-30 10:15:08
* @Last Modified time: 2016-04-05 16:43:52
*/

$(document).ready(function(){

H5shake();//摇一摇初始化

var ish5shake = false;
function H5shake(){
    var myShakeEvent = new Shake({
        threshold: 15
    });
    myShakeEvent.start();
    window.addEventListener('shake', shakeEventDidOccur, false);
    function shakeEventDidOccur () {

        if(ish5shake){return false;}

        AnimateShake();  
    }
};

//layer弹窗
function alertmsg(msg){
  layer.open({
      content:msg,
      style: 'background-color:#fff; color:#000; border:none;margin:0 auto;width:50%;',
      time: 2
  });
}

function alertcon(con){
    layer.open({
        type: 1,
        content:con,
        shadeClose:false
    });
}

// 点击屏幕模拟摇一摇事件
$(".hand").on("click",function(){
    AnimateShake();
});

function AnimateShake(){  

    if(ish5shake){return false;}
    ish5shake = true;//阻止继续摇一摇

    var o = document.getElementById("audio1");
    var m = document.getElementById("audio2");       

    var hand = $(".hand");
        hand.addClass('wobble');//添加手势动画

        o.play();// 声音  


    setTimeout(popup, 600);

    function popup(){
        m.play();// 声音

        //弹窗内容
        var randomNum =Math.round(Math.random()*1);

        switch(randomNum){
            case 0:Lose();break;
            case 1:Win();break;
            default:Win();break;
        }

        hand.removeClass('wobble');//移除手势动画
    }   
}
//得奖
function Win(){ 
    window.location.href="prize.html";
}

//没得奖
function Lose(){ 
    var g ='';
        g +='<div class="noprize">';
        g +='<div class="star">';
        g +='<img src="images/star.png" alt="" />';
        g +='</div>';
        g +='<div class="close">';
        g +='<img src="images/close.png" alt="" />';
        g +='</div>';
        g +='<div class="noprize-top">';
        g +='<img src="images/content-top.png" alt="" />';
        g +='</div>';
        g +='<div class="noprize-content">';
        g +='<div class="noprize-face">';
        g +='<img src="images/noprize-face.png" alt="" />';
        g +='</div>';
        g +='<div class="noprize-text">';
        g +='<p>明天继续</p>';
        g +='</div>';
        g +='</div>';
        g +='<div class="noprize-bottom">';
        g +='<img src="images/content-bottom.png" alt="" />';
        g +='</div>';
        g +='</div>';

        alertcon(g);
    
    //点击再来一次
    $(".close").on("click",function(){
        layer.closeAll();
        ish5shake = false;//可以继续摇一摇
    });
}

//重新laym遮罩层事件
$(document).on("click",".laymshade",function(){
        //console.log($(this));
        ish5shake = false;//继续摇一摇
        layer.closeAll();
        console.log(2222);
});

});


