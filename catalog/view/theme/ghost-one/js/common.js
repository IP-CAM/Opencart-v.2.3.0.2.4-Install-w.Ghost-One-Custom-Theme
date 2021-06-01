function metric_set_basket_products() {
    let basket_products = [];
    let basket_products_total = 0;
    $('#basketmodal').find('.row.cart-item').each(function() {
        let product_id = $(this).data('product_id');
        let product_price = parseInt($(this).data('price'));
        let product_quantity = parseInt($(this).find('.product-quantity').text());
        let product_href = $(this).find('.product-preview').prop('href');
        let product_name = $(this).find('.product-name').html();
        let product_img = $(this).find('.product-preview img').prop('src');
        if (0 < product_quantity && typeof product_quantity !== 'undefined' && 0 < product_price && typeof product_id !== 'undefined') {
            basket_products.push({
                product_id: product_id,
                price: product_price.toFixed(2),
                quantity: product_quantity,
                href: product_href,
                name: product_name,
                img: product_img,
            });
            basket_products_total += +product_quantity * product_price.toFixed(2);
        }
    });
    metric.var('basket_products', basket_products);
    metric.var('basket_products_total', basket_products_total.toFixed(2));
}

function isMobileDevice() {
    var mobile = false;
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        mobile = true;
    }
    return mobile;
}

function isiOS() {
    var iOS = false;
    if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
        iOS = true;
    }
    return iOS;
}

function showAuth(need_header) {
    if (typeof(need_header) == "undefined") {
        need_header = 0;
    }
    flag_checkout = false;
    if (location.hash == '#checkout=open') {
        flag_checkout = true;
        need_header = 1;
    }
    $('.modal').modal('hide');
    setTimeout(function() {
        $('#login-data').html($('#login-data-default').html());
        $('#login_modal').modal('show');
        if (flag_checkout) {
            location.hash = '#checkout=open';
        }
        $.ajax({
            type: 'POST',
            url: 'index.php?route=account/login/auth_form',
            async: false,
            dataType: 'html',
            data: 'needed_header=' + need_header,
            success: function(data) {
                $('#login_modal .close').on('click', function() {
                    location.hash = '';
                });
                $('#login-data').html(data);
                setTimeout(function() {
                    $("#login_phone_number").focus();
                }, 500);
            }
        });
    }, 500);
}

function getURLVar(key) {
    var value = [];
    var query = String(document.location).split('?');
    if (query[1]) {
        var part = query[1].split('&');
        for (i = 0; i < part.length; i++) {
            var data = part[i].split('=');
            if (data[0] && data[1]) {
                value[data[0]] = data[1];
            }
        }
        if (value[key]) {
            return value[key];
        } else {
            return '';
        }
    } else {
        var query = String(document.location.pathname).split('/');
        if (query[query.length - 1] == 'cart') value['route'] = 'checkout/cart';
        if (value[key]) {
            return value[key];
        } else {
            return '';
        }
    }
}

function cancelDeliveryDay() {
    if ($('.delivery-dropdown').hasClass('opened')) {
        $('.delivery-dropdown').trigger('click');
    }
    setDeliveryDayValue($('.category_dates_sorting .dropdown a').data("value"));
}

function setDeliveryDayValue(dayValue) {
    if (dayValue != null) {
        $.cookie('_ed_delivery_interval', dayValue, {
            path: '/'
        });
    } else {
        $.removeCookie('_ed_delivery_interval');
    }
}

function getDeliveryInfo() {
    $('#delivery_result').html('');
    $('#delivery_result').removeClass('active');
    var getcoor = $('#delivery_address').val();
    if (!getcoor) {
        return;
    }
    if (getcoor) {
        $('#delivery_result').addClass('active');
        $('#delivery_result').html('<center><i class="fas fa-sync-alt fa-spin fa-5x fa-fw text-primary"></i></center>');
        $.ajax({
            type: 'POST',
            url: '/index.php?route=api/googlemap/getDistance',
            data: {
                address: getcoor,
                info2: 1
            },
            cache: false,
            dataType: 'json',
            success: function(json) {
                if (json.info) {
                    $('#delivery_result').html(json.info);
                }
            }
        });
    }
}

function clearDeliveryInfo() {
    $('#delivery_result').html('').removeClass('active');
    $('.delivery_del_btn').hide();
    $('#delivery_address').val('');
}

function calcMapShow() {
    ymaps.ready(init);
    var myMap;

    function init() {
        if (typeof(myMap) !== 'undefined') {
            myMap.destroy();
        }
        $('#delivery_map').empty();
        var myMap = new ymaps.Map('delivery_map', {
            center: [55.73, 37.75],
            zoom: 9,
            behaviors: ['default', 'multiTouch', 'dblClickZoom']
        });
        myMap.behaviors.disable('scrollZoom');
        var getcoor = $('#map_container #seacrh_block input').val();
        if (!getcoor) {
            getcoor = window.map_default_address;
        }
        if (getcoor) {
            $.ajax({
                type: 'POST',
                url: '/index.php?route=api/googlemap/getDistance',
                data: {
                    address: getcoor,
                    poligon: 1,
                    info: 1
                },
                cache: false,
                dataType: 'json',
                success: function(json) {
                    distance = json.distance;
                    point = json.point;
                    poligon = [];
                    if (json.poligon) {
                        poligon.push(json.poligon);
                    }
                    if (distance == -1) {
                        alert('Не удалось определить адрес, проверьте еще раз');
                    } else {
                        if (poligon) {
                            if (poligon[0].length > 1) {
                                var mkad_polygon = new ymaps.Polygon(poligon, {}, {
                                    style: 'polygon#Example',
                                    geodesic: true,
                                    strokeColor: '#ff7a2c',
                                    opacity: 1,
                                    fill: false,
                                    strokeWidth: 4
                                });
                                ymaps.geoQuery(mkad_polygon).addToMap(myMap);
                            } else {
                                myMap.geoObjects.add(new ymaps.Placemark([poligon[0][0][0], poligon[0][0][1]], {
                                    balloonContent: 'Наш офис',
                                    iconContent: 'Наш офис'
                                }, {
                                    preset: 'twirl#greenStretchyIcon'
                                }));
                            }
                        }
                        var point_placemark = new ymaps.Placemark([point.long, point.lat], {
                            balloonContent: '<b>Адрес: </b>' + getcoor + '<br>' + json.info,
                            iconContent: 'Расстояние ' + distance + ' км.'
                        }, {
                            preset: 'twirl#blueStretchyIcon'
                        });
                        myMap.geoObjects.add(point_placemark);
                        if (poligon && poligon[0].length > 1) {
                            myMap.setCenter([point.long, point.lat], 10);
                        } else {
                            myMap.setCenter([point.long, point.lat], 14);
                        }
                        var position = myMap.getGlobalPixelCenter();
                        myMap.setGlobalPixelCenter([position[0], position[1] - 100]);
                        point_placemark.balloon.open();
                    }
                }
            });
        }
    }
}

function delPrm(Url, Prm) {
    let a = Url.split('?');
    let re = new RegExp('(\\?|&)' + Prm + '=[^&]+', 'g');
    if (!a[1]) {
        return a[0];
    }
    Url = ('?' + a[1]).replace(re, '');
    Url = Url.replace(/^&|\?/, '');
    let dlm = (Url == '') ? '' : '?';
    return a[0] + dlm + Url;
}

function onDrag(event) {
    this.initialCurrent = event.relatedTarget.current();
    if ($(window).width() < 1024) {
        bodyNoScroll();
    }
}

