$(function () {
    $.ajax({
        type: "GET",
        url: ip + "/patient/order/getOrderAssessmentList?loginUserCode="+getLoginUserCode(),
        data: {
        },
        dataType: "json",
        jsonp: "callback",
        jsonpCallback: "success_jsonpCallback",
        success: function (data) {
            console.log(data);
            $(".assess-head").html(template("tpl2",data));
            $(".assess-record").html(template("tpl",data));

        }
    })
});