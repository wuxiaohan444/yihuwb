$(function () {
    let nStart; //星星个数
    let getStart = function (a) {
        for (let i = 0; i < $('.starts .icon-xingxing').length; i++) {
            $(a).eq(i).on('click', function () {
                $(this).css("color", "#E8E8E8").siblings().css("color", "#E8E8E8");
                $(this).css("color", "#F5DE46").prevAll().css("color", "#F5DE46");
                nStart = (i + 1) % 5;
                if (nStart === 0) {
                    nStart = 5;
                }
                console.log(nStart);
            })
        }
    };
    // 护工评价星星
    getStart(".starts .icon-xingxing");
    // 服务内容星星
    getStart(".item-bottom .icon-xingxing");


});

$(function () {
    // 点击选中
    for (let i = 0; i < $(".single-main .radio").length; i++) {
        $(".single-main .radio").eq(i).on("click", function () {
            $(this).toggleClass("selected")
        })
    }

});

// 点击复制

$(function () {
    let clipboard = new ClipboardJS('.copy', {
        target: function () {
            return document.querySelector('.info-number .content');
        }
    });
    clipboard.on('success', function (e) {
        console.log(e);
    });

    clipboard.on('error', function (e) {
        console.log(e);
    });
});