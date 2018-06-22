$(function () {
    $.ajax({
        url: ip + "/patient/insure/getInsureProductList?loginUserCode="+getLoginUserCode(),
        type: "GET",
        data: {
            positionId: 1
        },
        success: function (data) {
            console.log(data);
            $(".content").html(template("tpl",data))
        }
    });
});