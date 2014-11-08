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
    if($('.contacts').length) {
        var mapSpringfield = new GMaps({
            el: '#mapSpringfield',
            lat: 38.743830,
            lng: -77.202341,
            zoom: 17,
            disableDefaultUI: true
        });
        mapSpringfield.addMarker({
            lat: 38.743830,
            lng: -77.202341,
            infoWindow: {
                content: '7520 Fullerton Rd <br>Springfield,VA 22153, <br><strong>+1 703-569-4520</strong>'
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
//            gallery.masonry({
//                    itemSelector: 'li'
//                });

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
                    $(item).css('z-index', '1').removeClass('moveLeft moveRight animated');
                }
            });

            $(links).find('li i').css('visibility', 'hidden').removeClass('bounceIn animated');
            $(this).find('i').css('visibility', 'visible').addClass('bounceIn animated');

            return false;
        });
    }
});


$(function () {
    Placeholdem($('[placeholder]'));
});


// news & events
$(function () {
    var newsFuture = $("#outputFuture");
    var newsPast = $("#outputPast");
    var footerNews = $("#footeroutput");
    var counter = 0;
    var pastEvents = [];
    var futureEvents = [];

    $.get('rss.xml', function (response) {

        $(response).find('item').each(function () {
            sortEvents.call(this);
        });

        var sortedPast = _.sortBy(pastEvents, function (item) {
            return Date.parse((item.find('date').text()).replace(/(\d{1,2})[^\d]{2}/, '$1'));
        });
        var sortedFuture = _.sortBy(futureEvents, function (item) {
            return Date.parse((item.find('date').text()).replace(/(\d{1,2})[^\d]{2}/, '$1'));
        });

        sortedPast.reverse();

        $(sortedFuture).each(function () {
            buildOneEvent.call(this, counter, newsFuture);
            counter++;
        });

        $(sortedPast).each(function () {
            buildOneEvent.call(this, counter, newsPast);
            counter++;
        });

        function sortEvents () {
            var $item = $(this);
            var now = Date.now();
            // add one more day (to show today's events in future block). remove '+ 86400000' if it should be in past
            var eventDate = Date.parse(($item.find('date').text()).replace(/(\d{1,2})[^\d]{2}/, '$1')) + 86400000;
            eventDate < now ? pastEvents.push($item) : futureEvents.push($item);
        }

        function buildOneEvent(counter, newsBlock){
            var $item = $(this);
            var date = $item.find('date').text();
            var title = $item.find('title').text();
            var description = $item.find('description').text();
            var address = $item.find('address').text();
            var imageurl = $item.find('mainpicture').text().trim();
            var link = $item.find('link').text();
            var html = "";
            var footerhtml = "";

            if (imageurl === "") {
                html = '<h2 class="event-title">' + title + '</h2>';
                html += '<p class="italic">' + date + '</p>';
                html += '<div id="map'+ counter +'" style="height: 350px" class="map"></div>';
                html +=  description;
                html += '<p class="address-box">' + address + '</p>';
                html += '<div class="medium primary btn"><a href="' + link + '">Register</a></div>';

                if (counter < 1) {
                    footerhtml = '<span id="footer-recent">';
                    footerhtml += '<a href="events.html"><span class="title one-row">' + title + '</span></a>';
                    var shortDescription = description.replace(/(<p>)/g, '').replace(/(<\/p>)/g, '<br/>').substr(0, 280);
                    var cleanDescription = shortDescription.replace(/((<br\/$)|(<br$)|(<b$)|(<$))|( {1}.[^ ]*$)/, '');
                    footerhtml += '<div class="footer-buffer">' + cleanDescription + ' ...</div>';
                    footerhtml += '<a href="events.html" class="footer-more">More</a></p>';
                    footerhtml += '<a href="events.html" class="footer-link-events"><i class=\"icon-doc-text\"></i>News &amp; Events</a></span>';
                }

                if (newsBlock.length) {
                    $.get('http://maps.google.com/maps/api/geocode/json?address=' + address + 'sensor=false', function (response) {
                        var location = response.results[0].geometry.location;
                        var map1 = new GMaps({
                            el: '#map' + counter + '',
                            scrollwheel: false,
                            lat: location.lat,
                            lng: location.lng
                        }).addMarker({
                                lat: location.lat,
                                lng: location.lng,
                                infoWindow: {
                                    content: address
                                }
                            });
                    });
                }
            }
            else {
                html = '<h2 class="event-title">' + title + '</h2>';
                html += '<p class="italic">' + date + '</p>';
                html += '<img alt="" src="img/events/' + imageurl + '" />';
                html +=  description;
                html += '<p class="address-box">' + address + '</p>';
                html += '<div class="medium primary btn"><a href="' + link + '">Register</a></div>';
                if (counter < 1) {
                    footerhtml = '<span id="footer-recent">';
                    footerhtml += '<a href="events.html"><span class="title one-row">' + title + '</span></a>';
                    footerhtml += '<div class="footer-buffer">' + cleanDescription + ' ...</div>';
                    footerhtml += '<a href="events.html" class="footer-more">More</a></p>';
                    footerhtml += '<a href="events.html" class="footer-link-events"><i class=\"icon-doc-text\"></i>News &amp; Events</a></span>';
                }
            }

            $(newsBlock).append($(html));
            $(footerNews).append($(footerhtml));
        }

    });
});

