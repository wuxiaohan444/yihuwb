$(function () {
    $.ajax({
        type: "GET",
        url: ip + "/patient/reward/getInfoList?loginUserCode="+getLoginUserCode(),
        data: JSON.stringify({

        }),
        dataType: "json",
        jsonp: "callback",
        contentType:"application/json;charset=utf-8",
        xhrFields:{
            withCredentials:true
        },
        beforeSend: function(xhr) {
            xhr.withCredentials = true;
        },
        jsonpCallback: "success_jsonpCallback",
        success: function (data) {
            console.log(data);
            $(".reward-record").html(template("tpl",data))
            $(".reward-head").html(template("info",data));
        }
    })
});