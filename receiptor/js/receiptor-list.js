$(function () {

    $.ajax({
        url: ip + "/patient/customerRelationship/getInfoList?loginUserCode="+getLoginUserCode(),
        type: "GET",
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
            $(".list-head .name").text(data.data.name);
            $(".list").html(template("content", data));

            // 更换受益人
            for (let i = 0; i < $(".list-item-man").length; i++) {
                $(".list-item-man").eq(i).on("click", function () {
                    $(".modal").show();
                    $(".hint-main span").text($(this).find(".name").text());
                    let id = data.data.infoList[i].id;
                    console.log(id);
                    // 确认更换受益人
                    $(".modal button").on("click", function () {
                        $(".modal").hide();

                        // 添加接口
                        $.ajax({
                            url: ip + "/patient/customerRelationship/updateDefault?loginUserCode="+getLoginUserCode(),
                            type: "POST",
                            data: JSON.stringify({
                                relationshipId: id
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
                            jsonpCallback: "success_jsonpCallback",
                            success: function (data) {
                                console.log(data);
                                window.location.reload()
                            },
                        });
                    });
                })
            }

            // 修改受益人
            for (let i = 0; i < $(".list-item").length; i++) {
                $(".icon-edit").eq(i).on("click", function () {
                    let id = data.data.infoList[i].id;
                    window.location.href = "delete-receiptor.html?id=" + id;
                });
            }

            // 关闭模态框
            $(".hint-top .close").on("click", function () {
                $(".modal").hide();
            });
        },
    });

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
            $(".add-man").on("click", function () {
                // 首次添加受益人
                if (data.data.length > 0) {
                    window.location.href = 'receiptor.html';
                }
                else {
                    window.location.href = 'add-receiptor.html'
                }

            });
        },
    });
})


