$(document).ready(function () {
    $('.menu_toggle').click(function (e) {

        e.preventDefault;
        $(this).toggleClass('is-active');
        $('#menu').toggleClass('visible');

    });
    $("#menu").on("click", "a", function (event) {
        event.preventDefault();
        var id = $(this).attr('href');
        var top = $(id).offset().top;
        $('body,html').animate({
            scrollTop: top
        }, 1500);
    });
});
