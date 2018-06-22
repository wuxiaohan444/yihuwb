$(function () {
    $.ajax({
        url: ip + "/patient/customerRelationship/add?loginUserCode="+getLoginUserCode(),
        type: "GET",
        data:JSON.stringify({
            name:"张三",
            sex:"1",
            idCardNo:"340881199401194315",
            phone:15256597119,
            address:"上海",
            relationship:"妇女女"
        }),
        dataType: "json",
        jsonp: "callback",
        contentType: "application/json;charset=utf-8",
        xhrFields: {
            withCredentials: true
        },
        beforeSend: function (xhr) {
            xhr.withCredentials = true;
        },
        jsonpCallback: "success_jsonpCallback",
        success: function (data) {
            console.log(data);
        },
        error: function (data) {
            console.log(data);
        }
    });

});