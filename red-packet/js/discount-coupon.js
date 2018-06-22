$(function () {
    $.ajax({
        type: "GET",
        url: ip + "/patient/coupon/getInfoList?loginUserCode="+getLoginUserCode(),
        data: {
        },
        dataType: "json",
        jsonp: "callback",
        jsonpCallback: "success_jsonpCallback",
        success: function (data) {
            console.log(data.data.infoList);
            let msg = data.data.infoList;
            $(".discount-box").html(template("tpl", {data: msg}))
        }
    })
});