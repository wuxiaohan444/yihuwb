// b点击切换产品和说明
$(function () {
    let type;  //自理半自理不能自理状态
    for (let i = 0; i < $(".all-tab .server").length; i++) {
        $(".all-tab .server").eq(i).on("click", function () {
            console.log(1);
            $(this).addClass("active").siblings().removeClass("active");
            $(".day-nurse").eq(i).removeClass("hidden").siblings(".day-nurse").addClass("hidden");
        })
    }

    let id = location.search.split("=")[1];
    $(".all-tab a").on("click", function () {
        window.location.href = "all-day.html?id=" + id;
    });
    $.ajax({
        url: ip + "/patient/product/selectProductById?loginUserCode="+getLoginUserCode(),
        type: "GET",
        data: {
            id: id
        },
        contentType:"application/json;charset=utf-8",
        xhrFields:{
            withCredentials:true
        },
        beforeSend: function(xhr) {
            xhr.withCredentials = true;
        },
        success: function (data) {
            console.log(data);
            $(".day-nurse").eq(1).append(data.data.detail.costExplain);
            $(".day-nurse").eq(2).append(data.data.detail.waring);
            $(".details-head").html(template("head", data));
            $(".cannot").html(template("cannot", data));
            $(".half").html(template("half", data));
            $(".oneself").html(template("oneself", data));
            // 服务详情点击
            for (let i = 0; i < $(".details>button").length; i++) {
                $(".details>button").eq(i).on("click", function () {
                    $(this).addClass("active").siblings().removeClass("active");
                    $(".details .item").eq(i).removeClass("hidden").siblings().addClass("hidden");
                    $(".details-head p .price").text(data.data.details[i].pricing);
                    if (i === 0) {
                        type = 1;
                    } else if (i === 1) {
                        type = 2;
                    } else if (i === 2) {
                        type = 3;
                    }
                })
            }
            // 不能自理判断图片
            for (let i = 0; i < data.data.details[0].services.length; i++) {

                if (data.data.details[0].services[i].photo !== null) {
                    let photo = data.data.details[0].services[i].photo.split(",");
                    for (let j = 0; j < photo.length; j++) {
                        $(".cannot .work").eq(i).append($("<img src='phoro[j]'>"))
                    }
                }
            }
            // 半自理判断图片
            for (let i = 0; i < data.data.details[1].services.length; i++) {
                if (data.data.details[1].services[i].photo !== null) {
                    let photo = data.data.details[1].services[i].photo.split(",");
                    console.log(photo);
                    for (let j = 0; j < photo.length; j++) {
                        $(".half .work").eq(i).append($("<img src='phoro[j]'>"))
                    }
                }
            }
            // 自理判断图片
            for (let i = 0; i < data.data.details[2].services.length; i++) {
                if (data.data.details[2].services[i].photo !== null) {
                    let photo = data.data.details[2].services[i].photo.split(",");
                    console.log(photo);
                    for (let j = 0; j < photo.length; j++) {
                        $(".half .work").eq(i).append($("<img src='phoro[j]'>"))
                    }
                }
            }

            $(".immediately").on("click", function () {
                for (let i = 0; i < $(".day-nurse button").length; i++) {
                    if ($(".day-nurse button").eq(i).hasClass("active")) {
                        window.location.href = "buy-order(time).html?id=" + data.data.id + "&name=" + data.data.name + "&type=" + (i+1)+"&detailId="+data.data.detail.id;
                    }
                }

            })
        }
    });
});
