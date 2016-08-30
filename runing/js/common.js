/* 
* @Author: zzx
* @Date:   2015-12-03 16:05:30
* @Last Modified time: 2015-12-09 18:38:39
*/

$(document).ready(function(){
    
    var win = $(window);
    //设置上下区域的高度
    $(".top").height((win.height()));
    //$(".top").width((win.width()));
    $(".bottom").height((win.height()));
    //$(".bottom").width((win.width()));

    win.resize(function(event) {
        //刷新页面
        //window.location.reload() ;
        //设置上下区域的高度
        $(".top").height((win.height()));
        //$(".top").width((win.width()));
        $(".bottom").height((win.height()));
        //$(".bottom").width((win.width()));
    });




    setTimeout(runBackground(-2000), 1000); //定时执行一次

    function runBackground(distance){
        var  dis = distance;

        if(distance){
            dis = distance; 
        }else{
            dis = "-2000";
        }                     
        $(".top").animate({backgroundPosition: dis+"px",},30000, function() {
                $(".top").css("background-position","0px");               
        });
              
    }


    var setBackground = setInterval(runBackground,30000);//定时循环 

        //初始化人物
        var personBox = $(".person-box");
        var ch =Math.round(Math.random()*1);

        switch(ch){
            case 0:personBox.addClass('run-girl');break;
            case 1:personBox.addClass('run-man');break;
            default:personBox.addClass('run-man');break;
        }

    //障碍物运动
    function runBarrier(){

        //初始化障碍物
        var box = $(".barrier-box");
        var choice =Math.round(Math.random()*4);
        switch(choice){
            case 1:box.attr("class","").addClass('extra-terrestrial-big barrier-box');break;
            case 2:box.attr("class","").addClass('extra-terrestrial-sm barrier-box');break;
            case 3:box.attr("class","").addClass('ghost-big barrier-box');break;
            case 4:box.attr("class","").addClass('ghost-sm barrier-box');break;
            case 0:box.attr("class","").addClass('ghost-sm barrier-box');break;
            default:box.attr("class","").addClass('extra-terrestrial-big barrier-box');break;
        }
        
        $(".barrier-box").show();//出现障碍物

        $(".barrier-box").animate({
                right: "40%",
            },
            7000, function() {

                $(".person-box").addClass("paused");//人物暂停
                $(".bottom").addClass("paused");//场景暂停
                $(".barrier-box").addClass("paused");//障碍物动画暂停

                //弹出题目 
                var html =  '<div class="question-mod">'+
                            '<div class="hat"><img src="images/hat.png" alt="" /></div>'+
                            '<div class="leaf"><img src="images/leaf.png" alt="" /></div>'+
                            '<div class="ask">'+
                            '<p>1、您有过皮炎过敏，长痘痘的经历吗？</p>'+
                            '</div>'+
                            '<div class="answer">'+
                            '<ul>'+
                            '<li>'+
                            '<dt class="L">'+
                            '<div class="input"><img src="images/input.png" alt="" /></div>'+
                            '</dt>'+
                            '<dt class="R"><div class="value">有</div></dt>'+
                            '</li>'+
                            '<li>'+
                            '<dt class="L">'+
                            '<div class="input"><img src="images/input.png" alt="" /></div>'+
                            '</dt>'+
                            '<dt class="R"><div class="value">没有</div></dt>'+
                            '</li>'+
                            '<li>'+
                            '<dt class="L">'+
                            '<div class="input"><img src="images/input.png" alt="" /></div>'+
                            '</dt>'+
                            '<dt class="R"><div class="value">好</div></dt>'+
                            '</li>'+
                            '<li>'+
                            '<dt class="L">'+
                            '<div class="input"><img src="images/input.png" alt="" /></div>'+
                            '</dt>'+
                            '<dt class="R"><div class="value">不好</div></dt>'+
                            '</li>'+
                            '</ul>    '+
                            '</div>'+
                            '<div class="answer-bottom">'+
                            '<div class="not-confirm">'+
                            '<img src="images/think.png" alt="" />'+
                            '</div>'+
                            '<div class="confirm">'+
                            '<img src="images/want.png" alt="" />'+
                            '</div>'+                                
                            '</div>'+
                            '</div>';

                        $(".layer").show();//显示承载容器
                        $(".layer").html(html);

                        $(".lockbg").show();//显示遮罩层
                        $(".lockbg").width(document.body.clientWidth);
                        $(".lockbg").height(document.documentElement.clientHeight);

                        //点击确定动画继续   
                        $(".question-mod").find(".confirm").on("click",function(){

                             $(this).find("img").attr("src","images/want-click.png");//确定按钮选中状态替换图片
                             $(".lockbg").hide();//隐藏遮罩层
                             $(".layer").hide();//隐藏承载容器
                             $(".person-box").removeClass("paused");//人物运动
                             $(".bottom").removeClass("paused");//场景运动
                             $(".barrier-box").css({"right":"0","display":"none"});//障碍物位置还原
                             $(".barrier-box").removeClass("paused");//障碍物运动
                             var setBarrier =  setTimeout(runBarrier, 5000);//答完题目后继续定时出现障碍物
                             

                             //提交问题和答案 题目 = ask下面p的值 答案 div=value的class为checked的值

                        });
                        //点击想想按钮
                        $(".question-mod").find(".not-confirm").on("click",function(){

                            $(this).find("img").attr("src","images/think-click.png");//想想按钮选中状态替换图片
                            $(".input").find("img").attr("src","images/input.png");//清空所有选中状态

                        });

                        //点击选项替换图片
                        $(".question-mod .answer ul li").on("click",function(){
                            
                            $(this).find("img").attr("src","images/input-click.png");//选中状态替换图片
                            $(this).siblings().find("img").attr("src","images/input.png");//重置其他选中状态图片
                            $(this).find(".value").addClass("checked");//选中状态对值赋class
                            $(this).siblings().find(".value").removeClass("checked");//移除兄弟节点的class
                            $(".not-confirm").find("img").attr("src","images/think.png");//还原想想的状态

                        });

        });
    }

    var setBarrier =  setTimeout(runBarrier, 7000);//定时出现障碍物



});