function onDragged(event) {
    var owl = event.relatedTarget;
    var draggedCurrent = owl.current();
    if (draggedCurrent > this.initialCurrent) {
        owl.current(this.initialCurrent);
        owl.next();
    } else if (draggedCurrent < this.initialCurrent) {
        owl.current(this.initialCurrent);
        owl.prev();
    }
    if ($(window).width() < 1024) {
        bodyScroll();
    }
}
$(document).ready(function() {
    $('.home-info-banner').on('click', function() {
        let href = $(this).find('.btn').attr('href');
        if (!href) return false;
        location.href = href;
    });
    $('#main_seo_show_link').on('click', function(e) {
        $('#main_seo_show_link').hide();
        $('#seo_hidden_block').fadeIn(1000);
    });
    $('body').on('click', 'a', function(e) {
        if ($(this).hasClass('dropdown-toggle')) return;
        var href = $(this).attr('href');
        if (href && (href.indexOf("#") == -1) && (href.indexOf("page") == -1)) {
            if (href.substr(0, 1) == '/' || href.indexOf('http') != -1) {
                if (typeof isInStandaloneMode == 'function') {
                    if (isInStandaloneMode()) {
                        setTimeout(function() {
                            $('#pwa_loader').addClass('activeloader');
                        }, 1700);
                    }
                }
            }
        }
    });
    $.ajaxSetup({
        beforeSend: function(jqXHR, settings) {
            if (typeof settings.url != "undefined") {
                if (settings.url.indexOf('?') != -1) {
                    settings.url += '&ajax=yes';
                } else {
                    settings.url += '?ajax=yes';
                }
            }
        }
    });
    if (typeof isInStandaloneMode === 'function') {
        if (isInStandaloneMode()) {
            var name = "pwa_mod";
            var value = "on";
            document.cookie = encodeURIComponent(name) + '=' + encodeURIComponent(value) + "; path=/; max-age=3600";
            $(window).on('beforeunload', function() {
                setTimeout(function() {
                    $('#pwa_loader').addClass('activeloader');
                }, 1700);
            });
            $(window).on('unload', function() {
                setTimeout(function() {
                    $('#pwa_loader').addClass('activeloader');
                }, 1700);
            });
            $(window.location).trigger("change", function() {
                setTimeout(function() {
                    $('#pwa_loader').addClass('activeloader');
                }, 1700);
            });
        } else {
            var name = "pwa_mod";
            var value = "off";
            document.cookie = encodeURIComponent(name) + '=' + encodeURIComponent(value) + "; path=/; max-age=3600";
        }
    }
    if (typeof handleTokenByWebView === 'function' && typeof checkWebView === 'function') {
        if (checkWebView()) {
            try {
                handleTokenByWebView("refresh_token");
            } catch (e) {};
        }
    }
    $('input[type=radio][name="region_select"]').change(function() {
        $.ajax({
            url: '/index.php?route=common/header/change_region',
            dataType: 'html',
            type: 'post',
            async: false,
            data: 'region=' + $(this).val(),
            success: function(html) {
                setDeliveryDayValue(null);
                location.href = delPrm(location.href, 'date');
                document.location.reload();
            }
        });
    });
    $('.add-in-order__view').on('click', function() {
        $('#modal_order').modal('show');
    });
    $('.add-in-order__cancel').on('click', function() {
        $('#cancel-adding-order').modal('show');
    });
    $('#modal_order.modal-order-add').on({
        'shown.bs.modal': function(e) {
            show_adding_modal();
        },
        'hidden.bs.modal': function(e) {
            $('.add-in-order__view').show();
            $('.add-in-order__add').hide();
            $('#modal_order').find('.modal-body').html('');
        }
    });
    $('.lazyload').lazyload();
    $('.auth_form_show').on('click', function() {
        showAuth();
    });
    $('.delivery_search_btn').bind('click', function() {
        getDeliveryInfo();
    });
    $('.delivery_del_btn').bind('click', function() {
        clearDeliveryInfo();
    });
    $("#delivery_address").keyup(function(event) {
        if (event.keyCode === 13) {
            getDeliveryInfo();
            return;
        }
        if ($("#delivery_address").val().length > 0) {
            $('.delivery_del_btn').show();
        } else {
            $('.delivery_del_btn').hide();
        }
    });
    $('#button-toggle, #input-search').on('click', function() {
        if (!$(this).hasClass('search-box__input') || ($(this).hasClass('search-box__input') && !$(this).hasClass('open'))) {
            $('#input-search, #button-search, #button-close').toggleClass('open');
            $('#button-toggle, #menu').toggleClass('hidden');
            $('.cart-wrap').toggleClass('open-search');
        }
    });
    $('#button-close').on('click', function() {
        $('#input-search, #button-search, #button-close').toggleClass('open');
        $('#button-toggle, #menu').toggleClass('hidden');
        $('.cart-wrap').toggleClass('open-search');
    });
    $('#button-search').on('click', function() {
        let search = $('#input-search').val();
        let search_str = (search != '') ? '?search=' + search : '';
        location.href = '/search' + search_str;
    });
    $('#search, #button-close-mobile').on('click', function() {
        $('.search-mobile-box').toggleClass('open');
        $('#search').toggleClass('open');
        if (location.href.indexOf('/search') === -1) {
            if ($('body .modal-backdrop.fade.in').length > 0) {
                $('body .modal-backdrop').remove();
                $('#menu-fixed').css('z-index', 103);
            } else {
                $('body').append('<div class="modal-backdrop fade in"></div>');
                $('#menu-fixed').css('z-index', 1051);
            }
        }
        $('#input-search-mobile').focus();
    });
    $('#input-search-mobile').on('change', function() {
        let search = $('#input-search-mobile').val();
        let search_str = (search != '') ? '?search=' + search : '';
        location.href = '/search' + search_str;
        let base_url = document.getElementsByTagName("base")[0].href;
        handleChangeLocationWebViewForAndroid(base_url + 'search' + search_str);
    });
    $('.pushy-link-top__close').on('click', function() {
        $('.site-overlay').trigger('click');
    });
    $('.pushy-link .ship-city__link').on('click', function() {
        $(this).next().toggle('dropdown');
        return false;
    });
    $('#checkout').on('click', '.address_comment span', function() {
        $(this).parent().find('.address_comment_textarea').toggle();
        if ($(this).parent().find('.address_comment_textarea').is(":hidden")) {
            $(this).parent().find('i').removeClass('fa-caret-down fa-caret-up');
            $(this).parent().find('i').addClass('fa-caret-up');
        } else {
            $(this).parent().find('i').removeClass('fa-caret-down fa-caret-up');
            $(this).parent().find('i').addClass('fa-caret-down');
        }
    });
    $('#checkout').on('change', '.address_comment .address_comment_textarea', function() {
        var comment_address_id = $(this).parent().parent().find('input[name="address_id"]').val();
        $.ajax({
            url: '/index.php?route=checkout/checkout_ajax/changecomment',
            dataType: 'json',
            type: 'post',
            async: false,
            data: 'comment=' + $(this).val() + '&address_id=' + comment_address_id,
            success: function(json) {
                console.log(json.msg);
            }
        });
    });
    $('.dates_sorting__navbar .dropdown-caret-wrap').on('click', function() {
        cancelDeliveryDay();
    });
    $('#delivery-date-form .delivery-date-form__text').on('click', function() {
        cancelDeliveryDay();
    });
    let animation_flag = 0;
    $('.delivery-dropdown').on('click', function() {
        if (animation_flag == 1) {
            return false;
        }
        animation_flag = 1;
        if (!$(this).hasClass('opened')) {
            $('.delivery-date-form').show();
            $('.delivery-date-form').animate({
                opacity: 1,
                top: "52px"
            }, 500, function() {
                animation_flag = 0;
                $('.delivery-dropdown').addClass('opened');
            });
        } else {
            $('.delivery-date-form').animate({
                opacity: 0,
                top: "58px"
            }, 400, function() {
                animation_flag = 0;
                $('.delivery-dropdown').removeClass('opened');
                $('.delivery-date-form').hide();
            });
            setDeliveryDayValue($('.category_dates_sorting .dropdown a').data("value"));
        }
    });
    if ($('#delivery-date-form').length > 0 && $('#delivery-date-form').hasClass('open')) {
        $('.delivery-dropdown').trigger('click');
    }
    $(window).scroll(function() {
        if ($(document).scrollTop() > 100) {
            if ($('#delivery-date-form').length && !$('#delivery-date-form').is(":hidden")) {
                cancelDeliveryDay();
            }
            if ($('.dates_sorting__navbar').length && $('.dates_sorting__navbar').hasClass('open')) {
                $('.dates_sorting__navbar .dropdown-caret-wrap').trigger('click');
            }
        }
    });
    $('#tablet__btn').on('click', function() {
        $('.tablet__btn, .tablet__menu').toggleClass('open');
    });
    $('.category_dates_sorting .dropdown-menu a').on('click', function() {
        if ($(this).data("value")) {
            setDeliveryDayValue($(this).data("value"));
        }
    });
    changeFooter();
    $('.js-vieo-popup').on('click', function() {
        $('#video-main-modal').modal('show');
        if ($('#video-main-modal').find('iframe').length == 0) {
            $('#video-main-modal').find('.modal-body').html('<iframe width="100%" height="480" src="https://www.youtube.com/embed/ZYo7TIQpKmI?rel=0&mute=0&wmode=Opaque&enablejsapi=1" frameborder="0"' +
                ' allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>');
        }
    });
    $('#video-main-modal').on('hide.bs.modal', function() {
        stop_main_video();
    });
    if ($('.js-home-answer').length == 1) {
        let transientAnswer = {};
        $('.js-home-answer').owlCarousel({
            slideBy: 'page',
            fluidSpeed: 300,
            onDrag: onDrag.bind(transientAnswer),
            onDragged: onDragged.bind(transientAnswer),
            margin: 20,
            nav: true,
            items: 4,
            dots: false,
            responsive: {
                991: {
                    items: 4,
                    margin: 20,
                },
                500: {
                    items: 3,
                    nav: false,
                    margin: 16
                },
                0: {
                    items: 2,
                    nav: false,
                    margin: 8
                }
            }
        });
    }
    if ($(window).width() < 767) {
        $('.modal').each(function() {
            var target = $(this).find(".modal-dialog.cart");
            $(this).find($('.cart-sidebar__btn-checkout')).prependTo(target);
            $(this).find($('.cart-sidebar__btn-add-to-order')).prependTo(target);
        });
    }
    $(document).on('click', '.js-open-clear-popup', function() {
        $('.remove-popup').show(100, function() {
            $('.remove-popup').addClass('in');
        });
    });
    $(document).on('click', '.js-close-clear-popup', function() {
        $('.remove-popup').hide(100, function() {
            $('.remove-popup').removeClass('in');
        });
    });
    $(document).on('click', '.js-clear-cart', function() {
        $('.remove-popup').hide(100, function() {
            $('.remove-popup').removeClass('in');
        });
        cart.clear();
    });
    $('.js-open-popupAnswer').click(function() {
        bodyNoScroll();
        $('.popup-answer').addClass('popupCarousel__block');
        setTimeout(function() {
            $('.popup-answer').addClass('popupCarousel__show');
        }, 10);
    });
    $('.js-popup-answer-close').click(function() {
        $('.popup-answer').removeClass('popupCarousel__show');
        setTimeout(function() {
            $('.popup-answer').removeClass('popupCarousel__block');
        }, 10);
        bodyScroll();
    });
    if ($('.js-answer-popup-carousel').length == 1) {
        $('.js-answer-popup-carousel').owlCarousel({
            smartSpeed: 0,
            navSpeed: 500,
            dragEndSpeed: 500,
            margin: 20,
            nav: true,
            dots: false,
            items: 1,
            responsive: {
                0: {
                    nav: false,
                    margin: 8,
                },
                500: {
                    nav: true,
                    margin: 20,
                },
            }
        });
    }
});
$(window).on('resize', function() {
    changeFooter();
});

function bodyNoScroll() {
    $('body').addClass('no-scroll');
}

function bodyScroll() {
    $('body').removeClass('no-scroll');
}

function stop_main_video() {
    jQuery("iframe").each(function() {
        if (jQuery(this)[0] !== null) {
            jQuery(this)[0].contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
        }
    });
}

function show_adding_modal() {
    $.ajax({
        url: '/index.php?route=account/order/get_added_products',
        method: 'GET',
        cache: false,
        beforeSend: function() {
            $('#modal_order').find('.modal-body').html('<div class="order-load"><p class="text-center">' +
                '<img src="/catalog/view/theme/ghost-one/image/manufacturer/button_load.svg" alt="more"' +
                '     class="manufacturers-page__preloader fa-spin"/>' +
                '</p></div>');
        },
        success: function(data) {
            $('#modal_order').find('.modal-body').html(data);
            if (-1 === data.indexOf('empty_basket')) {
                $('.add-in-order__view').hide();
                $('.add-in-order__add').show();
            }
        }
    });
}

function changeFooter() {
    if ($(window).outerWidth() < 768) {
        $('.t-descr.t-descr_xxs, .regards__list').addClass('dropdown-menu');
        $('.footer .regards-wrap').insertBefore($('.footer .company-info'));
        $('.bottom-line__wrap .bottom-line__copyright').insertAfter($('.bottom-line__wrap .bottom-line__menu'));
    } else {
        $('.t-descr.t-descr_xxs, .regards__list').removeClass('dropdown-menu');
        $('.footer .company-info').insertBefore($('.footer .regards-wrap'));
        $('.bottom-line__wrap .bottom-line__menu').insertAfter($('.bottom-line__wrap .bottom-line__copyright'));
    }
}

function remove_products_or_not(order_id, selector) {
    $('#modal_remove_products_or_not').remove();
    let url = 'index.php?route=checkout/cart/remove_products_or_not&order_id=' + order_id;
    if (selector == 'set') {
        url = 'index.php?route=checkout/cart/remove_products_or_not_set';
    }
    if (!isNaN(parseInt($('#cart-total').text())) || parseInt($('#cart-total').text()) > 0) {
        $.ajax({
            type: 'GET',
            url: url,
            async: false,
            success: function(data) {
                $('body').append(data);
                $('#modal_remove_products_or_not').modal('show');
                $('#modal_remove_products_or_not .btn.btn-dismiss').on('click', function() {
                    remove_products_or_not_add(order_id, selector, 1);
                    $('#modal_remove_products_or_not').modal('hide');
                });
                $('#modal_remove_products_or_not .btn.btn-primary').on('click', function() {
                    remove_products_or_not_add(order_id, selector, 0);
                    $('#modal_remove_products_or_not').modal('hide');
                });
            },
        });
    } else {
        remove_products_or_not_add(order_id, selector, 0);
    }
}

function remove_products_or_not_add(order_id, selector, del) {
    if (selector == 'set') {
        set.add(order_id, del);
    } else {
        reorder(order_id, del);
    }
}

function reorder(order_id, del) {
    $.ajax({
        url: 'index.php?route=account/order/reorder&order_id=' + order_id + '&delete=' + del,
        type: 'get',
        dataType: 'json',
        success: function(json) {
            if (json['error']) {
                $().toastmessage('showErrorToast', json['error']);
            }
            if (json['success']) {
                $().toastmessage('showSuccessToast', json['success']);
                setTimeout(function() {
                    location.reload();
                }, 1000);
            }
        },
    });
}

function calcHeightManufacturerList(main_page) {
    if (main_page === undefined) {
        main_page = false;
    }
    let width = $(window).outerWidth();
    let items = $('#manufacturers-list div.item');
    let cols = 4;
    let paddings = main_page ? 40 : 120;
    if (width < 1200) {
        paddings = main_page ? 0 : 80;
    }
    if (width < 992) {
        cols = 3;
    }
    if (width < 768) {
        cols = 2;
        paddings = main_page ? 0 : 40;
    }
    let max_height = 0;
    let height_col = [];
    for (let i = 0; i < cols; i++) {
        height_col.push(0);
    }
    items.each(function(index, el) {
        for (let i = 0; i < cols; i++) {
            if ($(el).css('order') == (i + 1)) {
                if ($(el).css('display') == 'block') {
                    height_col[i] += $(el).outerHeight(true);
                }
            }
        }
    });
    for (let i = 0; i < cols; i++) {
        max_height = (height_col[i] > max_height) ? height_col[i] : max_height;
    }
    let wrap_height = max_height + paddings;
    $('#manufacturers-list').css('height', wrap_height);
}

function setInputActive(elem) {
    $(elem).addClass('full');
}

