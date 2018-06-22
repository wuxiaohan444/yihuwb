$(document).ready(function (e) {
    let id = location.search.split("=")[1];
    console.log(id);
    // 轮播图
    let mySwiper = new Swiper('.swiper-container', {
        loop: true,
        autoplay: 5000,
        autoplayDisableOnInteraction: false, /* 注意此参数，默认为true */
        pagination: '.swiper-pagination',
        paginationClickable: true,
    });

    // 跳转到评价详情
    $(".count-right").on("click", function () {
        window.location.href = '../order/evaluate-details.html'
    });

    $.ajax({
        url: ip + "/patient/product/selectProductById?loginUserCode="+getLoginUserCode(),
        type: "GET",
        data: {
            id: id
        },
        contentType:"application/json;charset=utf-8",
        xhrFields:{
            withCredentials:true
        },
        beforeSend: function(xhr) {
            xhr.withCredentials = true;
        },
        success: function (data) {
            console.log(data);
            $(".all-main").html(data.data.detail.introduce); //产品介绍
            $(".cost").eq(0).append(data.data.detail.costExplain); //费用说明
            $(".cost").eq(1).append(data.data.detail.waring); //费用说明
            $(".server-details").html(template("half",data));

            // 半自理判断图片
            for (let i = 0; i < data.data.details[1].services.length; i++) {
                if (data.data.details[1].services[i].photo !== null) {
                    let photo = data.data.details[1].services[i].photo.split(",");
                    console.log(photo);
                    for (let j = 0; j < photo.length; j++) {
                        $(".half .work").eq(i).append($("<img src='phoro[j]'>"))
                    }
                }
            }
            $(".clauses").html(template("clauses", data));
            $(".count-evaluate").html(template("history", data));
            $(".evaluate").html(template("evaluate", data))
            // 跳转到立即购买
            $(".immediately").on("click",function () {
                window.location.href="buy-order.html?id="+data.data.id+"&name="+data.data.name+"&type="+2;
            })
        }
    });


    $(".all-tab a").on("click", function () {
        console.log(1);
        window.location.href = "all-day-details.html?id="+id;
    })
});