$(function () {
    // 个人信息
    $.ajax({
        type: "GET",
        url: ip + "/patient/customer/getInfoDetail?loginUserCode="+getLoginUserCode(),
        data: JSON.toString({}),
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
        success: function (data) {
            console.log(data.data.name);
            if(data.data.name !==null){
                $(".person-head .name").text(data.data.name)
            }
            else{
                $(".person-head .name").text("待录入")
            }
        }
        })
});