$(function () {
    // ----- services list animation -----------
    var services = $('.services-list');

    $(services).on('mouseover', 'li', function () {
        $(services).find('li i').removeClass('bounceIn animated');
        $(this).find('i').addClass('bounceIn animated');
    })
});

$(function () {
    // ----- services page maps -----------
    if ($('.services').length) {

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
    }
});

$(function () {
    // ----- gallery page  -----------
    var gallery = $('#gallery');

    if (gallery.length) {
        gallery.photobox('li a',{
            time: 0
        });

        $(window).load(function() {
            gallery.masonry({
                    itemSelector: 'li'
                });

            $(window).on('resize', function () {
                buildScrollbar();
            });

            setTimeout(buildScrollbar, 100);
        });
        // ----- add scrollbar (to prevent sidebar's height be more than events height)  -----------
        function buildScrollbar () {
            var eventsHeight = $('#output').height();
            var galleryWrp = $('.gallery-wrp');

            if ($(window).outerWidth() >= 753) {
                $(galleryWrp)
                    .css('height', eventsHeight)
                    .perfectScrollbar();
            } else {
                $(galleryWrp).css('height', 'auto');
            }
        }
    }

});


$(function () {
    if ($('#products').length) {
        console.log('dcsdc');
        var links = $('.product-links');
        var images = $('.product-images img');

        $(links).on('mouseover', '.products-list li', function () {
            var current = $(this).data('index');
            images.each(function(i, item) {
                if ($(item).data('index') == current) {
                    if (current % 2 === 0) {
                        $(item).css('z-index', '2').addClass('moveRight animated');
                    } else {
                        $(item).css('z-index', '2').addClass('moveLeft animated');
                    }
                } else {
                    $(item).css('z-index', '1').removeClass('moveLeft moveRight animated')
                }
            });

            $(links).find('li i').css('visibility', 'hidden').removeClass('bounceIn animated');
            $(this).find('i').css('visibility', 'visible').addClass('bounceIn animated');

            return false;
        })
    }
});