function checkInputActive(elem) {
    if ((elem.find('input') && elem.find('input').val() && elem.find('input').val().length > 0) || (elem.find('textarea') && elem.find('textarea').val() && elem.find('textarea').val().length > 0)) {
        $(elem).addClass('full');
    } else {
        $(elem).removeClass('full');
    }
}
$(document).ready(function() {
    $('#cart_view').on('click', function() {
        $('body').addClass('bodyLocked');
    });
    $('#basketmodal').on('hide.bs.modal', function() {
        $('body').removeClass('bodyLocked');
    });
    $('body').on('click', '.login_phone, .finish-registration_name, .finish-registration_email, .label_input', function() {
        setInputActive($(this));
        $(this).find('input').focus();
        $(this).find('textarea').focus();
    });
    $('body').on('click', '.login_phone label, .finish-registration_name label, .finish-registration_email label, .label_input label, .login_phone input, .finish-registration_name input, .finish-registration_email input, .label_input input, .label_input textarea', function() {
        setInputActive($(this).parent());
        $(this).parent().find('input').focus();
        $(this).parent().find('textarea').focus();
    });
    $('body').on('focus', '.login_phone input, .finish-registration_name input, .finish-registration_email input, .label_input input, .label_input textarea', function() {
        setInputActive($(this).parent());
    });
    $('body').on('blur', '.login_phone input, .finish-registration_name input, .finish-registration_email input, .label_input input, .label_input textarea', function() {
        let elem = $(this).parent();
        setTimeout(function() {
            checkInputActive(elem);
        }, 300);
    });
    $('#product-preview').on('DOMNodeInserted', function(event) {
        $('.product-layout.product-grid .product-thumb .image img').on('load', function() {
            $(this).parent().parent().addClass('loaded');
            $(this).addClass('ready');
        });
    });
    $('.anchor-link').on('click', function(event) {
        event.preventDefault();
        let id = $(this).attr('href');
        let top = $(id).offset().top - 150;
        $('body,html').animate({
            scrollTop: top
        }, 1500);
    });
    let url_string = window.location.href;
    if (url_string.search('/#!goods/') > -1) {
        let elem = document.createElement('meta');
        elem.setAttribute('name', 'fragment');
        elem.setAttribute('content', '!');
        let baseItem = document.getElementsByTagName('base')[0];
        document.head.insertBefore(elem, baseItem);
    } else
        $('<meta name="fragment" content="!">').remove();
    if (getURLVar('page') != '') {
        let $target = $('body');
        $target.scrollTo('.table.table-striped:eq(0)', 1000);
    }
    $('.reorder').on('click', function() {
        let order_id = $(this).data('order_id');
        remove_products_or_not(order_id);
        return false;
    });
    $('a.pay_online').on('click', function() {
        let order_id = $(this).data('order_id');
        let invoice_amount = $(this).data('invoice_amount');
        let url = 'index.php?route=account/order/pay_online&order_id=' + order_id;
        if (invoice_amount > 0) {
            url += '&invoice_amount=' + invoice_amount;
        }
        $.ajax({
            url: url,
            type: 'get',
            dataType: 'json',
            success: function(json) {
                if (json['error']) {
                    $().toastmessage('showErrorToast', json['error']);
                }
                if (json['load']) {
                    $('.second_block').html(json['load']);
                }
            }
        });
    });
    $(window).on('load resize scroll', function() {
        var $totop = $('#totop');
        if ($(window).width() < 992) {
            $totop.hide();
        } else {
            if ($(window).scrollTop() > 300) {
                $totop.fadeIn('fast');
            } else {
                $totop.fadeOut('fast');
            }
        }
    });
    setTimeout(function() {
        $('#carrotquest-collapsed-text').css('display', 'none');
        $('#present-collapsed-text').css('display', 'none');
    }, 10000);
    $('.qa_block').on('click', function() {
        $(this).children('.question').toggle();
        $(this).toggleClass('ans');
        $(this).children('.answer').toggle();
    });
    if (isMobileDevice()) {
        $('.visible-xs .remove4mobile:gt(5)').remove();
    }
    $('.product_slide').slick({
        dots: false,
        arrows: true,
        infinite: false,
        slidesToShow: 4,
        slidesToScroll: 2,
        lazyLoad: 'ondemand',
    });
    if (window.screen.width < 500) {
        $('#qa_slider').slick({
            dots: false,
            centerMode: false,
            centerPadding: '20px',
            arrows: true,
            infinite: false,
            slidesToShow: 1,
            slidesToScroll: 1
        });
    }
    if (window.screen.width < 601) {
        $('.vk_slide').slick({
            dots: true,
            arrows: false,
            infinite: false,
            slidesToShow: 1,
            slidesToScroll: 1,
        });
        $('.photo_slide').slick({
            dots: true,
            arrows: false,
            infinite: false,
            slidesToShow: 1,
            slidesToScroll: 1,
        });
    }
    $('#product-preview').on('shown.bs.modal', function(event) {
        animate_product_card_in_list();
    });
    $(document).on('click', '*[data-target="#checkout"]', function() {
        metric.notify('click_checkout');
    });
    $('#checkout').on('show.bs.modal', function() {
        $('.carrotquest-css-reset').css('display', 'none');
    });
    $('#checkout').on('hide.bs.modal', function() {
        $('.carrotquest-css-reset').css('display', 'block');
    });
    $('#product-preview').on('click', '#showreview', function(e) {
        $('.nav-tabs li:eq(1) a').tab('show');
        var $target = $('#product-preview');
        $target.scrollTo('#form-review', 1000);
        $('#product-preview .preview_toggle').hide();
    });
    $('#product-preview-data').on('show.bs.tab', 'a[data-toggle=\'tab\']', function(e) {
        var target = $(e.target).attr('href');
        if (target == '#tab-description') {
            $('#product-preview .preview_toggle').show();
        } else {
            $('#product-preview .preview_toggle').hide();
        }
    });

    function getaddress_line() {
        return $('#modal-edit-address #input-shipping_city').val() + ', ' + $('#modal-edit-address #input-shipping_street').val() + ', ' + $('#modal-edit-address #input-shipping_numhouse').val();
    }
    $('.rating').on('click', '#showreview', function(e) {
        $('.nav-tabs li:last a').tab('show');
        var $target = $('body');
        $target.scrollTo('.table.table-striped:eq(0)', 1000);
    });
    $('body').on('click', '#totop', function(e) {
        var $target = $('body');
        $target.scrollTo('body', 1000);
    });
    $('#product-preview').on('click', '#modal_login', function(e) {
        $('#modal_loginform').remove();
        $.ajax({
            type: 'GET',
            url: 'index.php?route=account/login/modal_loginform',
            async: false,
            success: function(data) {
                $('body').append(data);
            }
        });
    });
    $('body').on('keypress', '#modal_loginform input[type="text"], #modal_loginform input[type="password"]', function(e) {
        if (e.which === 13) $('#modal_login_btn').trigger('click');
    });
    $('body').on('click', '#modal_login_btn', function(e) {
        $.ajax({
            url: 'index.php?route=account/login/modal_login',
            type: 'post',
            data: {
                email: $('#modal_loginform input[name=\'email\']').val(),
                password: $('#modal_loginform input[name=\'password\']').val()
            },
            dataType: 'json',
            cache: false,
            beforeSend: function() {
                $('#modal_loginform input').parent().removeClass('has-error');
                $('#modal_loginform .text-danger').html('');
            },
            success: function(json) {
                if (json['success']) {
                    var currentToken = window.localStorage.getItem('sentFirebaseMessagingToken');
                    if (currentToken) {
                        var url = '/index.php?route=api/webpush';
                        $.post(url, {
                            token: currentToken
                        });
                    }
                    var add = '';
                    if (location.hash == '#checkout=open') {
                        add = '#checkout=open';
                    }
                    if (json['product_alert_success']) {
                        $().toastmessage('showToast', {
                            text: json['product_alert_success'],
                            stayTime: 6000,
                            type: 'success'
                        });
                    }
                    window.location = json.redirect;
                } else if (json['error']) {
                    $('#modal_loginform input').parent().addClass('has-error');
                    $('#modal_loginform .text-danger').html(json['error']);
                }
            }
        });
    });
    $('#product-preview').on('click', '#btn-minuse', function() {
        var q = parseInt($('input[name=\'quantity\']').val());
        if (q <= 1) {
            q = 1;
        } else {
            q -= 1;
        }
        $('input[name=\'quantity\']').val(q);
    });
    $('#product-preview').on('click', '#btn-pluss', function() {
        var q = parseInt($('input[name=\'quantity\']').val());
        q++;
        $('input[name=\'quantity\']').val(q);
    });
    $('body').on('click', '#quick_login, #quick_password_restore_login', function(e) {
        e.preventDefault();
        $('#modal_password_restore').modal('hide');
        $('#modal_loginform').remove();
        $.ajax({
            type: 'GET',
            url: 'index.php?route=account/login/modal_loginform',
            async: false,
            success: function(data) {
                $('body').append(data);
            }
        });
    });
    $('body').on('click', '#quick_password_restore', function(e) {
        e.preventDefault();
        $('#modal_loginform').modal('hide');
        $('#modal_password_restore').remove();
        $.ajax({
            type: 'GET',
            url: 'index.php?route=account/login/modal_restore',
            async: false,
            success: function(data) {
                $('body').append(data);
            }
        });
    });
    $('body').on('click', '#modal_password_btn', function(e) {
        $.ajax({
            url: 'index.php?route=account/forgotten/modal_password_restor',
            type: 'post',
            data: {
                email: $('#modal_password_restore input[name=\'email\']').val(),
                telephone: $('#modal_password_restore input[name=\'telephone\']').val(),
            },
            dataType: 'json',
            cache: false,
            beforeSend: function() {
                $('#modal_password_restore input[name=\'email\']').parent().removeClass('has-error');
                $('#modal_password_restore input[name=\'telephone\']').parent().removeClass('has-error');
                $('#modal_password_restore #result_restore').html('').removeClass('text-danger').removeClass('text-success');
                $('#rest_res').hide();
                $('#restore_loader').show();
            },
            success: function(json) {
                $('#restore_loader').hide();
                $('#rest_res').show();
                if (json['success']) {
                    $('#modal_password_restore .modal-body #rest_res').html('<div class="text-center"><div class="h_a"></div><div class="mes">' + json['success'] + '</div></div>');
                } else if (json['error']['warning']) {
                    $('#modal_password_restore #result_restore').html(json['error']['warning']).addClass('text-danger');
                }
            }
        });
    });
    $('#checkout').on('click', 'input[name=\'shipping_date_id\']', function() {
        if ($(this).next().hasClass('text-danger')) {
            $('#checkout-form-button').hide();
        } else {
            $('#checkout-form-button').show();
        }
        $(this).next().trigger('click');
    });
    $('#checkout').on('click', '.radio span', function() {
        $(this).closest('input').prop('checked', true);
        if ($(this).hasClass('text-danger')) {
            $('#checkout-form-button').hide('fast');
        } else {
            $('#checkout-form-button').show('slow');
        }
    });
    $('#checkout').on('click', '.delete_address', function(e) {
        e.preventDefault();
        if (confirm('Удалить адрес?')) {
            var address_id = $(this).data('address');
            $.ajax({
                url: 'index.php?route=account/address/deleteNew&address_id=' + address_id,
                dataType: 'json',
                type: 'post',
                success: function(json) {
                    if (json['success']) {
                        $('#address_' + address_id).fadeOut(400, function() {
                            $(this).remove();
                        });
                    }
                    if (json['error']) {
                        alert(json['error']);
                    }
                    setTimeout(function() {
                        if ($('#checkout_address_block .radio input:checked').length == 0) {
                            $('#checkout_address_block .radio:eq(0) input').prop('checked', true);
                        }
                    }, 600);
                }
            });
        }
    });
    $('body').on('hidden.bs.modal', '#modal-edit-address', function() {
        $('body').addClass('modal-open');
    });
    $('#checkout').on('click', '.edit_address', function(e) {
        e.preventDefault();
        $.ajax({
            url: 'index.php?route=account/address/editAddress',
            cache: false,
            data: 'address_id=' + $(this).data('address'),
            dataType: 'html',
            beforeSend: function() {
                $('#modal-edit-address').remove();
            },
            success: function(data) {
                $('body').append(data);
                $('#modal-edit-address').modal('show');
            }
        });
    });
    $('body').on('click', '#edit_address_button', function(e) {
        e.preventDefault();
        $.ajax({
            url: 'index.php?route=account/address/editNew&address_id=' + $(this).data('address'),
            data: $('#modal-edit-address form#edit_address').serialize(),
            type: 'post',
            dataType: 'json',
            success: function(json) {
                $('#modal-edit-address div.has-error').removeClass('has-error');
                $('div.text-danger').remove();
                if (json['success']) {
                    $('#checkout-data').load('index.php?route=checkout/checkout_ajax/info');
                    $('#modal-edit-address').modal('hide');
                }
                if (json['error']) {
                    for (i in json['error']) {
                        var element = $('#input-' + i);
                        $(element).parent().addClass('has-error');
                        $(element).after('<div class="text-danger">' + json['error'][i] + '</div>');
                    }
                }
            }
        });
    });
    $('#checkout').on('click', '#add_address', function(e) {
        if ($('#add_address').attr("disabled") == 'disabled') {
            return false;
        }
        $('#add_address').attr('disabled', true);
        $.ajax({
            url: 'index.php?route=account/address/addAddress',
            cache: false,
            dataType: 'html',
            beforeSend: function() {
                $('#modal-edit-address').remove();
            },
            success: function(data) {
                $('body').append(data);
                $('#modal-edit-address').modal('show');
                $('#add_address').attr("disabled", false);
            }
        });
    });
    $('body').on('change', '#full_address', function(e) {
        $('#modal-edit-address div.has-error').removeClass('has-error');
        $('div.text-danger').remove();
    });
    $('body').on('click', '.u-AhunterEmptySuggestion', function(e) {
        e.preventDefault();
    });
    $('body').on('click', '.u-AhunterSuggestions', function(e) {
        e.preventDefault();
    });
    $('body').on('click', '#add_address_button', function(e) {
        e.preventDefault();
        if ($('#add_address_button').attr("disabled") == 'disabled') {
            return false;
        }
        $('#add_address_button').attr('disabled', true);
        if ($('#modal-edit-address #form_type').val() == 'light_form') {
            $('#modal-edit-address div.has-error').removeClass('has-error');
            $('div.text-danger').remove();
            checkAddressForm($('#modal-edit-address #full_address').val(), $('#modal-edit-address #address_token').val());
            if ($('#modal-edit-address #full_address').parent().hasClass("has-error")) {
                $('#add_address_button').attr("disabled", false);
                return;
            }
        }
        $.ajax({
            url: 'index.php?route=account/address/addNew=',
            data: $('#modal-edit-address form#edit_address').serialize(),
            type: 'post',
            dataType: 'json',
            success: function(json) {
                $('#modal-edit-address div.has-error').removeClass('has-error');
                $('div.text-danger').remove();
                if (json['success']) {
                    $('#checkout-data').load('index.php?route=checkout/checkout_ajax/info');
                    $('#modal-edit-address').modal('hide');
                }
                $('#add_address_button').attr("disabled", false);
                if ($('#modal-edit-address #form_type').val() == 'light_form') {
                    errors = "";
                    if (json['error']) {
                        for (i in json['error']) {
                            errors += json['error'][i] + ". ";
                        }
                    }
                    if (errors) {
                        errors += '<br>Или попробуйте <a onclick="addAddressManual();">заполнить адрес вручную</a>, и оператор свяжется с Вами для уточнения.';
                        $('#modal-edit-address #full_address').after('<div class="text-danger">' + errors + '</div>');
                        $('#modal-edit-address #full_address').parent().addClass('has-error');
                    }
                } else if (json['error']) {
                    for (i in json['error']) {
                        var element = $('#input-' + i);
                        $(element).parent().addClass('has-error');
                        $(element).after('<div class="text-danger">' + json['error'][i] + '</div>');
                    }
                }
            }
        });
    });
    if ($(window).outerWidth() < 768 && $('.new_menu').outerHeight() > 70) {
        const $menu = $('.new_menu');
        if (!$menu.data('disable-collapse')) {
            $menu.animate({
                'max-height': '70px'
            }, 800);
        }
    } else {
        $('#showallcategoriesonmobile').hide();
    }
    $('#showallcategoriesonmobile').click(function(e) {
        e.preventDefault();
        $('#showallcategoriesonmobile, #hideallcategoriesonmobile').toggle();
        $('.new_menu').animate({
            'max-height': '100%'
        }, 800, function() {});
    });
    $('#hideallcategoriesonmobile').click(function(e) {
        e.preventDefault();
        $('#showallcategoriesonmobile, #hideallcategoriesonmobile').toggle();
        $('.new_menu').animate({
            'max-height': '70px'
        }, 800, function() {});
    });
    $('#product-preview').on('click', '.product-preview-description-show #show', function(e) {
        e.preventDefault();
        window['old_h'] = $('#product-preview #product-preview-description').css('max-height');
        $('.product-preview-description-show #show, .product-preview-description-show #hide').toggle();
        $('#product-preview #product-preview-description').animate({
            'max-height': '100%'
        }, 800, function() {});
    });
    $('#product-preview').on('click', '.product-preview-description-show #hide', function(e) {
        e.preventDefault();
        $('.product-preview-description-show #show, .product-preview-description-show #hide').toggle();
        $('#product-preview #product-preview-description').animate({
            'max-height': window.old_h + ''
        }, 300, function() {});
    });
    $('#present_small_fixed, #present-collapsed-text').click(function(e) {
        $('#sendpulse').modal('show');
    });
    $('#contractor-form-modal').on({
        'shown.bs.modal': function(e) {
            var $this = $(this);
            $.ajax({
                url: '/contractor-form',
                method: 'GET'
            }).done(function(data) {
                $this.find('.modal-body').html(data);
            });
            window.location.hash = $this.attr('id') + '=open';
        },
        'hidden.bs.modal': function(e) {
            window.history.back();
        }
    });
    if (document.location.pathname + document.location.search == '/index.php?route=product/meatless_category') {
        $('#meatless').addClass('current');
    }
    var current = $('#menu a[href=\'' + document.location.pathname + '\']').parent();
    current.addClass('current');
    if (typeof(cart) != 'undefined') {
        cart.get_info(1);
    }
    let params = window.location.search.replace('?', '').split('&').reduce(function(p, e) {
        let a = e.split('=');
        p[decodeURIComponent(a[0])] = (function() {
            try {
                return decodeURIComponent(a[1]);
            } catch (e) {
                return '';
            }
        })();
        return p;
    }, {});
    let hash = window.location.hash.replace('#', '').split('&').reduce(function(p, e) {
        let a = e.split('=');
        p[decodeURIComponent(a[0])] = (function() {
            try {
                return decodeURIComponent(a[1]);
            } catch (e) {
                return '';
            }
        })();
        return p;
    }, {});
    $('#basketmodal').on('show.bs.modal', function(event) {
        $('.modal').modal('hide');
        $('#carrotquest-messenger-collapsed-container').attr('style', 'z-index: 1 !important');
        window.location.hash = 'cart=open';
        if (isiOS()) {}
        metric_set_basket_products();
        metric.notify('view_basket', {
            totalPrice: parseInt($('#cart-total').text())
        }, 1000);
    });
    $('#basketmodal').on('hidden.bs.modal', function(event) {
        if (isiOS()) {}
    });
    $('#product-preview').on('hidden.bs.modal', function(event) {
        if (document.referrer.length != 0) {
            window.history.back();
        }
        delete window.list_related;
        document.title = $('meta[name=\'general:title\']').attr('content');
        $('#product-preview-data').html($('#checkout-preview-default').html());
    });
    window.onload = function() {
        if (typeof(hash['productid']) == 'undefined') {
            if (hash['cart'] == 'open' || params['cart'] == 'open') {
                $('#basketmodal').modal('show');
            } else {
                if (hash['checkout'] == 'open') {
                    if (typeof metric != "undefined" && typeof metric.var('customer_auth') != "undefined" && !metric.var('customer_auth')) {
                        showAuth(1);
                    } else {
                        if (getCookie('_ed_checkout_form') == 'new') {
                            window.location = '/checkout';
                        } else {
                            $('#checkout').modal('show');
                        }
                    }
                    if (window.location.href.indexOf('registration=true') > 0) {
                        metric.notify('registration', [], 3000);
                    }
                    if (window.location.href.indexOf('login=true') > 0) {
                        metric.notify('authorization', [], 3000);
                        window.history.replaceState({}, document.title, window.location.href.split('?')[0] + '#checkout=open');
                    }
                } else if (hash['policy'] == 'open') {
                    $('#policy').modal('show');
                } else if (hash['contractor-form-modal'] == 'open') {
                    $('#contractor-form-modal').modal('show');
                } else if (hash['modal-product_return'] == 'open') {
                    $('.product_return').trigger('click');
                } else if (hash['modal-oferta_modal'] == 'open') {
                    $('.oferta_modal').trigger('click');
                } else if (hash['modal-policy_modal'] == 'open') {
                    $('.policy_modal').trigger('click');
                }
            }
        }
    }
    if (typeof(hash['review']) != 'undefined') {
        $('.nav-tabs li:last a').tab('show');
        var $target = $('body');
        $target.scrollTo('#review', 1000);
    }
    add_tooltip_events();
    $('body').on('click', 'a.product-preview', function(e) {
        e.preventDefault();
        if ($(this).hasClass('disabled')) {
            return false;
        }
        $('#product-preview-data').html($('#checkout-preview-default').html());
        var hide_price = !!$(this).attr('data-mini_preview');
        $.ajax({
            url: 'index.php?route=product/product/goods&=',
            dataType: 'html',
            type: 'POST',
            data: {
                key: $(this).attr('href'),
                hide_price: hide_price
            },
            success: function(html) {
                if (!html) return;
                $('#product-preview-data').html(html);
                $('#product-preview').modal('show');
                add_tooltip_events();
            }
        });
        var stateObj = {
            esh: 'derevenskoe'
        };
        history.pushState(stateObj, 'page 2', $(this).attr('href'));
    });
    var re = /^#!goods/i;
    if (re.test(window.location.hash)) {
        $('#product-preview-data').html($('#checkout-preview-default').html());
        $.ajax({
            url: 'index.php?route=product/product/goods&=',
            dataType: 'html',
            type: 'POST',
            data: {
                key: window.location.hash,
                hide_price: false
            },
            success: function(html) {
                if (!html) return;
                $('#product-preview-data').html(html);
                $('#product-preview').modal('show');
                add_tooltip_events();
            }
        });
    }
    if (typeof(hash['productid']) != 'undefined') {
        product.preview(hash['productid']);
        var product_id = hash['productid'];
        var product_name = $('#product-name-id' + product_id).text();
        var product_description = $('#product-description-id' + product_id).text();
        var manufacturer_name = $('#product-manufacturer-id' + product_id).text();
        window.location.hash = 'productid=' + product_id;
        document.title = product_name + ' от ' + manufacturer_name;
        $('meta[name=\'description\']').attr('content', product_description.substr(0, 125) + '...');
    }
    if (typeof(hash['point']) != 'undefined') {
        var product_id = hash['point'];
        $('html, body').animate({
            scrollTop: $('.product' + product_id).offset().top - 125
        }, 500);
    }
    if (typeof(hash['popup']) != 'undefined') {
        if (hash['popup'] == 'open') {
            setTimeout(function() {
                $('.carrotquest-css-reset').css('display', 'none');
                $('#carrotquest-messenger-collapsed').attr('style', 'z-index: 1 !important');
            }, 1300);
            $('#direct_popup').modal('show');
        }
    }
    $('#direct_popup').on('hidden.bs.modal', function(event) {
        $('.carrotquest-css-reset').css('display', 'block');
        $('#carrotquest-messenger-collapsed').removeAttr('style');
    });
    $('#basketmodal').on('hidden.bs.modal', function(event) {
        $('#carrotquest-messenger-collapsed-container').removeAttr('style');
        window.history.back();
    });
    $('#checkout').on('show.bs.modal', function(event) {
        if (typeof metric != "undefined" && typeof metric.var('customer_auth') != "undefined" && !metric.var('customer_auth')) {
            window.location.hash = 'checkout=open';
            event.preventDefault();
            showAuth(1);
        }
    });
    $('#checkout').on('hidden.bs.modal', function(event) {
        window.history.back();
    });
    $('#login_modal').on('hidden.bs.modal', function(event) {
        window.location.hash = '';
    });
    $(document).on('click', '#cart .dropdown-menu', function(e) {
        e.stopPropagation();
    });
    $('.text-danger').each(function() {
        var element = $(this).parent().parent();
        if (element.hasClass('form-group')) {
            element.addClass('has-error');
        }
    });
    let
        $menuGeneral = $('#menu-general'),
        $wrapper = $('#wrapper');
    $menuGeneral.on('affix.bs.affix', function() {
        $wrapper.css('padding-top', $(this).outerHeight());
    });
    $menuGeneral.on('affix-top.bs.affix', function() {
        $wrapper.css('padding-top', 0);
    });
    if ($('.container').first().innerWidth() < 750 || !$('div').is('#categories')) {
        $('#menu-general').removeAttr('data-spy');
    }
    $('#checkout').on('shown.bs.modal', function() {
        $('#basketmodal').modal('hide').promise().done(function() {
            setTimeout(function() {
                $('body').addClass('modal-open');
            }, 300);
            setTimeout(function() {
                window.location.hash = 'checkout=open';
            }, 500);
        });
        $('#checkout-data').html($('#checkout-default').html());
        $.ajax({
            url: 'index.php?route=checkout/checkout_ajax/info',
            dataType: 'html',
            type: 'POST',
            success: function(html) {
                $('#checkout-data').html(html);
                $('body').addClass('modal-open');
            }
        });
    });
    $('#checkout').on('hidden.bs.modal', function(event) {
        $('#checkout-data').html($('#checkout-default').html());
    });
    $('#menu .dropdown-menu').each(function() {
        var menu = $('#menu').offset();
        var dropdown = $(this).parent().offset();
        var i = (dropdown.left + $(this).outerWidth()) - (menu.left + $('#menu').outerWidth());
        if (i > 0) {
            $(this).css('margin-left', '-' + (i + 10) + 'px');
        }
    });
    $(document).on('keydown', '#collapse-checkout-option input[name=\'email\'], #collapse-checkout-option input[name=\'password\']', function(e) {
        if (e.keyCode == 13) {
            $('#collapse-checkout-option #button-login').trigger('click');
        }
    });
    $('[data-toggle="tooltip"]').tooltip({
        container: 'body'
    });
    $(document).ajaxStop(function() {
        $('[data-toggle="tooltip"]').tooltip({
            container: 'body'
        });
    });
    $('.team-member-profile-image').hover(function() {
        let bcgr = $(this).attr('data-bcgr');
        if (!bcgr) bcgr = $(this).css('background-image');
        $(this).attr('data-bcgr', bcgr);
        let
            filename = bcgr.split('team/'),
            file_str = filename[1].split('_'),
            file_num = file_str[1].replace(/[^0-9.]/gim, ''),
            new_file_num = (file_num > 1) ? 1 : 2;
        $(this).css('background-image', filename[0] + 'team/' + file_str[0] + '_' + new_file_num + '.jpg');
    }, function() {
        $(this).css('background-image', $(this).attr('data-bcgr'));
    });
    animate_product_card_in_list();
    if (typeof(add_url_gradient_for_safari) === "function") {
        add_url_gradient_for_safari();
    }
    if (location.search.indexOf("login=") > -1) {
        window.history.replaceState({}, document.title, window.location.href.split('?')[0] + '');
    }
});

