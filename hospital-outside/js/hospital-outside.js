$(function () {
    $.ajax({
        url: ip + "/patient/product/getProductByProjectList?loginUserCode="+getLoginUserCode(),
        type: "GET",
        data:JSON.stringify({
            projectType: 1,
            positionId: 1
        }),
        contentType:"application/json;charset=utf-8",
        xhrFields:{
            withCredentials:true
        },
        beforeSend: function(xhr) {
            xhr.withCredentials = true;
        },
        success: function (data) {
            console.log(data);
            $(".outside-class").html(template("class", data));
        }
    });


    // 接受地理信息
    let address = decodeURI(window.location.search).substring(1, 20).replace("&", '-').split("-");
    // console.log(address);
    if (address === '') {
        $(".outside-head p a").text('上海长征医院');
        $('.city-address').text('上海')
    }
    else {
        $(".outside-head p a").text(address[1].substring(5, 20));
        $('.city-address').text(address[0].substring(5, 20))
    }

});