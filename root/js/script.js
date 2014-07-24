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
            lat: 38.743830,
            lng: -77.202341,
            zoom: 17,
            disableDefaultUI: true
        }),
        mapCharleston = new GMaps({
            el: '#mapCharleston',
            lat: 32.796129,
            lng: -79.996165
        }),
        mapAtlanta = new GMaps({
            el: '#mapAtlanta',
            zoom: 13,
            lat: 33.734312,
            lng: -84.566143
        });

    mapSpringfield.addMarker({
        lat: 38.743830,
        lng: -77.202341,
        infoWindow: {
            content: '7520 Fullerton Rd <br>Springfield,VA 22153, <br><strong>+1 703-569-4520</strong>'
        }
    });
    mapCharleston.addMarker({
        lat: 32.796129,
        lng: -79.996165,
        infoWindow: {
            content: '1105 Magnolia Rd <br>Charleston, SC 29407, <br><strong>+1 843-573-2220</strong>'
        }
    });
    mapAtlanta.addMarker({
        lat: 33.734291,
        lng: -84.566141,
        infoWindow: {
            content: '5550 Fulton Industrial Blvd SW,<br>Atlanta, GA 30336, <br><strong>+1 404-349-6333</strong>'
        }
    });
});