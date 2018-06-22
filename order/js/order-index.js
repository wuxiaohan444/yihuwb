$(function () {
    let all;
    for (let i = 0; i < $(".order-head>div").length; i++) {
        $(".order-head div").eq(i).on("click", function () {
            $(this).addClass("active").siblings().removeClass("active");
            console.log(1);
            $(".order-main").eq(i).show().siblings().hide();
        })
    }
    // 查询全部订单
    $.ajax({
        type: "GET",
        url: ip + "/patient/order/getOrderAll?loginUserCode=" + getLoginUserCode(),
        data: JSON.stringify({
            rows: 6
        }),
        dataType: "json",
        contentType: "application/json;charset=utf-8",
        xhrFields: {
            withCredentials: true
        },
        beforeSend: function (xhr) {
            xhr.withCredentials = true;
        },
        jsonp: "callback",
        async: false,
        jsonpCallback: "success_jsonpCallback",
        success: function (data) {
            console.log(data);
            $(".details .all").html(template("all", data));
            // 判断状态
            for (let i = 0; i < $(".all .order-main-item").length; i++) {
                if (data.data[i].payStatus === 0) {
                    $(".all .item-right").eq(i).text("待付款");
                    $(".all .item-right").eq(i).addClass("await-money");
                } else {
                    if (data.data[i].status === 2) {
                        $(".all .item-right").eq(i).text("进行中");
                        $(".all .item-right").eq(i).addClass("ing");
                        console.log(1);
                    } else if (data.data[i].status === 3) {
                        $(".all .item-right").eq(i).text("服务中");
                        $(".all .item-right").eq(i).addClass("server");
                    }
                    else if (data.data[i].status === 4) {
                        $(".all .item-right").eq(i).text("待评价");
                        $(".all .item-right").eq(i).addClass("await-assess");
                    }
                    else if (data.data[i].status === 5) {
                        $(".all .item-right").eq(i).text("已完成");
                        $(".all .item-right").eq(i).addClass("complete");
                    }
                    else if (data.data[i].status === 1) {
                        $(".all .item-right").eq(i).text("预订单");
                        $(".all .item-right").eq(i).addClass("complete");
                    }
                }

                for (let j = 0; j < data.data[i].infos.length; j++) {
                    if (data.data[i].infos[j].productType === 1) {
                        $(".item-bottom .price").hide();
                    }else{
                        $(".item-bottom .time").hide();
                    }

                }
            }
        }
    });


    // 点击链接到订单详情页
    for (let i = 0; i < $(".order-main-item").length; i++) {
        $(".order-main-item").eq(i).on("click", function () {
            if ($(".item-right").eq(i).text() === "待付款") {
                window.location.href = 'await.html?id=' + $(this).attr('data-id')
            }
            if ($(".item-right").eq(i).text() === "进行中") {
                console.log(1);
                window.location.href = 'underway-evaluate.html'
            }
            if ($(".item-right").eq(i).text() === "服务中") {
                console.log(1);
                window.location.href = 'server-evaluate.html'
            }
            if ($(".item-right").eq(i).text() === "待评价") {
                console.log(1);
                window.location.href = 'await-evaluate.html'
            }
            if ($(".item-right").eq(i).text() === "已完成订单") {
                console.log(1);
                window.location.href = 'complete-evaluate.html'
            }
        })
    }

    // // 查询该用户下已付款订单
    // $.ajax({
    //     type: "GET",
    //     url: ip + "/patient/order/getAlreadyPay",
    //     data: {
    //         'customerId': '1'
    //     },
    //     dataType: "json",
    //     jsonp: "callback",
    //     jsonpCallback: "success_jsonpCallback",
    //     success: function (data) {
    //         console.log(data);
    //         $(".details .already").html(template("already",data))
    //     }
    // })
    //
    // // 查询该用户下待评价订单
    // $.ajax({
    //     type: "GET",
    //     url: ip + "/patient/order/getWaitAssess",
    //     data: {
    //         'customerId': '1'
    //     },
    //     dataType: "json",
    //     jsonp: "callback",
    //     jsonpCallback: "success_jsonpCallback",
    //     success: function (data) {
    //         console.log(data);
    //         $(".details .await").html(template("await",data))
    //     }
    // })


});