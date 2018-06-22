$(function () {
    // 关闭模态框
    $('.close').click(function () {
        $('.red-modal').hide();
        $("body").removeClass("hidden");
        $("html").removeClass("hidden");
    });

    // 点击领取
    let state = 1;
    $(".get a").on("click", function () {
        $(".red-modal").show();
        $("body").addClass("hidden");
        $("html").addClass("hidden");
        if (state === 0) {
            $(".red-box1").show();
            $(".use1").show();
            $(".red-box2").hide();
            $(".use2").hide();
        } else {
            $(".red-box2").show();
            $(".use2").show();
            $(".red-box1").hide();
            $(".use1").hide();
        }

        $(".use1").on("click", function () {
            location.href = "discount-coupon.html"
        })
    });

    // 点击获取验证码
    $(".login button").on("click", function () {
        let time = 60;
        let timer = setInterval(function_ => {
            $(this).text("(" + time + ")秒后获取");
            time--;
            if (time === 0) {
                clearInterval(timer);
                time = 60;
                $(this).text("再获取一次");
            }
        }, 1000);

    })
});