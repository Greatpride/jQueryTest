
$(function(){
    //数据初始化
   init();
   //省份选中切换
   $(".province").on("change",function(){
        interface($(this).next(),2,$(this).val());
   });
   //城市选中切换
   $(".city").on("change",function(){
        interface($(this).next(),3,$(this).val());
   });
   //地区选中切换
   $(".district").on("change",function(){
       var provinceStr = $(".province").val() + "-" + $(".province").find("option:selected").text();
       var cityStr = $(".city").val() + "-" + $(".city").find("option:selected").text();
       var districtStr = $(".district").val() + "-" + $(".district").find("option:selected").text();
        $(".show-choose").html(provinceStr + " " + cityStr + " " +  districtStr);
   });
});
//初始化方法
function init(){
    interface($(".province"),1,"");
}

//接口封装
function interface(aim,level,param){
    //aim 目标jquery 如 $(".province")
    //level 层级 1省 2市 3地区
    //param areaId参数
    if(param){
        param = {
            areaId:param
        }
    }
    //清除切换冗余数据
    clear(aim,level);
   
    //ajax请求数据
    $.ajax({
        type: "GET",
        url: "http://b2b.haier.com/shop/api/process/app/getAreaInfo",
        data: param,
        dataType: "json",
        success: function(data){
            //接口返回是否成功
            var flag = data.success;
            //若成功
            if(flag){
                var res = data.body.result;
                if(res.length>0){
                    var endStr = "";
                    if(level==1){
                        endStr = "<option value=''>请选择</option>";
                    }
                    for(var i=0,len=res.length; i<len; i++){
                        endStr = endStr + "<option value='"+res[i].id+"'>"+res[i].cityName+"</option>";
                    }
                    //拼入option
                    aim.append(endStr);
                }
            }
        }
    });
}
//清除
function clear(aim,level){
    var clearStr = "<option value=''>请选择</option>";
    if(level==1){
        $(".city").empty().append(clearStr);
        $(".district").empty().append(clearStr);
    } else if(level==2){
        $(".city").empty().append(clearStr);
        $(".district").empty().append(clearStr);
    }else if(level==3){
        $(".district").empty().append(clearStr);
    }

}

