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
                            console.log(i);
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