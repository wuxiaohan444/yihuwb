$(function () {
    // 上传照片
    $(".btn").click(function () {
        $(".clipbg").fadeIn()
    });
    let clipArea = new PhotoClip("#clipArea", {
        size: [300, 300],//裁剪框大小
        outputSize: [0, 0],//打开图片大小，[0,0]表示原图大小
        file: "#file",
        ok: "#clipBtn",
        loadStart: function () { //图片开始加载的回调函数。this 指向当前 PhotoClip 的实例对象，并将正在加载的 file 对象作为参数传入。（如果是使用非 file 的方式加载图片，则该参数为图片的 url）
            $(".loading").removeClass("displaynone");

        },
        loadComplete: function () {//图片加载完成的回调函数。this 指向当前 PhotoClip 的实例对象，并将图片的 <img> 对象作为参数传入。
            $(".loading").addClass("displaynone");

        },
        done: function (dataURL) { //裁剪完成的回调函数。this 指向当前 PhotoClip 的实例对象，会将裁剪出的图像数据DataURL作为参数传入。

            console.log(dataURL);//dataURL裁剪后图片地址base64格式提交给后台处理
            $("#photo").attr("src", dataURL);
            $("#photo").addClass("upload");
            $(".add .symbol").hide();

            $(".clipbg").fadeOut()
        }
    });
    $(".back").click(function () {
        $(".clipbg").fadeOut()
    });

    // 验证身份证
    $(".id-card").on("blur", function () {
        mate(/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/, $(this).val(), "身份证", $(".id-verify"))
    });
    // 验证电话
    $(".phone").on("blur", function () {
        mate((/^[1][3,4,5,7,8][0-9]{9}$/), $(this).val(), "电话", $(".photo-verify"))
    });

    // 手机验证码
    $(".verify .button").on("click", function () {
        let time = 60;
        let timer = setInterval(_ => {
            $(this).text(time + "秒再获取");
            time--;
            if (time === 0) {
                $(this).text("重新获取");
                clearInterval(timer)
            }
        }, 1000)
    });


    // 选择男女
    $(".basic-info .sex").on("click", function () {
        $(".sex .option").show();
        $(".sex .option li").on("click", function (event) {
            $(".basic-info .sex .please").text($(this).text());
            event.stopPropagation();
            $(".sex .option").hide();
        })
    });


    // 选择受益人关系
    $(".basic-info .relation").on("click", function () {
        $(".relation .option").show();
        $(".relation .option li").on("click", function (event) {
            console.log(1);
            $(".basic-info .relation .please").text($(this).text());
            event.stopPropagation();
            $(".relation .option").hide();
        })
    });

    // 点击时下拉框消失
    $(".basic-info input").on('click', function () {
        $(".option").hide();
        console.log(1);
    });
    $(".basic-info textarea").on('click', function () {
        $(".option").hide();
        console.log(1);
    });


// 点击确认添加受益人
    $(".info-amend").on("click", function () {
        $(".modal").show();
        // 验证姓名和手机号是否填写
        if (($(".phone").val()).trim() === '' && ($(".name").val()).trim() === '') {
            $(".error").show();
            $(".error .hint-main span").text('姓名、电话');
        }
        else if (($(".phone").val()).trim() === '') {
            $(".error").show();
            $(".error .hint-main span").text('电话');
        }
        else if (($(".name").val()).trim() === '') {
            $(".error").show();
            $(".error .hint-main span").text('姓名');
        }
        else if ($(".id-verify").text() === '身份证错误' && ($(".photo-verify").text() !== "电话正确")) {
            $(".info").show();
            $(".info .hint-main span").text('身份证，电话');
        }
        else if ($(".id-verify").text() !== '身份证正确') {
            $(".info").show();
            $(".info .hint-main span").text('身份证');
        }
        else if ($(".photo-verify").text() !== "电话正确") {
            $(".info").show();
            $(".info .hint-main span").text('电话');
        }
        else {
            $(".add").show();
            $(".error").hide();
            $(".info").hide();
            // 拿到所有的信息
            let name = $(".name").val(); //姓名
            let sex = $(".sex span").text() === "男" ? 1 : 2;  //性别
            let idCard = $(".id-card").val(); //身份证
            let phone = $(".phone").val(); //电话
            let verify = $(".verify input").val(); //验证码
            let relation = $(".relation .please").text(); //受益人关系
            let address = $(".address").val();//服务地址

            console.log(name, sex, idCard, phone,relation, address);
            // 添加接口
            $.ajax({
                url: ip + "/patient/customerRelationship/add?loginUserCode="+getLoginUserCode(),
                type: "POST",
                data: JSON.stringify({
                    name: name,
                    sex: sex,
                    idCardNo: idCard,
                    phone: phone,
                    address: address,
                    relationship:relation
                }),
                dataType: "json",
                contentType:"application/json;charset=utf-8",
                xhrFields:{
                    withCredentials:true
                },
                beforeSend: function(xhr) {
                    xhr.withCredentials = true;
                },
                success: function (data) {
                    console.log(data);
                    window.location.href="receiptor-list.html"
                },
            });
        }

    });





    // 关闭模态框
    $(".close").on("click", function () {
        $(".modal").hide();
    });
    $(".modal button").on("click", function () {
        $(".modal").hide();
    });

});


