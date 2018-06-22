$(function () {
    let deadline;
    // 发送请求
    $.ajax({
        url: ip + "/patient/insure/getInsureProductDetail?loginUserCode="+getLoginUserCode(),
        type: "GET",
        data: {
            productId: 16
        },
        async: false,
        success: function (data) {
            console.log(data);
            $(".derails-head").html(template("head", data));
            $(".content").html(template("content", data));
            deadline = data.data.productInsure.term;
            $(".deadline").html(deadline + "年");
            $(".price-one").html(data.data.productInsure.price + "元")
            $(".price-count").html("￥" + data.data.productInsure.price)
        }
    });

    $(".three").on("click", function () {
        $(".insurance-main").toggleClass("hidden");
        $(".choose-man").toggleClass("hidden");
    });


    $(".equity-title").on("click", function () {
        window.location.href = "safeguard.html"
    });

    // 点击调用日历
    $(".insurance-info-item .start").on("click", function () {
        $(".modal").show();
        $("body").addClass("hidden");
        $("html").addClass("hidden");
    });
    for (let i = 0; i < $(".calendar-date .item").length; i++) {
        $(".calendar-date .item").eq(i).on('click mouseenter', function () {
            console.log(1);
            $(this).removeClass(".item-selected");
            let year = $(this).attr('data').substring(0, 4);
            let month = $(this).attr('data').substring(4, 6);
            let day = $(this).attr('data').substring(6, 8);
            $(this).prevAll().addClass("now");
            $(".insurance-info-item .start").text(year + "-" + month + '-' + day);
            $(".insurance-info-item .end").text((+year + deadline) + "-" + month + '-' + day)
            $(".modal").hide();
        });
    }


    // 选择受益人
    $.ajax({
        url: ip + "/patient/customerRelationship/getInfoList?loginUserCode="+getLoginUserCode(),
        type: "GET",
        data: {
            customerId: "1",
        },
        dataType: "json",
        jsonp: "callback",
        jsonpCallback: "success_jsonpCallback",
        success: function (data) {
            console.log(data);
            $(".choose-man").html(template("choose-man", data));
            for (let i = 0; i < $(".choose-man button").length; i++) {
                $(".choose-man button").eq(i).on("click",function () {
                    $(this).addClass("now").siblings().removeClass("now");
                    $(".compellation").text(data.data.infoList[i].name)
                    $(".idcard ").text(data.data.infoList[i].idCardNo)
                })
            }
        }
    })
});