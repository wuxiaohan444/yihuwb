$(function () {
    // 选择位置
    for (let i = 0; i < $(".city-name button").length; i++) {
        $(".city-name button").eq(i).on("click", function () {
            console.log($(this).text());
            localStorage.setItem("city", $(this).text());
            window.location.href = "index.html?"
        })
    }

    // 拿到首页存入的GPS
    let city = localStorage.getItem("GPS");
    console.log(city);
    $(".content .address").text(city);


    // 搜索城市
    $("input").on("keydown", function (e) {
        if(e.keyCode===13){
            for (let i = 0; i < $(".city-name button").length; i++) {
                if($(this).val()===$(".city-name button").eq(i).text()){
                    $(".city-name button").eq(i).show().siblings().hide()
                    $(".city-name h4").show();
                    $(".content .address").text($(".city-name button").eq(i).text());
                }
            }
        }

    })

});