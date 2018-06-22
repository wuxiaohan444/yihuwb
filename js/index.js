$(document).ready(function (e) {
    // 轮播图
    let mySwiper = new Swiper('.swiper-container', {
        loop: true,
        autoplay: 5000,
        autoplayDisableOnInteraction: false, /* 注意此参数，默认为true */
        pagination: '.swiper-pagination',
        paginationClickable: true,
    });
});


// 填写受益人
$(function () {
    // 判断登录
    let code;
    console.log(document.cookie);
    if (document.cookie === "" || document.cookie === undefined || document.cookie === "code=undefined") {
        code = (new Date()).getTime();
        document.cookie = "code=" + code
    } else {
        code = document.cookie.split("=")[1]
    }
    console.log(code);
    $.ajax({
        url: ip + "/patient/weChat/login",
        type: "POST",
        data: JSON.stringify({
            "code": code
        }),
        dataType: "json",
        contentType: "application/json;charset=utf-8",
        xhrFields: {
            withCredentials: true
        },
        async: false,
        beforeSend: function (xhr) {
            xhr.withCredentials = true;
        },
        success: function (data) {
            console.log(data);
        }
    });

    // 发送请求
    $.ajax({
        type: "GET",
        url: ip + "/patient/order/getOrderStatusOnHome?loginUserCode=" + getLoginUserCode(),
        dataType: "json",
        jsonp: "callback",
        jsonpCallback: "success_jsonpCallback",
        contentType: "application/json;charset=utf-8",
        xhrFields: {
            withCredentials: true
        },
        beforeSend: function (xhr) {
            xhr.withCredentials = true;
        },
        async: false,
        success: function (data) {
            console.log(data);
            if (data.data.showStatus === 1) {
                $(".write>button").hide();
                $(".write>img").show();
                if (data.data.orderStatus === 6) {
                    $(".write>img").attr("src", "images/fill-in.jpg")
                } else if (data.data.orderStatus === 2) {
                    $(".write>img").attr("src", "images/ing.jpg");
                } else if (data.data.orderStatus === 3) {
                    $(".write>img").attr("src", "images/server.jpg");
                } else if (data.data.orderStatus === 4) {
                    $(".write>img").attr("src", "images/evalute.jpg");
                }


            } else {
                $(".write>img").hide();
                $(".write>button").show();
            }
        }
    })

});

$(function () {
    // 查看受益人
    $.ajax({
        url: ip + "/patient/customerRelationship/selectAllBeneficiary?loginUserCode=" + getLoginUserCode(),
        type: "GET",
        dataType: "json",
        jsonp: "callback",
        jsonpCallback: "success_jsonpCallback",
        async: false,
        contentType: "application/json;charset=utf-8",
        xhrFields: {
            withCredentials: true
        },
        beforeSend: function (xhr) {
            xhr.withCredentials = true;
        },
        success: function (data) {
            console.log(data);
            $(".write button").on("click", function () {
                // 首次添加受益人
                if (data.data.length > 0) {
                    window.location.href = 'receiptor/receiptor.html';
                }
                else {
                    window.location.href = 'receiptor/add-receiptor.html'
                }

            });
        },
    });


});
