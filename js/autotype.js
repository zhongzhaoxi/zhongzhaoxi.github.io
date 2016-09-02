$.fn.autotype = function(){

        var $text = $(this);
        var str = $text.html();//返回被选 元素的内容     
        var index = 0;
        var x = $text.html('');//$text.html()和$(this).html('')有区别
        
        var timer = setInterval(function(){
                        //substr(index, 1) 方法在字符串中抽取从index下标开始的一个的字符
            var current = str.substr(index, 1);
            
            if(current == '<'){
                        //indexOf() 方法返回">"在字符串中首次出现的位置。
                index = str.indexOf('>', index) + 1;
            }else{
                index ++ ;
            }
            
            //console.log(["0到index下标下的字符",str.substring(0, index)],["符号",index & 1 ? '_': '']);
            //substring() 方法用于提取字符串中介于两个指定下标之间的字符
            $text.html(str.substring(0, index) + (index & 1 ? '_': ''));
            if(index >= str.length){
                clearInterval(timer);
            }
        },100);
};