function add_tooltip_events() {
    $('body').on('click', 'div[data-toggle="tooltip"], span[data-toggle="tooltip"], i[data-toggle="tooltip"], .product_icon_image[data-toggle="tooltip"]', function() {
        let _this = this;
        if ($(_this).parents('.modal-content').length > 0 || $(_this).parents('.product-thumb').length > 0) {
            document.addEventListener('scroll', function(event) {
                $(_this).tooltip('hide');
            }, true);
        }
        setTimeout(function() {
            $(_this).tooltip('hide');
        }, 5000);
        return false;
    });
    $('body').on('mouseover', 'div[data-toggle="tooltip"], span[data-toggle="tooltip"]', function() {
        let _this = this;
        if ($(_this).parents('.modal-content').length > 0 || $(_this).parents('.product-thumb').length > 0 || $(_this).parents('#modal_order').length > 0) {
            document.addEventListener('scroll', function(event) {
                $(_this).tooltip('hide');
            }, true);
        }
        setTimeout(function() {
            $(_this).tooltip('hide');
        }, 2000);
        return false;
    });
}

function add_url_gradient_for_safari() {
    $('.svg-inline--fa path').each(function() {
        let fill = $(this).attr('fill').split("#")[1];
        let uri = window.location.href.split("#")[0];
        $(this).attr('fill', 'url(' + uri + '#' + fill);
    });
}

