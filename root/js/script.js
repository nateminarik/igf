$(function () {
    // ----- services list animation -----------
    var services = $('.services-list');

    $(services).on('mouseover', 'li', function () {
        $(services).find('li i').removeClass('bounceIn animated');
        $(this).find('i').addClass('bounceIn animated');
    })
});