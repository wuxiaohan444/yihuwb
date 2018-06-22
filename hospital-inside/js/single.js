$(function () {
    let id = location.search.split("&")[0].split("=")[1];
    let type = location.search.split("&")[1].split("=")[1];
    let positionId = location.search.split("&")[2].split("=")[1];
    let single = decodeURIComponent(location.search.split("&")[3].split("=")[1]);
    let msg;
    console.log(single);
    // 获取头部信息
    $(".single-head h3").text(single);
    // 获取到推荐
    $.ajax({
        url: ip + "/patient/product/selectProductByTag?loginUserCode="+getLoginUserCode(),
        type: "GET",
        data: {
            type: type,
            positionId: positionId,
            tagId: id
        },
        contentType:"application/json;charset=utf-8",
        xhrFields:{
            withCredentials:true
        },
        beforeSend: function(xhr) {
            xhr.withCredentials = true;
        },
        async: false,
        success: function (data) {
            console.log(data);
            msg = data.data;
            $(".single-main").html(template("single-main", data));
            for (let i = 0; i < data.data.length; i++) {
                if (data.data[i].isHot === 1) {
                    $(".item .label").eq(i).addClass("hot");
                    $(".item .label").eq(i).text("热门")
                }
                else if (data.data[i].isHot === 0) {
                    $(".item .label").eq(i).addClass("rec");
                    $(".item .label").eq(i).text("推荐")
                }
                else if (data.data[i].isHot === null) {
                    $(".item .label").eq(i).hide();
                }
            }

// 点击出现详情
            for (let i = 0; i < $(".item").length; i++) {
                $(".item .name").eq(i).on("click", function () {
                    let ids = $(".item .name").eq(i).attr("data-id");
                    console.log(ids);
                    $.ajax({
                        url: ip + "/patient/product/selectProductById?loginUserCode="+getLoginUserCode(),
                        type: "GET",
                        data: {
                            id: ids
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
                            $(".modal").show();
                            $(".title h5").text($(".name h3").eq(i).text());
                            $(".introduce").html(data.data.details[0].introduce)
                        }
                    });


                });
            }
        }
    });
    // 购物车功能
    let count = $(".num .count"); //数字
    let minus = $(".num .minus"); //减法
    let price = $(".real-price"); //价格

    let sum = 0; //总价格
    // 点击选中
    for (let i = 0; i < $(".item").length; i++) {
        if (count.eq(i).text() === '0') {
            minus.eq(i).addClass("now");
        }
        $(".radio").eq(i).on("click", function () {
            $(this).toggleClass("selected");
            if ($(this).hasClass("selected")) {
                sum = sum + +price.eq(i).text() * +count.eq(i).val();
                $(".new-price").text(sum);
                console.log(sum);
            } else {
                sum = sum - +price.eq(i).text() * +count.eq(i).val();
                $(".new-price").text(sum);
            }
        });

        // 加法
        $(".num .plus").eq(i).on("click", function () {
            count.eq(i).val(+count.eq(i).val() + 1);
            $(".num .minus").eq(i).removeClass("now");
            if ($(".radio").eq(i).hasClass("selected")) {
                sum = sum + +price.eq(i).text();
                $(".new-price").text(sum);
            }
        });
        // 减法
        minus.eq(i).on("click", function () {
            if (count.eq(i).val() <= '1') {
                count.eq(i).val(1);
                minus.eq(i).addClass("now");
            }
            count.eq(i).val(+count.eq(i).val() - 1);
            if ($(".radio").eq(i).hasClass("selected")) {
                sum = sum - +price.eq(i).text();
                if (sum <= 0) {
                    sum = 0;
                }
                console.log(sum);
                $(".new-price").text(sum);
            }
        });
    }


// 点击隐藏
    $(".modal .close").on("click", function () {
        $(".modal").hide();
    });
    // 拿到所有信息
    let info = [];
    let info1;
    let data;
    let server = [];
    let server1;
    let along;
    $(".immediately").on("click", function () {
        for (let i = 0; i < $(".item .radio").length; i++) {
            if ($(".item .radio").eq(i).hasClass("selected")) {
                data = {
                    productId: msg[i].detail.productId,
                    count: $(".num .count").eq(i).val(),
                };
                along = {
                    name: msg[i].name,
                    count: $(".num .count").eq(i).val(),
                };
                info.push(data);
                server.push(along);
            }
        }
        info1 = JSON.stringify(info);
        server1=JSON.stringify(server);
        console.log(info1);
        window.location.href = "buy-order(piece).html?info=" + encodeURI(info1) + "&single=" + single+ "&server=" + encodeURI(server1)+"&id="+id;
    })


});