function animate_product_card_in_list() {
    $.ajax({
        url: 'index.php?route=account/wishlist/listofwishes',
        dataType: 'json',
        cache: false,
        success: function(json) {
            if (json.list && json.list.length > 0) {
                for (let i = 0; i < json.list.length; i++) {
                    update_wishlist(json.list[i].product_id);
                }
            }
        }
    });
    if ($('.add-in-order').length > 0) {
        return false;
    }
    $.ajax({
        url: 'index.php?route=checkout/cart/get_cart',
        dataType: 'json',
        cache: false,
        success: function(json) {
            if (json.products && Object.keys(json.products).length > 0) {
                $.each(json.products, function(i, item) {
                    update_added(item['product_id'], item['quantity']);
                });
            }
        }
    });
}

function update_wishlist(product_id, remove) {
    if (remove === undefined) {
        remove = false;
    }
    if ($('#product-wishlist' + product_id + ' .fa-heart').length > 0) {
        if (remove) {
            $('#product-wishlist' + product_id + ' .fa-heart').removeClass("fas");
            $('#product-wishlist' + product_id + ' .fa-heart').addClass("far");
        } else {
            $('#product-wishlist' + product_id + ' .fa-heart').removeClass("far");
            $('#product-wishlist' + product_id + ' .fa-heart').addClass("fas");
        }
    }
}
var checkout = {
    'registration': function() {
        let OrderData = $('#checkout-form').serialize();
        let city = '';
        if ($("div").is(".address_id")) {
            city = $("#checkout_address_block input[name=address_id]:checked").data("shipping_city");
        } else {
            city = $("#checkout-shipping_city").val();
        }
        OrderData += '&shipping_city=' + city;
        $.ajax({
            url: 'index.php?route=checkout/checkout_ajax/order_registration',
            type: 'post',
            data: OrderData,
            dataType: 'json',
            cache: false,
            beforeSend: function() {
                checkout.button('loading');
                checkout.saveData();
            },
            success: function(json) {
                $('.has-error > .text-danger').remove();
                $('.form-group').removeClass('has-error');
                $('.col-sm-6').removeClass('has-error');
                $('.col-sm-3').removeClass('has-error');
                if (json['reloadpage']) {
                    location = json['reloadpage'];
                    return false;
                }
                if (json['success']) {
                    metric.notify('purchase_order_created');
                    if (json['redirect']) {
                        location = json['redirect'];
                    }
                    if (json['load']) {
                        $('#checkout-confirm').html(json['load']);
                    }
                } else {
                    if (json['error']['warning']) {
                        $('#checkout-alert').prepend('<div class="alert alert-warning">' + json['error']['warning'] + '<button type="button" class="close" data-dismiss="alert">&times;</button></div>');
                    }
                    for (i in json['error']) {
                        var element = $('#checkout-' + i);
                        $('#checkout-' + i).prop('type', 'text');
                        if ($(element).parent().hasClass('form-group')) {
                            $(element).parent().addClass('has-error');
                            $(element).after('<div class="text-danger">' + json['error'][i] + '</div>');
                        } else {
                            $(element).parent().addClass('has-error');
                            $(element).after('<div class="text-danger">' + json['error'][i] + '</div>');
                        }
                    }
                    checkout.button('reset');
                }
            }
        });
    },
    'removeProducts': function(shipping_date_id, shipping_time_change) {
        checkout.saveData();
        $.ajax({
            url: 'index.php?route=checkout/cart/remove_products',
            type: 'post',
            data: 'shipping_date_id=' + shipping_date_id,
            cache: false,
            dataType: 'json',
            success: function(json) {
                $('#checkout-data').load('index.php?route=checkout/checkout_ajax/info');
                $('#basketmodalbody').load('index.php?route=extension/module/ghost_cart/info', function() {
                    $('#checkout').modal('show');
                    setTimeout(function() {
                        $('input[name=\'shipping_date_id\'][value=' + shipping_date_id + ']').prop('checked', true);
                        $('input[name=\'shipping_date_id\'][value=' + shipping_date_id + ']').trigger('click');
                        $('input[name=\'shipping_date_id\'][value=' + shipping_date_id + ']').trigger('change');
                    }, 200);
                    setTimeout(function() {
                        $('input[name=\'shipping_time\'][value=' + shipping_time_change + ']').prop('checked', true);
                        $('input[name=\'shipping_time\'][value=' + shipping_time_change + ']').trigger('click');
                        $('input[name=\'shipping_time\'][value=' + shipping_time_change + ']').trigger('change');
                    }, 400);
                });
                setTimeout(function() {
                    let cart_total = json['total'];
                    if (typeof json['new_total'] != 'undefined') {
                        cart_total = json['new_total'];
                    }
                    $('.cart-top__total').html(cart_total);
                }, 100);
            }
        });
    },
    'removeProductsAndSave': function(shipping_date_id, shipping_time_change) {
        checkout.saveData();
        $.ajax({
            url: 'index.php?route=checkout/cart/remove_products_and_save',
            type: 'post',
            data: 'shipping_date_id=' + shipping_date_id,
            cache: false,
            dataType: 'json',
            success: function(json) {
                $('#checkout-data').load('index.php?route=checkout/checkout_ajax/info');
                $('#basketmodalbody').load('index.php?route=extension/module/ghost_cart/info', function() {
                    $('#checkout').modal('show');
                    setTimeout(function() {
                        $('input[name=\'shipping_date_id\'][value=' + shipping_date_id + ']').prop('checked', true);
                        $('input[name=\'shipping_date_id\'][value=' + shipping_date_id + ']').trigger('click');
                        $('input[name=\'shipping_date_id\'][value=' + shipping_date_id + ']').trigger('change');
                    }, 200);
                    setTimeout(function() {
                        $('input[name=\'shipping_time\'][value=' + shipping_time_change + ']').prop('checked', true);
                        $('input[name=\'shipping_time\'][value=' + shipping_time_change + ']').trigger('click');
                        $('input[name=\'shipping_time\'][value=' + shipping_time_change + ']').trigger('change');
                    }, 400);
                });
            }
        });
    },
    'saveData': function() {
        var OrderData = $('#checkout-form').serialize();
        $.ajax({
            url: 'index.php?route=checkout/checkout_ajax/save_customer_data',
            type: 'post',
            data: OrderData,
            dataType: 'json',
            cache: false
        });
    },
    'button': function(action) {
        if ('loading' === action) {
            $('#checkout-wait').show();
            $('#checkout button.close').css('visibility', 'hidden');
            $('#checkout .checkout_h').text('Подождите, мы оформляем Ваш заказ');
            $('#checkout-form .modal-body').hide().data('loading', true).data('percent', 0);
            (function checkout_button_loading() {
                let checkout_form_button = $('#checkout-form .modal-body');
                if (checkout_form_button.data('loading')) {
                    let percent = checkout_form_button.data('percent') + 1;
                    if (percent < 80) {
                        percent = Math.round(percent * 1.2);
                    } else {
                        percent = Math.round(percent * 1);
                    }
                    if (100 < percent) {
                        percent = 37;
                    }
                    checkout_form_button.data('percent', percent);
                    $('#checkout-wait .progress-bar').css('width', percent + '%').attr('aria-valuenow', percent);
                    $('#checkout-wait h3 strong').text(percent);
                    setTimeout(checkout_button_loading, 500);
                }
            })();
        } else {
            $('#checkout-wait').hide();
            $('#checkout button.close').css('visibility', 'visible');
            $('#checkout .checkout_h').text('Оформление заказа');
            $('#checkout-form .modal-body').show().data('loading', false);
        }
    },
};
var set = {
    'choice': function(set_id) {
        $.ajax({
            url: 'index.php?route=product/set/choice',
            type: 'post',
            data: 'set_id=' + set_id,
            cache: false,
            dataType: 'json',
            beforeSend: function() {
                $('.button-set').button('loading');
            },
            complete: function() {
                $('.button-set').button('reset');
            },
            success: function(json) {
                $('.alert, .text-danger').remove();
                if (json['redirect']) {
                    location = json['redirect'];
                }
            }
        });
    },
    'more': function(set_id) {
        $.ajax({
            url: 'index.php?route=product/set/more',
            type: 'post',
            data: 'set_id=' + set_id,
            cache: false,
            dataType: 'json',
            beforeSend: function() {
                $('.button-set').button('loading');
            },
            complete: function() {
                $('.button-set').button('reset');
            },
            success: function(json) {
                $('.alert, .text-danger').remove();
                if (json['redirect']) {
                    location = json['redirect'];
                }
            },
        });
    },
    'checkout': function(set_id) {
        $.ajax({
            url: 'index.php?route=product/set/choice',
            type: 'post',
            data: 'set_id=' + set_id,
            dataType: 'json',
            beforeSend: function() {
                $('.button-set').button('loading');
            },
            complete: function() {
                $('.button-set').button('reset');
            },
            success: function(json) {
                $('.alert, .text-danger').remove();
                if (getCookie('_ed_checkout_form') == 'new' && typeof metric != "undefined" && typeof metric.var('customer_auth') != "undefined" && metric.var('customer_auth')) {
                    window.location = '/checkout';
                } else {
                    $('#checkout').modal('show');
                }
                $('#basketmodalbody').load('index.php?route=extension/module/ghost_cart/info');
            }
        });
    },
    'new_choice': function(set_id) {
        remove_products_or_not(set_id, 'set');
    },
    'add': function(set_id, del) {
        $.ajax({
            url: 'index.php?route=product/set/choice',
            type: 'post',
            data: {
                set_id: set_id,
                delete: del
            },
            dataType: 'json',
            beforeSend: function() {
                $('.button-set').button('loading');
            },
            complete: function() {
                $('.button-set').button('reset');
            },
            success: function(json) {
                $('.alert, .text-danger').remove();
                $.getJSON('index.php?route=checkout/cart/getCartTotal', function(json) {
                    $('.cart-top__total').html(json['total']);
                });
                $('#basketmodalbody').load('index.php?route=extension/module/ghost_cart/info');
                $().toastmessage('showToast', {
                    text: 'Товары добавлены в корзину покупок!',
                    stayTime: 3000,
                    type: 'success'
                });
                metric.notify('basket_add_set', set_id);
            }
        });
    },
};

