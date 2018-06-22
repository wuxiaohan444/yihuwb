$(function () {
	// 接受地理信息
	let city = getUrlParam("city");
	let hospitalName = getUrlParam("area");
	let positionId = getUrlParam("positionId");
	if(hospitalName != null)
		$(".hospital-head p a").text(hospitalName);
	if(city != null)
		$('.city-address').text(city);
	if(positionId == null)
		positionId = 1;

    
    let msg;
    let ajax = function (type, b, c, d) {
        $.ajax({
            url: ip + "/patient/product/selectTagByType?loginUserCode="+getLoginUserCode(),
            type: "POST",
            data:JSON.stringify({
                "type": type,
                "positionId": b,
				"hospitalName" : hospitalName
            }),
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
                for (let i = 0; i < data.data.length; i++) {
                    data.data[i].type = type;
                    data.data[i].positionId = b;
                }
                msg = data.data;
                $(c).html(template(d, data));
                // 控制图片
                for (let i = 0; i < msg.length; i++) {
                    if (msg[i].name === "全科") {
                        $(c).find("img").attr("src", "../images/yuannei1.png");
                    } else if (msg[i].name === "骨科") {
                        $(c).find("img").attr("src", "../images/yuannei2.png");
                    } else if (msg[i].name === "产科") {
                        $(c).find("img").attr("src", "../images/yuannei3.png");
                    } else if (msg[i].name === "妇科") {
                        $(c).find("img").attr("src", "../images/yuannei4.png");
                    } else if (msg[i].name === "神经内科") {
                        $(c).find("img").attr("src", "../images/yuannei5.png");
                    } else if (msg[i].name === "神经外科") {
                        $(c).find("img").attr("src", "../images/yuannei6.png");
                    } else if (msg[i].name === "心血管科") {
                        $(c).find("img").attr("src", "../images/yuannei7.png");
                    }
                    else if (msg[i].name === "肿瘤科") {
                        $(c).find("img").attr("src", "../images/yuannei8.png");
                    }
                    else if (msg[i].name === "康复科") {
                        $(c).find("img").attr("src", "../images/yuannei9.png");
                    }
                    else if (msg[i].name === "儿科") {
                        $(c).find("img").eq(i).attr("src", "../images/yuannei10.png");
                    }
                    else if (msg[i].name === "内科") {
                        $(c).find("img").attr("src", "../images/yuannei11.png");
                    } else if (msg[i].name === "外科") {
                        $(c).find("img").attr("src", "../images/yuannei12.png");
                    }
                }
            }
        });

    };
    ajax(1, positionId, ".all", "all");
    // 点击选择
    $(".choose .item").eq(1).on("click", function () {
        $(this).addClass("now1").siblings().removeClass("now2");
        $(this).find("div").addClass('triangle');
        $(this).siblings().find("div").removeClass("triangle");
        $(".single").eq(1).show().siblings().hide();
        ajax(2, positionId, ".alone", "alone");
    });
    $(".choose .item").eq(0).on("click", function () {
        $(this).addClass("now2").siblings().removeClass("now1");
        $(this).find("div").addClass('triangle');
        $(this).siblings().find("div").removeClass("triangle");
        $(".single").eq(0).show().siblings().hide();
        ajax(1, positionId, ".all", "all");
    });

});