$(function () {
    var name = $('[name="name"]');
    var email = $('[name="email"]');
    var phone = $('[name="phone"]');
    var company = $('[name="company"]');
    var contactsForm = $('#contacts-form');
    var applicationForm = $('#application-form');
    var download = $('.download_box');
    var rules = {
        name: /^[a-z ,.'-]+$/i,
        email: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        phone: /^[\s()+-]*([0-9][\s()+-]*){6,20}$/,
        any: /^(.)+$/
    };

    name.on('blur done', function () {
        validate(rules.name, name.val(), 'Name') ? name.removeClass('error') : name.addClass('error');
    });

    email.on('blur done', function () {
        validate(rules.email, email.val(), 'E-mail') ? email.removeClass('error') : email.addClass('error');
    });
    phone.on('blur done', function () {
        validate(rules.phone, phone.val(), 'Phone') ? phone.removeClass('error') : phone.addClass('error');
    });
    company.on('blur done', function () {
        validate(rules.any, company.val(), 'Company') ? company.removeClass('error') : company.addClass('error') ;
    });


    contactsForm.on('submit', function (e) {
        e.preventDefault();

        if (
            validate(rules.name, name.val(), 'Name') &&
            validate(rules.email, email.val(), 'E-mail') &&
            validate(rules.phone, phone.val(), 'Phone') &&
            validate(rules.any, company.val(), 'Company')
            ) {
            contactsForm.css('display', 'none');
            download.css('display', 'block');
        } else {
            validate(rules.name, name.val(), 'Name') ? name.removeClass('error') : name.addClass('error');
            validate(rules.email, email.val(), 'E-mail') ? email.removeClass('error') : email.addClass('error');
            validate(rules.phone, phone.val(), 'Phone') ? phone.removeClass('error') : phone.addClass('error');
            validate(rules.any, company.val(), 'Company') ? company.removeClass('error') : company.addClass('error');
        }
    });

    applicationForm.on('submit', function (e) {
        e.preventDefault();

        if (validate(rules.name, name.val(), 'Name') && validate(rules.email, email.val())) {
            window.location.assign('Employment-Application-Web.pdf');
        } else {
            validate(rules.name, name.val(), 'Name') ? name.removeClass('error') : name.addClass('error');
            validate(rules.email, email.val(), 'E-mail') ? email.removeClass('error') : email.addClass('error');
        }
    });

    function validate (reg, str, holder) {
        return reg.test(str) && !!(str.length) && str != holder;
    }

});





















