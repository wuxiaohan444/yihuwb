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
            console.log(data);
            $(".info-head img").attr("src",data.data.headImg);
            $(".number").text(data.data.customerNo); //用户编号
            $(".basic-info .name").val(data.data.name);  //姓名;
            // 性别
            if (data.data.sex === 1) {
                $(".sex .please").text("男")
            } else if (data.data.sex === 2) {
                $(".sex .please").text("女")
            }
            $(".basic-info .id-card").val(data.data.cardNo);//身份证
            $(".basic-info .phone").val(data.data.phone);    // 手机号码
            $(".basic-info .address").val(data.data.address);

            // 选择男女
            $(".basic-info .sex").on("click", function () {
                $(".sex .option").show();
                console.log(1);
                $(".option li").on("click", function (event) {
                    console.log(1);
                    $(".basic-info .sex .please").text($(this).text());
                    event.stopPropagation();
                    $(".sex .option").hide();
                })
            });
// 点击确认修改受益人
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
                else {
                    $(".add").show();
                    $(".error").hide();
                }

                // 拿到所有的信息
                let name = $(".name").val(); //姓名
                let sex = $(".sex span").text() === "男" ? 1 : $(".sex span").text() === "女" ? 2 : 0;  //性别
                let idCard = $(".id-card").val(); //身份证
                let phone = $(".phone").val(); //电话
                let address = $(".address").val();//服务地址

                console.log(name, sex, idCard, phone, address);
                // 修改个人信息
                $.ajax({
                    type: "POST",
                    url: ip + "/patient/customer/update?loginUserCode="+getLoginUserCode(),
                    data: JSON.stringify({
                        name: name,
                        sex: sex,
                        cardNo: idCard,
                        phone: phone,
                        address: address
                    }),
                    dataType: "json",
                    contentType: "application/json;charset=utf-8",
                    xhrFields: {
                        withCredentials: true
                    },
                    beforeSend: function (xhr) {
                        xhr.withCredentials = true;
                    },
                    success: function (data) {
                        console.log(data);
                        if(data.msg==="操作成功"){
                            alert("修改成功")
                        }else{
                            alert("操作失败");
                        }
                    }
                })

            });


            // 验证身份证
            $(".id-card").on("blur", function () {
                mate(/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/, $(this).val(), "身份证", $(".id-verify"))
            });
            // 验证电话
            $(".phone").on("blur", function () {
                mate(/^[1][3,4,5,7,8][0-9]{9}$/, $(this).val(), "手机号", $(".photo-verify"))
            });


            // 关闭模态框
            $(".close").on("click", function () {
                $(".modal").hide();
            });
            $(".modal button").on("click", function () {
                $(".modal").hide();
            });


        }
    });


});
