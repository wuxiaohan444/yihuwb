$(function () {
    // 选择位置
    for (let i = 0; i < $(".city-name button").length; i++) {
        $(".city-name button").eq(i).on("click", function () {
            $(".district-name").eq($('.city-name button').eq(i).attr("data-id")).show().siblings().hide();
            $(".content .address").text($(".city-name button").eq(i).text());
        })
    }

    for (let i = 0; i < $(".district-name button").length; i++) {
        $(".district-name button").eq(i).on("click", function () {
            console.log($(this).text());
            location.href = "hospital-outside.html?city="+$(".content .address").text()+"&area="+$(this).text();
        })
    }


    // 拿到首页存入的cookie
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

});