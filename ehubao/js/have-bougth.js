$(document).ready(function (e) {
    // 轮播图
    // 轮播图
    let mySwiper = new Swiper('.swiper-container', {
        loop: true,
        autoplay: 5000,
        autoplayDisableOnInteraction: false, /* 注意此参数，默认为true */
        pagination: '.swiper-pagination',
        paginationClickable: true,
    });
});

$(function () {

// 查看保障进度
    let before = $("li .before");
    let after = $("li .after");
    let planInfo = $(".plan-info")
    $.ajax({
        url: ip + "/patient/insure/getInsureRecent?loginUserCode="+getLoginUserCode(),
        type: "GET",
        contentType: "application/json;charset=utf-8",
        xhrFields: {
            withCredentials: true
        },
        beforeSend: function (xhr) {
            xhr.withCredentials = true;
        },
        data:JSON.stringify({
            customerId: 1
        }),
        success: function (data) {
            console.log(data);
            let top1 = 0;
            let top2 = 0;
            let top3 = 0;
            let count1 = data.data[0];
            let count2 = data.data[1];
            let count3 = data.data[2];
            top1 = -count1 * 1.8;
            top2 = -count2 * 1.8;
            top3 = -count3 * 1.8;
            // 第一张图
            before.eq(0).css("top", top1);
            after.eq(0).css("top", top1);
            planInfo.eq(0).text(count1);
            planInfo.eq(1).text(count1);
            planInfo.eq(4).text(count1);
            before.eq(1).css("top", top1);
            after.eq(1).css("top", top1);
            before.eq(4).css("top1", top1);
            after.eq(4).css("top1", top1);
            // 第二张图
            before.eq(2).css("top", top2);
            after.eq(2).css("top", top2);
            planInfo.eq(2).text(count2);
            // 第三张图
            before.eq(3).css("top", top3);
            after.eq(3).css("top", top3);
            planInfo.eq(3).text(count3);
        }
    });

    // 查看我的受益人关系
    $.ajax({
        url: ip + "/patient/insure/getRelationShipPerson?loginUserCode="+getLoginUserCode(),
        type: "GET",
        success: function (data) {
            // console.log(data);
            $(".number").html(template("tpl", data))
        }
    });

});
