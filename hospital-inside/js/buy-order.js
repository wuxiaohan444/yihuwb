$(function () {
    // 选择日期
    getDate(0);
    getDate(1);

    function getDate(number) {
        $("#info .date img").eq(number).on("click", function (event) {
            $("body").addClass("hidden");
            $("html").addClass("hidden");
            let count = true; //节流阀
            $(".modal").show();
            for (let i = 0; i < $(".calendar-date .item").length; i++) {
                $(".calendar-date .item").eq(i).on('click mouseenter', function () {
                    if (!$(this).hasClass("now")) {
                        if (count) {
                            $(this).removeClass(".item-selected");
                            let year = $(this).attr('data').substring(0, 4);
                            let month = $(this).attr('data').substring(4, 6);
                            let day = $(this).attr('data').substring(6, 8);
                            $(this).prevAll().addClass("now");
                            $("#info .date span").eq(number).text(year + "-" + month + '-' + day);
                            $("body").removeClass("hidden");
                            $("html").removeClass("hidden");
                            $(".modal").hide();
                            count = false;
                        }
                    }
                });
            }
        });
    }
});

$(function () {
    $('.choose-style button').click(function () {
        if ($(this).hasClass('active')) {
        } else {
            $(this).addClass('active');
            $(this).siblings().removeClass('active');
        }
    });
    // 选择男女
    for (let i = 0; i < $(".list .radio").length; i++) {
        $('.list .radio').eq(i).click(function () {
            $(this).addClass("now").parent().siblings().find(".radio").removeClass("now");
        });
    }




    //确认协议
    let count = 0;
    $(".payment .left .radio").on("click", function () {
        if (count === 0) {
            $(this).addClass("now");
            count = 1;
        } else {
            $(this).removeClass("now");
            count = 0
        }

    })

});

$(function () {
    let count = $(".num .count"); //数字
    let minus = $(".num .minus");
    for (let i = 0; i < $(".item").length; i++) {
        if (count.eq(i).text() === '0') {
            minus.eq(i).addClass("now");
        }

        // 加法
        $(".num .plus").eq(i).on("click", function () {
            count.eq(i).val(+count.eq(i).val() + 1);
            $(".num .minus").eq(i).removeClass("now");
            // if ($(".radio").eq(i).hasClass("selected")) {
            //     sum = sum + +price.eq(i).text();
            //     $(".new-price").text(sum);
            // }
        });
        // 减法
        minus.eq(i).on("click", function () {
            if (count.eq(i).val() <= '1') {
                count.eq(i).val(1);
                minus.eq(i).addClass("now");
            }
            count.eq(i).val(+count.eq(i).val() - 1);
            // if ($(".radio").eq(i).hasClass("selected")) {
            //     sum = sum - +price.eq(i).text();
            //     if (sum <= 0) {
            //         sum = 0;
            //     }
            //     console.log(sum);
            //     $(".new-price").text(sum);
            // }
        });
    }
})
