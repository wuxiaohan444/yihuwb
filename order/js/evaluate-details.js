//传订单ID,渲染订单详情

$(function () {
    //TODO ID位置
    $("#query").on("click", function () {
        var orderId = $("#id").val();
        //查询指定的订单详情
        $.ajax({
            type: "GET",
            url: ip + "/patient/order/getOrderDetails?loginUserCode="+getLoginUserCode(),
            data: {
                'orderId': orderId
            },
            dataType: "json",
            jsonp: "callback",
            jsonpCallback: "success_jsonpCallback",
            success: function (data) {
                console.log(data);
                // console.log(data.data.orderList[0].orderInfoList1[0]);
                let msg = data.data.orderList;
                $(".details .all").html(template("all", {data: msg}))
            }
        })
    })
});
