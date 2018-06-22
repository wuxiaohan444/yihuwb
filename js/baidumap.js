$(function (ev) {
    let GPS = localStorage.getItem("GPS");
    console.log(GPS);
    if (GPS === null) {
    $(ev.currentTarget).text("正在获取位置......");
    //创建百度地图控件
    let geolocation = new BMap.Geolocation();
    geolocation.getCurrentPosition(function (r) {
        if (this.getStatus() === BMAP_STATUS_SUCCESS) {
            //以指定的经度与纬度创建一个坐标点
            let pt = new BMap.Point(r.point.lng, r.point.lat);
            //创建一个地理位置解析器
            let geoc = new BMap.Geocoder();
            geoc.getLocation(pt, function (rs) {//解析格式：城市，区县，街道
                let addComp = rs.addressComponents;
                // console.log(addComp.city + ", " + addComp.district + ", " + addComp.street);
                // 如果的手动的，则不用渲染
                if (localStorage.getItem("city") === null) {
                    $(".place .location").text(addComp.city.substring(0, 2));

                    localStorage.setItem("GPS", (addComp.city + "- " + addComp.district));
                }
                else {
                    $(".place .location").text(localStorage.getItem("city"));
                }


                $(".place").on('click', function () {
                    window.location.href = 'chooseCity.html?' + addComp.city + "& " + addComp.district
                })

            });
        }
        else {
            $(ev.currentTarget).text('定位失败');
        }
    }, {enableHighAccuracy: true})//指示浏览器获取高精度的位置，默认false

    }

    $(".place").on('click', function () {
        window.location.href = 'chooseCity.html'
    });
    if (localStorage.getItem("city") === null) {
        $(".place .location").text(localStorage.getItem("GPS").substring(0,2));
    }else{
        $(".place .location").text(localStorage.getItem("city"));
    }
});