function sort_product_icons(icon_id) {
    if ($('#content').hasClass('category') && icon_id > 0 && window.location.hash == '') {
        if (getURLVar('sort') != '') {
            document.location.search = 'sort=icon_' + icon_id + '&order=ASC';
        } else {
            let url = document.location.href + '?sort=icon_' + icon_id + '&order=ASC';
            document.location = url;
        }
    }
}

function remove_added(product_id, all) {
    if (all === undefined) {
        all = false;
    }
    $('.product' + product_id + ' .added.nomore').remove();
    if (all) {
        $('.product' + product_id + ' .added').remove();
        $('.product' + product_id + ' .image').removeClass('nohover');
        $('#product-img-id' + product_id).closest('.product-preview').removeClass('disabled');
    }
}

function update_added(product_id, quantity) {
    $('.product' + product_id + ' .added').remove();
    $('.product' + product_id + ' .image').addClass('nohover');
    if ($('#product-img-id' + product_id).closest('.product-preview').length > 0) {
        $('#product-img-id' + product_id).closest('.product-preview').addClass('disabled');
    }
    if (quantity > 0) {
        if ($('#product-img-id' + product_id + ' .added').length > 0) {
            $('#product-img-id' + product_id + ' .added .added_wrap').html('<div class="plusminus">' +
                '<div class="pull-left product-minus">' +
                '    <a onclick="cart.minus(' + product_id + ');"><i aria-hidden="true">–</i></a>' +
                '</div>' +
                '<div class="product-quantity">' +
                +quantity + '</div>' +
                '<div class="pull-right product-plus">' +
                '    <a onclick="cart.add(' + product_id + ', 1);"><i aria-hidden="true">+</i></a></div>' +
                '</div>' +
                '<div class="cart_on_card">в корзине</div>');
        } else {
            $('#product-img-id' + product_id).before('<div class="added"><div class="added_wrap_table"><div class="added_wrap"><div class="plusminus">' +
                '<div class="pull-left product-minus">' +
                '    <a onclick="cart.minus(' + product_id + ');"><i aria-hidden="true">–</i></a>' +
                '</div>' +
                '<div class="product-quantity">' +
                +quantity + '</div>' +
                '<div class="pull-right product-plus">' +
                '    <a onclick="cart.add(' + product_id + ', 1);"><i aria-hidden="true">+</i></a></div>' +
                '</div>' +
                '<div class="cart_on_card">в корзине</div>' +
                '</div></div></div>');
        }
    } else {
        timerid[product_id] = setTimeout(remove_added, 2500, product_id, true);
    }
}
var timerid = [];
var cart = {
    get_info: function(with_callback) {
        if (typeof with_callback !== 'undefined') {
            with_callback = 1;
        }
        $.ajax({
            url: 'index.php?route=extension/module/ghost_cart/info',
            type: 'post',
            cache: false,
            dataType: 'html',
            beforeSend: function() {
                $('#basketmodalbody').html('<div class="cart-saving">' +
                    '            <p class="text-center">' +
                    '            <img src="/catalog/view/theme/ghost-one/image/manufacturer/button_load.svg" alt="more"' +
                    '                class="manufacturers-page__preloader fa-spin"/>' +
                    '            </p>' +
                    '        </div>');
            },
            success: function(html) {
                $('#basketmodalbody').html(html);
                if (with_callback == 1) {
                    cart.get_order_list();
                }
            },
        });
    },
    clear: function() {
        $.ajax({
            url: 'index.php?route=checkout/cart/clear_cart',
            type: 'post',
            success: function() {
                $('.cart-top__total').html('');
                cart.get_info();
                $('.product-thumb .added').remove();
                $('.product-thumb .image').removeClass('nohover');
                $('.product-thumb .image').find('.product-preview').removeClass('disabled');
                metric_set_basket_products();
                setTimeout(function() {
                    metric.notify('basket_product_clear');
                }, 500);
                cart.get_order_list();
            },
        });
    },
    get_order_list: function() {
        $.ajax({
            url: 'index.php?route=checkout/cart/get_order_list',
            cache: false,
            dataType: 'json',
            success: function(json) {
                if (json['orders'] && json['modal_with_orders']) {
                    $('body').append(json['modal_with_orders']);
                    $('.cart .cart-sidebar__clear-wrapper').before('<div class="cart-sidebar__btn-add-to-order js-open-add-to-order-popup cart-sidebar__btn-add-to-order_mobile-bottom">' +
                        'Добавить <br class="hidden-xs hidden-sm"> в существующий заказ' +
                        '</div>');
                    $('.cart .cart-sidebar__total-box').addClass('cart-sidebar__total-box_mb-tablet');
                    $('.cart .cart-sidebar__total-box').addClass('cart-sidebar__total-box_pb-tablet-0');
                    $('.js-open-add-to-order-popup').click(function() {
                        $('.add-to-order-popup__close.js-close-add-to-order-popup').show();
                        $('.add-to-order-popup__close.js-close-add-to-order-popup-all').hide();
                        $('.add-to-order-popup').show()
                        setTimeout(function() {
                            $('.add-to-order-popup').addClass('in')
                        }, 100);
                    });
                    $('.js-add-add-to-order-popup').click(function() {
                        if ($('input[name="radio"]:checked').length == 0) {
                            $().toastmessage('showToast', {
                                text: 'Выберите заказ из списка',
                                type: 'error'
                            });
                            return;
                        }
                        $.ajax({
                            url: 'index.php?route=checkout/checkout_ajax/add_products_from_cart_to_order',
                            cache: false,
                            data: {
                                'order_id': $('input[name="radio"]:checked').val(),
                                'date_modified': $('input[name="radio"]:checked + input[name="date_modified"]').val(),
                            },
                            dataType: 'json',
                            type: 'get',
                            beforeSend: function() {
                                $('#cartModalAddToOrder .modal-content').append('<div class="order-saving">' +
                                    '            <p class="text-center">' +
                                    '            <img src="/catalog/view/theme/ghost-one/image/manufacturer/button_load.svg" alt="more"' +
                                    '                class="manufacturers-page__preloader fa-spin"/>' +
                                    '            </p>' +
                                    '        </div>');
                            },
                            success: function(result) {
                                if (result['error']) {
                                    $().toastmessage('showToast', {
                                        text: result['error'],
                                        type: 'error'
                                    });
                                    $('#cartModalAddToOrder .order-saving').remove();
                                } else if (result['success']) {
                                    $('#cartModalAddToOrder .order-saving').remove();
                                    $('.add-to-order-popup__close.js-close-add-to-order-popup').hide();
                                    $('.add-to-order-popup__close.js-close-add-to-order-popup-all').show();
                                    $('.add-to-order-popup__content').addClass('add-to-order-popup__content_out');
                                    $('.success-add-to-order-popup').addClass('success-add-to-order-popup_block');
                                    setTimeout(function() {
                                        $('.success-add-to-order-popup').addClass('success-add-to-order-popup_show');
                                    }, 100);
                                    cart.clear();
                                    $('#basketmodal').modal('hide');
                                }
                            },
                        });
                    });
                    $('.js-close-add-to-order-popup').click(function() {
                        setTimeout(function() {
                            $('.add-to-order-popup__content').removeClass('add-to-order-popup__content_out');
                            $('.success-add-to-order-popup').removeClass('success-add-to-order-popup_block');
                            $('.add-to-order-popup').removeClass('in');
                        }, 100);
                        setTimeout(function() {
                            $('.add-to-order-popup').hide();
                            $('.success-add-to-order-popup').removeClass('success-add-to-order-popup_show');
                        }, 200);
                    });
                    $('.js-close-add-to-order-popup-all').click(function() {
                        $('#cartModalAddToOrder').modal('hide');
                        $('#cartModalOrder').modal('hide');
                        setTimeout(function() {
                            $('.add-to-order-popup__content').removeClass('add-to-order-popup__content_out');
                            $('.success-add-to-order-popup').removeClass('success-add-to-order-popup_block');
                            $('.add-to-order-popup').removeClass('in');
                        }, 100);
                        setTimeout(function() {
                            $('.add-to-order-popup').hide();
                            $('.success-add-to-order-popup').removeClass('success-add-to-order-popup_show');
                        }, 200);
                    });
                    $('.js-radiobutton').click(function() {
                        $('.js-radiobutton').removeClass('add-to-order-popup__item_active');
                        $(this).addClass('add-to-order-popup__item_active');
                    });
                }
            }
        });
    },
    add: function(product_id, q) {
        if (!$('#product_id' + product_id).length && $('#basketmodalbody .cart_item').length >= Settings.Cart.MAX_PRODUCTS) {
            $().toastmessage('showToast', {
                text: 'Вы добавили в корзину максимальное количество позиций товаров. При необходимости вы можете оформить новый заказ или связаться с нашими менеджерами.',
                type: 'error'
            });
            return;
        }
        var quantity = 1;
        if (typeof q !== 'undefined') {
            quantity = q;
        } else if ($('input[name=\'quantity\']').val()) {
            quantity = $('input[name=\'quantity\']').val();
        }
        $.ajax({
            url: 'index.php?route=checkout/cart/add_new',
            type: 'post',
            cache: false,
            data: 'product_id=' + product_id + '&quantity=' + quantity,
            dataType: 'json',
            success: function(json) {
                clearTimeout(timerid[product_id]);
                if (json['redirect']) {
                    location = json['redirect'];
                }
                if (json['success']) {
                    if (json['add_in_order']) {
                        if (($('#product-preview').hasClass('in') && $('#product-preview-data .product' + product_id + ' .image').length == 0) || $('body').hasClass('account-order-info') || $('.need2cook').length) {
                            $().toastmessage('showToast', {
                                text: json['success'],
                                type: 'success'
                            });
                        }
                        update_added(json['product_id'], json['quantity']);
                        update_order_cart(json);
                    } else {
                        setTimeout(function() {
                            let cart_total = json['total'];
                            if (typeof json['new_total'] != 'undefined') {
                                cart_total = json['new_total'];
                            }
                            $('.cart-top__total').html(cart_total);
                        }, 100);
                        if (($('#product-preview').hasClass('in') && $('#product-preview-data .product' + product_id + ' .image').length == 0) || $('body').hasClass('account-order-info') || $('.need2cook').length) {
                            $().toastmessage('showToast', {
                                text: json['success'],
                                type: 'success'
                            });
                        }
                        update_added(json['product_id'], json['quantity']);
                        if (json['quantity'] == 1) {
                            metric.notify('basket_new_product_added');
                        }
                        update_cart(json, 'add');
                    }
                }
                if (json['error']) {
                    remove_added(product_id, true);
                    $('.product' + product_id + ' .image').addClass('nohover');
                    if ($('#product-img-id' + product_id).closest('.product-preview').length > 0) {
                        $('#product-img-id' + product_id).closest('.product-preview').addClass('disabled');
                    }
                    $('#product-img-id' + product_id).before('<div class="added nomore"><div class="added_wrap_table"><div class="added_wrap">К сожалению,<br/> этого товара<br/> больше нет!</div></div></div>');
                    timerid[product_id] = setTimeout(remove_added, 2500, product_id);
                    if (json['quantity'] > 0) {
                        timerid[product_id] = setTimeout(update_added, 2500, json['product_id'], json['quantity']);
                    }
                    if (($('#product-preview').hasClass('in') && $('#product-preview-data .product' + product_id + ' .image').length == 0) || $('body').hasClass('account-order-info') || $('#basketmodal').hasClass('in')) {
                        $().toastmessage('showToast', {
                            text: json['error'],
                            type: 'error'
                        });
                    }
                }
                if (json['error_cart_max_products']) {
                    $().toastmessage('showToast', {
                        text: json['error_cart_max_products'],
                        type: 'error'
                    });
                }
            },
        });
    },
    'minus': function(product_id) {
        $.ajax({
            url: 'index.php?route=checkout/cart/minus',
            type: 'post',
            data: 'product_id=' + product_id + '&quantity=' + (typeof(quantity) != 'undefined' ? quantity : 1),
            dataType: 'json',
            cache: false,
            success: function(json) {
                if (json['redirect']) {
                    location = json['redirect'];
                }
                if (json['success']) {
                    update_added(json['product_id'], json['quantity']);
                    if (json['add_in_order']) {
                        update_order_cart(json);
                    } else {
                        setTimeout(function() {
                            let cart_total = json['total'];
                            if (typeof json['new_total'] != 'undefined') {
                                cart_total = json['new_total'];
                            }
                            $('.cart-top__total').html(cart_total);
                        }, 100);
                        update_cart(json, 'minus');
                    }
                }
            }
        });
    },
    'remove': function(product_id) {
        $('.cart-item__remove').removeClass('touchcancel');
        $.ajax({
            url: 'index.php?route=checkout/cart/remove',
            type: 'post',
            cache: false,
            data: 'product_id=' + product_id,
            dataType: 'json',
            success: function(json) {
                if (json['add_in_order']) {
                    update_order_cart(json);
                } else {
                    metric_set_basket_products();
                    setTimeout(function() {
                        let cart_total = json['total'];
                        if (typeof json['new_total'] != 'undefined') {
                            cart_total = json['new_total'];
                        }
                        $('.cart-top__total').html(cart_total);
                    }, 100);
                    update_cart(json, 'remove');
                }
                timerid[product_id] = setTimeout(remove_added, 100, product_id, true);
                $('.cart-item__remove').addClass('touchcancel');
            }
        });
    }
};
var product = {
    'preview': function(product_id) {
        $('#product-preview-data').html($('#checkout-preview-default').html());
        $('#product-preview-data').load('index.php?route=product/product/preview&product_id=' + product_id);
        $('#product-preview').modal('show');
        window.location.hash = 'productid=' + product_id;
    },
    'preview_mini': function(product_id) {
        $('#product-preview').modal('show');
        $('#product-preview-data').html($('#checkout-preview-default').html());
        $('#product-preview-data').load('index.php?route=product/product/preview&hide_price=0&product_id=' + product_id);
        window.location.hash = 'productid=' + product_id;
    },
    'preview_special': function(product_id) {
        var promo = $('#promo_button').data('promo');
        $('#product-preview').modal('show');
        $('#product-preview-data').html($('#checkout-preview-default').html());
        $('#product-preview-data').load('index.php?route=product/product/preview&special=true&product_id=' + product_id + '&promo=' + promo);
        window.location.hash = 'productid=' + product_id;
    }
};
var wishlist = {
    'add': function(product_id) {
        $.ajax({
            url: 'index.php?route=account/wishlist/addornot',
            type: 'post',
            data: 'product_id=' + product_id,
            dataType: 'json',
            success: function(json) {
                $('.alert').remove();
                if (json['redirect']) {
                    location = json['redirect'];
                }
                if (json['success']) {
                    if (json['addWishlist']) {
                        update_wishlist(product_id);
                        metric.notify('add_to_wishlist', {
                            product_id: product_id
                        });
                    }
                    if (json['deleteWishlist']) {
                        update_wishlist(product_id, true);
                        metric.notify('remove_from_wishlist');
                    }
                }
                if (json['error']) {
                    metric.notify('try_to_wishlist', {
                        product_id: product_id
                    });
                    $().toastmessage('showToast', {
                        text: json['error'],
                        stayTime: 6000,
                        type: 'success'
                    });
                    showAuth();
                }
                $('#wishlist-total span').html(json['total']);
                $('#wishlist-total').attr('title', json['total']);
            }
        });
    },
    'remove': function(product_id) {
        $.ajax({
            url: 'index.php?route=account/wishlist/remove',
            type: 'post',
            data: 'product_id=' + product_id,
            dataType: 'json',
            success: function(json) {
                $('.alert').remove();
                if (json['redirect']) {
                    location = json['redirect'];
                }
                if (json['success']) {
                    $('#wishlist_' + product_id).fadeOut('normal', function() {
                        $(this).remove();
                    });
                }
            }
        });
    }
};
let product_alert = {
    'add': function(product_id) {
        $.ajax({
            url: 'index.php?route=account/product_alert/addornot',
            type: 'post',
            data: 'product_id=' + product_id,
            dataType: 'json',
            success: function(json) {
                $('.alert').remove();
                if (json['redirect']) {
                    location = json['redirect'];
                }
                if (json['success']) {
                    if ($('#product-preview-data').length || $('#product-preview').hasClass('in') || $('body').hasClass('account-order-info') || $('.need2cook').length) {
                        $().toastmessage('showToast', {
                            text: json['success'],
                            stayTime: 6000,
                            type: 'success'
                        });
                    }
                    metric.notify('view_out_product', {
                        product_id: product_id,
                    });
                    $('.product' + json['product_id'] + ' .added').remove();
                    $('.product' + json['product_id'] + ' .image').addClass('nohover');
                    $('#product-img-id' + json['product_id']).before('<div class="added"><div class="added_wrap_table"><div class="added_wrap">Уведомление о поступлении товара добавлено! <br />&nbsp;<i class="fa fa-envelope"></i></div></div></div>');
                    timerid[product_id] = setTimeout(remove_added, 2500, product_id, true);
                }
                if (json['error']) {
                    $().toastmessage('showToast', {
                        text: json['error'],
                        stayTime: 6000,
                        type: 'success'
                    });
                    showAuth();
                }
            }
        });
    },
    'remove': function(product_id) {
        $.ajax({
            url: 'index.php?route=account/product_alert/remove',
            type: 'post',
            data: 'product_id=' + product_id,
            dataType: 'json',
            success: function(json) {
                $('.alert').remove();
                if (json['redirect']) {
                    location = json['redirect'];
                }
                if (json['success']) {
                    metric.notify('unsub_out_product', {
                        product_id: product_id,
                    });
                    $('.product-alert_' + product_id).fadeOut('normal', function() {
                        $(this).remove();
                    });
                    $().toastmessage('showToast', {
                        text: json['success'],
                        stayTime: 3000,
                        type: 'success'
                    });
                }
            }
        });
    }
};

