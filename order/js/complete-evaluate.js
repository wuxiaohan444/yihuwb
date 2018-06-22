$(function () {
    $(".gift").on("click",function () {
        $(".red-modal").show();
        $("body").addClass("hidden");
        $("html").addClass("hidden");
    });
    $(".close").on("click",function () {
        $(".red-modal").hide();
        $("body").removeClass("hidden");
        $("html").removeClass("hidden");
    })

});