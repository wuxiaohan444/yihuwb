$(function () {
    $.ajax({
        type: "GET",
        url: ip + "/patient/customer/getAssessInfo?loginUserCode="+getLoginUserCode(),
        data: {
        },
        dataType: "json",
        jsonp: "callback",
        jsonpCallback: "success_jsonpCallback",
        success: function (data) {
            console.log(data);
            $(".evaluate-main").html(template("tpl", data));
            $(".evaluate-head").html(template("tpl2",data))
        }
    })
});