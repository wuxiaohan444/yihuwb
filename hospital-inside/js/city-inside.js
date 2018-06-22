var chooseCityId = null;
$(function () {

    // 拿到首页存入的GPS
    let city = localStorage.getItem("GPS").substring(0,2);
    console.log(city);
    $(".content .address").text(city);

    // 搜索城市
    $("input").on("keydown", function (e) {
        if(e.keyCode===13){
            for (let i = 0; i < $(".city-name button").length; i++) {
                if($(this).val()===$(".city-name button").eq(i).text()){
                    $(".city-name button").eq(i).show().siblings().hide();
                    $(".city-name h4").show();
                    $(".content .address").text($(".city-name button").eq(i).text());
                    $(".district-name").eq($('.city-name button').eq(i).attr("data-id")).show().siblings().hide();
                }
            }
        }
    })
	
	//加载默认所有城市
	$.ajax({
		url: ip + "/patient/product/getPositionInfo?loginUserCode="+getLoginUserCode(),
		type: "GET",
        contentType:"application/json;charset=utf-8",
        xhrFields:{
            withCredentials:true
        },
        beforeSend: function(xhr) {
            xhr.withCredentials = true;
        },
		success: function (res) {
			if(res.code != 0){
				alert(res.msg);
				return ;
			}
			
			var data = res.data;
			if(data == null || data == undefined || data.length == 0){
				return ;
			}
			
			for(var i = 0; i < data.length; i++){
				var info = data[i];
				$("#chooseHospital").before('<button data-id="'+info.id+'" onclick="clickCity(this);">'+info.city+'</button>&nbsp;');
			}
		}
	})
});

function clickCity(obj){
	$("#hospitalList").html("");
        $(".content .address").text($(obj).text());
		var id = $(obj).attr("data-id");
		chooseCityId = id;
		$.ajax({
			url: ip + "/patient/product/searchHospitalByCity?cityId="+id+"&loginUserCode="+getLoginUserCode(),
			type: "GET",
            contentType:"application/json;charset=utf-8",
            xhrFields:{
                withCredentials:true
            },
            beforeSend: function(xhr) {
                xhr.withCredentials = true;
            },
			success: function (res) {
				if(res.code != 0){
					alert(res.msg);
					return ;
				}
				
				var data = res.data;
				if(data == null || data == undefined || data.length == 0){
					return ;
				}
				
				for(var i = 0; i < data.length; i++){
					$("#hospitalList").append('<li onclick="clickHospital(this)">'+data[i]+'</li>');
				}
			}
		});
}

function clickHospital(obj){
	location.href = "hospital-inside.html?city="+$(".content .address").text()+"&area="+$(obj).text()+"&positionId="+chooseCityId;
}