function update_order_cart(json) {
    $('.add-in-order__count-products').text(json['count'] + ' шт');
    $('.add-in-order__total-sum').html(json['total']);
}

function update_cart(json, action) {
    if (json['quantity'] == false) {
        $('#basketmodal #product_id' + json['product_id'] + '').fadeOut(500, function() {
            $(this).remove();
            setTimeout(function() {
                metric_set_basket_products();
            }, 200);
            setTimeout(function() {
                metric.notify('basket_product_removed', {
                    product_id: json['product_id'],
                });
            }, 500);
        });
    }
    if (action == 'add') {
        if (json['full']) {
            if (json['count'] >= 1) {
                cart.get_info(1);
            } else {
                $('#basketmodal .cart__items-wrapper').append(json['full']);
            }
        }
        setTimeout(function() {
            metric_set_basket_products();
        }, 200);
        setTimeout(function() {
            metric.notify('basket_product_added', {
                product_id: json['product_id'],
                name: json['product_name'],
                price: parseInt(json['price']),
                img: json['img'],
                url: json['url']
            });
        }, 500);
    }
    if ((action == 'minus' || action == 'remove')) {
        cart.get_info();
    }
    if (action == 'minus' && json['quantity'] != false) {
        setTimeout(function() {
            metric_set_basket_products();
        }, 200);
        setTimeout(function() {
            metric.notify('basket_product_minus', {
                product_id: json['product_id'],
            });
        }, 500);
    }
    var cart_total = json['total'] ? json['total'].replace(/[^\d]/g, '') : 0;
    var cart_new_total = cart_total;
    if (typeof json['new_total'] != 'undefined') {
        cart_new_total = json['new_total'].replace(/[^\d]/g, '');
    }
    if ((parseInt(cart_total) > parseInt(cart_new_total) && parseInt(cart_new_total) != 0)) {
        let total_modal_text = '<span class="price-old">' + json['total_text'] + '</span>' +
            '&nbsp;<span class="price-container__value price-container__value-red">' + json['new_total_text'] + '</span>';
        $('#basketmodal #cart_sub_total').html(total_modal_text);
        $('#basketmodal .total_text, #basketmodal .cart_total').html(json['new_total_text']);
    } else {
        var total_modal_text = '<span class="cart_total">' + json['total_text'] + '</span>';
        $('#basketmodal #cart_sub_total').html(total_modal_text);
        $('#basketmodal .total_text, #basketmodal .cart_total').html(json['total_text']);
    }
    if (json['cart_bun'] == '' || json['cart_bun'] == undefined) {
        $('#basketmodal .cart__notice').remove();
        $('#basketmodal .cart_bun').remove();
    } else {
        $('#basketmodal .cart_bun').html(json['cart_bun']);
    }
    if (typeof(json['weight']) != 'undefined' && json['weight'] != null) {
        $('#basketmodal .weight_total span').html(json['weight']);
    }
    if (typeof(json['count']) != 'undefined' && json['count'] != null) {
        $('#basketmodal .cart-count').html(json['count']);
    }
    var min_price = 1500;
    if (typeof(json['min_price']) != 'undefined' && json['min_price'] != null) {
        min_price = parseInt(json['min_price']);
    }
    if (parseInt(json['total']) >= min_price) {
        $('#basketmodal .btn-js-checkout').removeClass('cart-sidebar__btn-checkout_disabled');
        if (getCookie('_ed_checkout_form') == 'new' && typeof metric != "undefined" && typeof metric.var('customer_auth') != "undefined" && metric.var('customer_auth')) {
            $('#basketmodal .btn-js-checkout').attr('onclick', 'window.location = \'/checkout\';');
        } else {
            $('#basketmodal .btn-js-checkout').attr('data-target', '#checkout');
        }
        if (json['bonus2get']) {
            $('#basketmodal .cart-sidebar__span-text').html('Начислится <span class="orange-color"><span class="bonus_total">' +
                json['bonus2get'] + '</span></span>');
        } else {
            $('#basketmodal .cart-sidebar__span-text').empty();
        }
    } else {
        $('#basketmodal .btn-js-checkout').addClass('cart-sidebar__btn-checkout_disabled');
        $('#basketmodal .btn-js-checkout').removeAttr('data-target');
        $('#basketmodal .btn-js-checkout').removeAttr('onclick');
        $('#basketmodal .cart-sidebar__span-text').html('Минимальная сумма заказа ' +
            min_price + ' <span class="CurrencyIcon CurrencyIcon--rub"></span>');
        if ($('#basketmodal .cart_bun').length == 0) {
            $('#basketmodal .cart__notice-content').append('<div class="cart__notice-text cart_bun">' +
                'Минимальная сумма заказа <span class="bold inl">' +
                min_price +
                ' <span class="CurrencyIcon CurrencyIcon--rub"></span></span>' +
                +'</div>');
        } else if ($('#basketmodal .cart_bun').length == 1) {
            $('#basketmodal .cart_bun').html('Минимальная сумма заказа <span class="bold inl">' +
                min_price +
                ' <span class="CurrencyIcon CurrencyIcon--rub"></span></span>');
        }
        if ($('#basketmodal .cart__notice').length == 0) {
            $('#basketmodal .cart__notice-wrapper').append('<div class="cart__notice">' +
                '                <div class="cart__notice-content">' +
                '                    <div class="cart__notice-text cart_bun">' +
                '                        Минимальная сумма заказа <span class="bold inl">' +
                min_price + ' <span class="CurrencyIcon CurrencyIcon--rub"></span></span>' +
                '                    </div>' +
                '                </div>' +
                '            </div>');
        }
    }
    if (json['quantity'] != false && !json['full']) {
        $('#basketmodal #product_id' + json['product_id'] + ' span.product_total ').html(json['product_total']);
        $('#basketmodal #product_id' + json['product_id'] + ' .product-quantity').html(json['quantity']);
        if (json['quantity'] > 1) {
            $('#basketmodal #product_id' + json['product_id'] + ' .product-minus').addClass('cart-item__counter-btn_minus');
            $('#basketmodal #product_id' + json['product_id'] + ' .product-minus').removeClass('cart-item__counter-btn_remove');
        } else {
            $('#basketmodal #product_id' + json['product_id'] + ' .product-minus').addClass('cart-item__counter-btn_remove');
            $('#basketmodal #product_id' + json['product_id'] + ' .product-minus').removeClass('cart-item__counter-btn_minus');
        }
    }
}
$(document).delegate('.agree', 'click', function(e) {
    e.preventDefault();
    $('#modal-agree').remove();
    var element = this;
    $.ajax({
        url: $(element).attr('href'),
        type: 'get',
        dataType: 'html',
        success: function(data) {
            html = '<div id="modal-agree" class="modal">';
            html += '  <div class="modal-dialog">';
            html += '    <div class="modal-content">';
            html += '      <div class="modal-header">';
            html += '        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>';
            html += '        <b class="modal-title text-center" style="display: block;">Оферта</b>';
            html += '      </div>';
            html += '      <div class="modal-body">' + data + '</div>';
            html += '    </div';
            html += '  </div>';
            html += '</div>';
            $('body').append(html);
            $('#modal-agree').modal('show');
        }
    });
});
$(document).delegate('.product_return, .oferta_modal, .policy_modal', 'click', function(e) {
    e.preventDefault();
    let modal_class = 'product_return';
    if ($(this).hasClass('oferta_modal')) {
        modal_class = 'oferta_modal';
    } else if ($(this).hasClass('policy_modal')) {
        modal_class = 'policy_modal';
    }
    $('#modal-' + modal_class).remove();
    let element = this;
    $.ajax({
        url: $(element).attr('href'),
        type: 'get',
        dataType: 'html',
        success: function(data) {
            html = '<div id="modal-' + modal_class + '" class="modal modal__unscrolled modal__unscrolled-over">';
            html += '  <div class="modal-dialog">';
            html += '    <div class="modal-content">';
            html += '      <div class="modal-header">';
            html += '        <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true"></span></button>';
            html += '      </div>';
            html += '      <div class="modal-body">' + data + '</div>';
            html += '    </div>';
            html += '  </div>';
            html += '</div>';
            $('body').append(html);
            $('#modal-' + modal_class).on({
                'shown.bs.modal': function(e) {
                    window.location.hash = "modal-" + modal_class + '=open';
                },
                'hidden.bs.modal': function(e) {
                    if ($('body').find('.modal.in').length > 0) $('body').addClass('modal-open');
                    window.history.back();
                }
            });
            $('#modal-' + modal_class).modal('show');
        }
    });
});

