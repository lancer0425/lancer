$(document).ready(function(){
$(window).on("load",function(){
    imgLocation();
})
})
function imgLocation(){
    // 获取到的是类数组对象
    var box=$(".box");
    console.log(box)
    // 获取装照片盒子的宽度
    var boxWidth=box.eq(0).width();
    // 获取窗口宽度 /当前装照片容器的宽度 =每行放照片的数量
    var num=Math.floor($(window).width()/boxWidth)   /*floor  取整*/
    // console.log(num)

    // 创建一个空数组 放这一行中所有照片的高度
    var boxArr=[];
    // 遍历box类数组对象取每个照片的高度
    box.each(function(index,value){
        // console.log(index+"---"+value)
        // 拿每个照片的高度
        var boxHeight=box.eq(index).height();
        // console.log(boxHeight)
        if(index<num){
            boxArr[index]=boxHeight;
        }else{
            // 从boxArr[index]判断最小高度
            var minboxHeight=Math.min.apply(null,boxArr);
            var minboxIndex=$.inArray(minboxHeight,boxArr)
            // console.log(minboxHeight);
            // console.log(value);
            $(value).css({
                "position":"absolute",
                "top":minboxHeight,
                "left":box.eq(minboxIndex).position().left
            });
            boxArr[minboxIndex]+=box.eq(index).height();
        }
    })
}