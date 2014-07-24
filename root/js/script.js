$(function () {
    // ----- services list animation -----------
    var services = $('.services-list');

    $(services).on('mouseover', 'li', function () {
        $(services).find('li i').removeClass('bounceIn animated');
        $(this).find('i').addClass('bounceIn animated');
    })
});

$(function () {
    var mapSpringfield = new GMaps({
            el: '#mapSpringfield',
            lat: -12.043333,
            lng: -77.028333
        }),
        mapCharleston = new GMaps({
            el: '#mapCharleston',
            lat: -12.043333,
            lng: -77.028333
        }),
        mapAtlanta = new GMaps({
            el: '#mapAtlanta',
            lat: -12.043333,
            lng: -77.028333
        });
});