function cancel_order(order_id, shipping_date_id) {
    if (!order_id || !shipping_date_id) {
        return false;
    }
    $.ajax({
        url: 'index.php?route=account/order/cancel&order_id=' + order_id + '&shipping_date_id=' + shipping_date_id,
        type: 'get',
        dataType: 'json',
        success: function(json) {
            if (json['error']) {
                $().toastmessage('showErrorToast', json['error']);
            } else if (json['success']) {
                $().toastmessage('showSuccessToast', json['success']);
                setTimeout(function() {
                    location.reload();
                }, 1000);
            }
        }
    });
}

function delete_address(address_id) {
    if (!address_id) return false;
    $.ajax({
        url: 'index.php?route=account/address/deleteAddressAjax&address_id=' + address_id,
        type: 'get',
        dataType: 'json',
        success: function(json) {
            if (json.error) $().toastmessage('showErrorToast', json.error);
            if (json.success) {
                $().toastmessage('showSuccessToast', json.success);
                setTimeout(function() {
                    location.reload();
                }, 1000);
            }
        }
    });
}

function getCookie(cname) {
    var name = cname + '=';
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return '';
}

function isPhonevValid(phone) {
    if (phone.length < 11) return false;
    phone = parseInt(phone.substr(1, 3));
    var codes = [301, 302, 336, 341, 342, 343, 345, 346, 347, 349, 351, 352, 353, 365, 381, 382, 383, 384, 385, 388, 390, 391, 394, 395, 401, 411, 413, 415, 416, 421, 423, 424, 426, 427, 471, 472, 473, 474, 475, 481, 482, 483, 484, 485, 486, 487, 491, 492, 493, 494, 495, 496, 498, 499, 800, 801, 802, 803, 804, 805, 806, 807, 808, 809, 811, 812, 813, 814, 815, 816, 817, 818, 820, 821, 831, 833, 834, 835, 836, 841, 842, 843, 844, 845, 846, 847, 848, 851, 855, 861, 862, 863, 865, 866, 867, 869, 871, 872, 873, 877, 878, 879, 900, 901, 902, 903, 904, 905, 906, 908, 909, 910, 911, 912, 913, 914, 915, 916, 917, 918, 919, 920, 921, 922, 923, 924, 925, 926, 927, 928, 929, 930, 931, 932, 933, 934, 936, 937, 938, 939, 941, 950, 951, 952, 953, 954, 955, 956, 958, 960, 961, 962, 963, 964, 965, 966, 967, 968, 969, 970, 971, 977, 978, 980, 981, 982, 983, 984, 985, 986, 987, 988, 989, 991, 992, 993, 994, 995, 996, 997, 999];
    if ($.inArray(phone, codes) != -1)
        return true;
    else
        return false;
}

function validateEmail(email) {
    let pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return pattern.test(String(email).toLowerCase());
}

function checkAddressForm(address, token) {
    $('#form_shipping_city').val('');
    $('#form_shipping_street').val('');
    $('#form_shipping_numhouse').val('');
    if (!address || !token) return;
    $.ajax({
        type: 'POST',
        async: false,
        url: '/index.php?route=api/googlemap/getAddress',
        data: {
            token: token,
            address: address
        },
        cache: false,
        dataType: 'json',
        success: function(json) {
            $('#modal-edit-address div.has-error').removeClass('has-error');
            $('div.text-danger').remove();
            if (json.correct) {
                $('#form_shipping_city').val(json.city);
                $('#form_shipping_street').val(json.street_name);
                $('#form_shipping_numhouse').val(json.street_number);
            } else {
                $('#modal-edit-address #full_address').after('<div class="text-danger">Не смогли определить адрес, попробуйте <a onclick="addAddressManual();">заполнить адрес вручную</a>, и оператор свяжется с Вами для уточнения.</div>');
                $('#modal-edit-address #full_address').parent().addClass('has-error');
            }
        }
    });
}

function addAddressManual() {
    $('#modal-edit-address').modal('hide').delay(800);
    $('.modal-backdrop').hide();
    $('.modal-backdrop').first().show();
    $.ajax({
        url: 'index.php?route=account/address/addAddress',
        data: {
            manual: '1'
        },
        type: 'POST',
        cache: false,
        dataType: 'html',
        beforeSend: function() {
            $('#modal-edit-address').remove();
        },
        success: function(data) {
            $('body').append(data);
            $('#modal-edit-address').modal('show');
        }
    });
}

function checkTextWords(text, words) {
    words = words ? words : 3;
    let textPattern = '';
    for (let i = 0; i < words; i++) {
        if (i > 0) textPattern += '\\s+';
        textPattern += '([\\S]+)';
    }
    textPattern = new RegExp(textPattern, 'g');
    return textPattern.test(text);
}
(function($) {
    $.fn.autocomplete = function(option) {
        return this.each(function() {
            this.timer = null;
            this.items = [];
            $.extend(this, option);
            $(this).attr('autocomplete', 'off');
            $(this).on('focus', function() {
                this.request();
            });
            $(this).on('blur', function() {
                setTimeout(function(object) {
                    object.hide();
                }, 200, this);
            });
            $(this).on('keydown', function(event) {
                switch (event.keyCode) {
                    case 27:
                        this.hide();
                        break;
                    default:
                        this.request();
                        break;
                }
            });
            this.click = function(event) {
                event.preventDefault();
                value = $(event.target).parent().attr('data-value');
                if (value && this.items[value]) {
                    this.select(this.items[value]);
                }
            };
            this.show = function() {
                var pos = $(this).position();
                $(this).siblings('ul.dropdown-menu').css({
                    top: pos.top + $(this).outerHeight(),
                    left: pos.left
                });
                $(this).siblings('ul.dropdown-menu').show();
            };
            this.hide = function() {
                $(this).siblings('ul.dropdown-menu').hide();
            };
            this.request = function() {
                clearTimeout(this.timer);
                this.timer = setTimeout(function(object) {
                    object.source($(object).val(), $.proxy(object.response, object));
                }, 200, this);
            };
            this.response = function(json) {
                html = '';
                if (json.length) {
                    for (i = 0; i < json.length; i++) {
                        this.items[json[i]['value']] = json[i];
                    }
                    for (i = 0; i < json.length; i++) {
                        if (!json[i]['category']) {
                            html += '<li data-value="' + json[i]['value'] + '"><a href="#">' + json[i]['label'] + '</a></li>';
                        }
                    }
                    var category = [];
                    for (i = 0; i < json.length; i++) {
                        if (json[i]['category']) {
                            if (!category[json[i]['category']]) {
                                category[json[i]['category']] = [];
                                category[json[i]['category']]['name'] = json[i]['category'];
                                category[json[i]['category']]['item'] = [];
                            }
                            category[json[i]['category']]['item'].push(json[i]);
                        }
                    }
                    for (i in category) {
                        html += '<li class="dropdown-header">' + category[i]['name'] + '</li>';
                        for (j = 0; j < category[i]['item'].length; j++) {
                            html += '<li data-value="' + category[i]['item'][j]['value'] + '"><a href="#">&nbsp;&nbsp;&nbsp;' + category[i]['item'][j]['label'] + '</a></li>';
                        }
                    }
                }
                if (html) {
                    this.show();
                } else {
                    this.hide();
                }
                $(this).siblings('ul.dropdown-menu').html(html);
            };
            $(this).after('<ul class="dropdown-menu autocomplete"></ul>');
            $(this).siblings('ul.dropdown-menu').delegate('a', 'click', $.proxy(this.click, this));
        });
    };
})(window.jQuery);