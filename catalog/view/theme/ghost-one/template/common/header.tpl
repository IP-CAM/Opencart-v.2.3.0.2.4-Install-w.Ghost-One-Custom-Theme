<!DOCTYPE html>
<!--[if IE]><![endif]-->
<!--[if IE 8 ]>
<html dir="<?php echo $direction; ?>" lang="<?php echo $lang; ?>" class="ie8"><![endif]-->
<!--[if IE 9 ]>
<html dir="<?php echo $direction; ?>" lang="<?php echo $lang; ?>" class="ie9"><![endif]-->
<!--[if (gt IE 9)|!(IE)]><!-->
<html dir="<?php echo $direction; ?>" lang="<?php echo $lang; ?>">
<!--<![endif]-->
<head>
    <meta charset="UTF-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title><?php echo $title;  ?></title>
    <base href="<?php echo $base; ?>"/>
    <?php if ($description) { ?>
    <meta name="description" content="<?php echo $description; ?>"/>
    <?php } ?>
    <?php if ($keywords) { ?>
    <meta name="keywords" content="<?php echo $keywords; ?>"/>
    <?php } ?>
    <meta property="og:title" content="<?php echo $title; ?>"/>
    <meta property="og:type" content="website"/>
    <meta property="og:url" content="<?php echo $og_url; ?>"/>
    <?php if ($og_image) { ?>
    <meta property="og:image" content="<?php echo $og_image; ?>"/>
    <?php } else { ?>
    <meta property="og:image" content="<?php echo $logo; ?>"/>
    <?php } ?>
    <meta property="og:site_name" content="<?php echo $name; ?>"/>
    <link href="catalog/view/javascript/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css"/>
    <link href="//fonts.googleapis.com/css?family=Open+Sans:400,400i,300,700" rel="stylesheet" type="text/css"/>
    <link href="catalog/view/theme/default/stylesheet/stylesheet.css" rel="stylesheet">
    <?php foreach ($styles as $style) { ?>
    <link href="<?php echo $style['href']; ?>" type="text/css" rel="<?php echo $style['rel']; ?>"
          media="<?php echo $style['media']; ?>"/>
    <?php } ?>
    <?php foreach ($links as $link) { ?>
    <link href="<?php echo $link['href']; ?>" rel="<?php echo $link['rel']; ?>"/>
    <?php } ?>
    <?php foreach ($analytics as $analytic) { ?>
    <?php echo $analytic; ?>
    <?php } ?>

    <link rel="preload" as="font" href="catalog/view/theme/ghost-one/assets/fonts/RobotoSlab-700.woff2"
          type="font/woff2" crossorigin="anonymous"/>
    <link rel="preload" as="font" href="catalog/view/theme/ghost-one/assets/fonts/RobotoSlab-400.woff2"
          type="font/woff2" crossorigin="anonymous"/>
    <link rel="preload" as="font"
          href="catalog/view/theme/ghost-one/assets/fonts/MuseoSansCyrl-700.woff" type="font/woff2"
          crossorigin="anonymous"/>
    <link rel="preload" as="font"
          href="catalog/view/theme/ghost-one/assets/fonts/MuseoSansCyrl-500.woff" type="font/woff2"
          crossorigin="anonymous"/>
    <link rel="preload" as="font"
          href="catalog/view/theme/ghost-one/assets/fonts/MuseoSansCyrl-300.woff" type="font/woff2"
          crossorigin="anonymous"/>
    <link rel="preload" as="font"
          href="catalog/view/theme/ghost-one/assets/fonts/currency-icons-bold.woff2" type="font/woff2"
          crossorigin="anonymous"/>
    <link rel="preload" as="font"
          href="catalog/view/theme/ghost-one/assets/fonts/fa-solid-900.woff2"
          type="font/woff2" crossorigin="anonymous"/>
    <link rel="preload" as="font"
          href="catalog/view/theme/ghost-one/assets/fonts/fa-regular-400.woff2"
          type="font/woff2" crossorigin="anonymous"/>
    <link rel="preload" as="style" href="catalog/view/javascript/owl-carousel/owl.carousel.min.css">
    <link rel="preload" as="style" href="catalog/view/javascript/owl-carousel/owl.theme.default.min.css">
    <link rel="preload" as="style"
          href="catalog/view/theme/ghost-one/stylesheet/subscribe_popup.min.css">
    <link rel="preload" as="style"
          href="catalog/view/theme/ghost-one/stylesheet/preloaders.min.css">
    <link rel="preload" as="style"
          href="catalog/view/theme/ghost-one/stylesheet/stylesheet.min.css">
    <link rel="preload" as="style"
          href="catalog/view/theme/ghost-one/assets/fonts/font-awesome/css/all.min.css">
    <link rel="preload" as="style" href="catalog/view/javascript/jquery/pushy/pushy.css">
    <link href="catalog/view/javascript/owl-carousel/owl.carousel.min.css" type="text/css" rel="stylesheet"
          media="screen"/>
    <link href="catalog/view/javascript/owl-carousel/owl.theme.default.min.css" type="text/css" rel="stylesheet"
          media="screen"/>
    <link href="catalog/view/theme/ghost-one/stylesheet/subscribe_popup.min.css"
          type="text/css" rel="stylesheet" media="screen"/>
    <link href="catalog/view/javascript/jquery/owl-carousel/owl.carousel.css" type="text/css" rel="stylesheet"
          media="screen"/>
    <link href="catalog/view/javascript/jquery/owl-carousel/owl.transitions.css" type="text/css"
          rel="stylesheet" media="screen"/>
    <link href="catalog/view/javascript/bootstrap/css/bootstrap.min.css" type="text/css" rel="stylesheet"
          media="screen"/>
    <link href="catalog/view/theme/ghost-one/stylesheet/preloaders.min.css"
          type="text/css" rel="stylesheet" media="screen"/>
    <link href="catalog/view/theme/ghost-one/stylesheet/stylesheet.min.css"
          type="text/css" rel="stylesheet" media="screen"/>
    <link href="catalog/view/theme/ghost-one/assets/fonts/font-awesome/css/all.min.css" type="text/css"
          rel="stylesheet" media="screen"/>
    <link href="catalog/view/javascript/jquery/pushy/pushy.css" type="text/css" rel="stylesheet"
          media="screen"/>
    <link href="catalog/view/theme/ghost-one/stylesheet/style.css" type="text/css" rel="stylesheet"
          media="screen"/>
    <link href="catalog/view/theme/ghost-one/stylesheet/mainpage.min.css"
          type="text/css" rel="stylesheet" media="screen"/>

    <link href="catalog/view/theme/ghost-one/stylesheet/product-card.css" type="text/css"
          rel="stylesheet" media="screen"/>

    <link href="catalog/view/theme/ghost-one/stylesheet/main.min.css" type="text/css"
          rel="stylesheet" media="screen"/>
    <link href="catalog/view/theme/ghost-one/stylesheet/set.min.css" type="text/css"
          rel="stylesheet" media="screen"/>

    <script src="catalog/view/theme/ghost-one/js/jslog.js" async></script>
    <script src="catalog/view/theme/ghost-one/js/polyfill.js" async defer></script>
    <script src="catalog/view/theme/ghost-one/js/jquery.min.js"></script>
    <script src="catalog/view/theme/ghost-one/js/modernizr-touch.js" defer></script>
    <script src="catalog/view/theme/ghost-one/js/owl-carousel/owl.carousel.min.js" defer></script>
    <script src="catalog/view/theme/ghost-one/js/lazyload.js" defer></script>
    <script src="catalog/view/theme/ghost-one/js/slick/slick.min.js" defer></script>
    <script src="catalog/view/theme/ghost-one/js/jquery/toastmessage/javascript/jquery.toastmessage.js" defer></script>
    <script src="catalog/view/theme/ghost-one/js/jquery/pushy/pushy.js" defer></script>
    <script src="catalog/view/theme/ghost-one/js/jquery/jquery.cookie.min.js" defer></script>
    <script src="catalog/view/theme/ghost-one/js/bootstrap/js/bootstrap.min.js" defer></script>
    <script src="catalog/view/theme/ghost-one/js/jquery.mask.js" defer></script>
    <script src="catalog/view/theme/ghost-one/js/common.js" defer></script>
    <script src="catalog/view/theme/ghost-one/js/main.min.js" defer></script>
    <script type="text/javascript">
        var preloaders = [
            'catalog/view/theme/default/image/preload_banner.svg',
            'catalog/view/theme/default/image/preload_product.svg',
            'catalog/view/theme/default/image/preload_product2.svg'
        ];
        if (typeof preloadImages === "function") preloadImages(preloaders);
    </script>

    <script>
        window.metric = {

            // массив подписчиков на события
            // {eventName: [object1, object2, ...], eventName2: [...], ...}
            _listeners: [],

            // разрешённые события
            _events: [],

            // регистрация данных
            _registry: [],

            _allowed_var: [],

            // состояния debug отвечает за вывод логов в console
            debug: false,

            _timeStart: new Date(),

            _getCurrentTime: function () {
                return new Date().getTime()
            },

            log: function (message) { // упростим вывод логов
                if (!this.debug) {
                    return
                }

                let time = ((this._getCurrentTime() - this._timeStart.getTime()) / 1000)
                    .toString()

                while (time.length < 6) {
                    time = time + '0';
                }

                console.log('[Metric] - ' + time.slice(0, 5) + 'мс - ' + message)
            },

            set vars(vars) {
                if (!this._allowed_var.length) {
                    this._allowed_var = vars  // Список разрешённых событий можно задать только один раз!
                } else if (vars) {
                    this.log('[Ошибка] Список переменных можно задать только один раз!');
                }
            },

            get vars() {
                return this._allowed_var;
            },

            var: function (name, entry) {

                if (!name) {
                    this.log('[Ошибка] Имя переменной не может быть пустым!')
                }

                if (this._allowed_var.indexOf(name) === -1) {
                    this.log('[Ошибка] Нельзя работать с переменной: ' + name + ' если она не разрешена!');
                    return
                }

                if (!entry) { // если нет значения, значить мы его запрашиваем
                    if (!this._registry.hasOwnProperty(name)) {
                        this.log('[Предупреждение] Переменная ' + name + ' пуста!', true);
                        return false
                    }
                    return this._registry[name]
                }

                this._registry[name] = entry;

                if (Array.isArray(entry)) {
                    entry.toString = function dogToString() {
                        return 'массив из ' + entry.length + ' элементов';
                    }
                }

                this.log('Обновил переменную: ' + name + ' = ' + entry.toString());

                return self
            },

            // список разрешенных событий берется из админ панели и только оттуда!!
            set events(events) {
                if (!this._events.length) {
                    this._events = events  // Список разрешённых событий можно задать только один раз!
                } else if (events) {
                    this.log('[Ошибка] Список разрешённых событий можно задать только один раз');
                }
            },

            get events() {
                return this._events;
            },

            // подписка на событие
            on: function (event, callback, name) {
                if (this._events.indexOf(event) === -1) {
                    this.log('[Ошибка] Нельзя подписаться на событие: ' + event + ' если оно не разрешено!');
                    return
                }

                if (this._listeners[event] === undefined) {
                    this._listeners[event] = {};
                    this._listeners[event].data = []
                }
                this._listeners[event].data.push({
                    name: name,
                    callback: callback
                });

                this.log('[' + name + ']' + ' подписался на событие: ' + event)
            },

            // отписка от события
            off: function (event, callback) {
                this._listeners[event].data = this._listeners[event].data.filter(function (listener) {
                    return listener !== callback
                })
            },

            // Отправка уведомлений о наступления события подписчикам.
            notify: function (event, data, delay) {

                delay = delay || 0

                if (this._events.indexOf(event) === -1) {
                    this.log('[Ошибка] Событие: ' + event + ' не разрешено, поэтому оповещение не разослано!')
                    return
                }

                if (0 < delay) {
                    this.log('!!! - Зарегистрировано событие: ' + event + (0 < delay ? ' c задержкой ' + delay + ' мс.' : ''))
                }

                setTimeout(function () {

                    // проверить тоже придётся отложенное
                    if (this._listeners[event] === undefined || this._listeners[event].data === undefined) {
                        this.log('[Ошибка] У события: ' + event + ' нет подписчитков!')
                        return
                    }
                    this.log('!!! - Сработало событие: ' + event)

                    this._listeners[event].data.forEach(function (cur_metric) {
                        try {
                            cur_metric.callback(data)
                            this.log('[' + cur_metric.name + '] сработало событие: ' + event)
                        } catch (error) {
                            this.log('[Ошибка] [' + cur_metric.name + '] в событии: ' + event + ' ошибка: ' + error)
                        }
                    }.bind(this))

                }.bind(this), delay)
            },
        };
        /* for example metric.on(event, function () { // action }, name ) */
    </script>
    <script>
        metric.events = ["view_page_purchase", "view_page_home", "view_page_category", "preview_product", "view_basket", "view_page_category_meatless", "view_checkout_form", "basket_product_added", "authorization", "subscribe_from_product", "subscribe_from_footer", "subscribe_from_direct_popup", "registration", "basket_product_removed", "view_page_search", "update_client_phone", "update_client_email", "update_client_name", "view_authorization_form", "click_checkout", "click_send_sms_code", "subscribe_from_popup_leave", "purchase_order_created", "basket_new_product_added", "basket_add_set", "browser_is_old_notice", "add_to_wishlist", "try_to_wishlist", "view_out_product", "basket_product_minus", "basket_product_clear", "remove_from_wishlist", "unsub_out_product"];
        metric.vars = ["purchase_order_id", "customer_email", "purchase_products", "purchase_order_info", "customer_is_new", "category_products", "preview_product_id", "preview_product_price", "category_name", "preview_product_name", "customer_phone", "customer_id", "customer_type", "customer_name", "preview_product_img", "preview_product_url", "basket_products", "page_search_products", "page_search_query", "basket_products_total", "customer_auth", "category_id", "customer_order_form", "take_part_ab"];
        metric.var("customer_type", "new");
    </script>

    <script>
        var Customer = {
            id: 0,
            username: '',
            email: ''
        };
        var Settings = {
            Cart: {
                MAX_PRODUCTS: 100
            }
        };
    </script>

</head>


<body class="<?php echo $class; ?>">

<div class="container-fluid hidden-lg hidden-md hidden-sm" style="padding: 0;">
    <div id="menu-fixed">
        <div id="menu-mobile" class="menu-mobile-wrap container">
            <div class="row">
                <div class="col-xs-6" id="menu-logo">
                    <div id="logo">
                        <a href="#">
                            <img src="catalog/view/theme/ghost-one/image/logo/eshderevenskoe.svg"
                                 title="Ешь Деревенское" alt="Ешь Деревенское" class="">
                        </a>
                    </div>
                </div>
                <div class="col-xs-6" id="menu-fix">
                    <a id="menu-bars" class="icon pushy-link" href="javascript:void(0);">
                        <img src="catalog/view/theme/ghost-one/image/header/menu_mobile.svg" alt="menu">
                    </a>
                    <a href="javascript:void(0);" id="account" class="hidden-xs icon ">
                        <i class="fa fa-user-circle"></i>
                    </a>
                    <a href="javascript:void(0);" class="auth_form_show visible-xs icon account_out">
                        <i class="fa fa-user-circle"></i>
                    </a>
                    <a href="javascript:void(0);" id="search" class="icon "></a>
                </div>
            </div>
        </div>
        <div class="search-mobile-box container ">
            <div class="row">
                <div class="col-xs-12">
                    <div class="search-box">
                        <input type="text" name="search" value="" placeholder="Поиск" id="input-search-mobile"
                               class="search-box__input ">
                        <a href="javascript:void(0);" class="search-box__btn search-box__btn-search"
                           id="button-close-mobile">
                            <span class="search-box__text">Закрыть</span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<div class="modal fade" role="dialog" id="checkout">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="row">
                <div class="col-xs-12 text-center">
                    <span class="h3 checkout_h">Оформление заказа</span>
                </div>
            </div>
            <br>
            <div id="checkout-data">
                <div class="modal-body">
                    <p class="text-center"><i class="fa fa-refresh fa-spin fa-5x fa-fw text-primary"></i>
                        <span class="sr-only">Загрузка...</span></p>
                    <br/>
                </div>
                <div class="modal-footer">
                    <div class="pull-left">
                        <button type="button" class="btn btn-lg btn-default" data-dismiss="modal">Закрыть</button>
                    </div>
                </div>
            </div>
            <div id="checkout-default" class="hidden">
                <div class="modal-body">
                    <p class="text-center" style="min-height: 156px;">
                        <br/><br/><img
                                src="catalog/view/theme/ghost-one/image/manufacturer/button_load.svg"
                                alt="more" class="manufacturers-page__preloader fa-spin"/>
                    </p>
                    <br/>
                </div>
                <div class="modal-footer">
                    <div class="pull-left">
                        <button type="button" class="btn btn-lg btn-default" data-dismiss="modal">Закрыть</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<div class="modal fade" role="dialog" id="login_modal">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true"></span>
                </button>
            </div>
            <div id="login-data">
                <div class="modal-body">
                    <p class="text-center"><i class="fas fa-sync-alt fa-spin fa-5x fa-fw text-primary"></i>
                        <span class="sr-only">Загрузка...</span></p>
                    <br/>
                </div>
            </div>
            <div id="login-data-default" class="hidden">
                <div class="modal-body">
                    <p class="text-center" style="min-height: 156px;">
                        <br/><br/><img
                                src="catalog/view/theme/ghost-one/stylesheet/image/manufacturer/button_load.svg"
                                alt="more" class="manufacturers-page__preloader fa-spin"/>
                    </p>
                    <br/>
                </div>
            </div>
        </div>
    </div>
</div>

<div class="modal fade remove-popup" id="cartRemoveItem" tabindex="-1">
    <div class="modal-dialog remove-popup__wrapper" role="document">
        <div class="modal-content remove-popup__content">
            <div class="remove-popup__close cart__close-modal js-close-clear-popup"></div>
            <div class="remove-popup__title">Вы хотите очистить корзину?</div>
            <div class="remove-popup__btn-wrapper">
                <div class="remove-popup__btn remove-popup__btn_no js-close-clear-popup">Нет</div>
                <div class="btn_orange remove-popup__btn remove-popup__btn_yes js-clear-cart">Да</div>
            </div>
        </div>
    </div>
</div>

<div class="modal fade" tabindex="-1" role="dialog" id="oferta">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body" id="oferta_modal_body">
            </div>
            <div class="modal-footer">
                <div class="pull-left">
                </div>
            </div>
        </div>
    </div>
</div>

<div class="modal fade" tabindex="-1" role="dialog" id="policy">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body" id="policy_modal_body">
            </div>
            <div class="modal-footer">
                <div class="pull-left">
                </div>
            </div>
        </div>
    </div>
</div>

<?php echo $cart_popup; ?>

<div class="modal fade modal__unscrolled" tabindex="-1" role="dialog" id="contractor-form-modal">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Закрыть">
                    <span aria-hidden="true"></span></button>
            </div>
            <div class="modal-body">
                <p class="text-center" style="min-height: 156px;">
                    <br/><br/><img
                            src="catalog/view/theme/ghost-one/stylesheet/image/manufacturer/button_load.svg"
                            alt="more" class="manufacturers-page__preloader fa-spin"/>
                </p>
            </div>
        </div>
    </div>
</div>
<div class="modal modal-product-preview fade" id="product-preview" role="dialog">
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
            <div id="product-preview-data"></div>
            <div id="checkout-preview-default" class="hidden">
                <div class="modal-body">
                    <br>
                    <br>
                    <br>
                    <br>
                    <br>
                    <p class="text-center" style="min-height: 156px;">
                        <br/><br/><img
                                src="catalog/view/theme/ghost-one/stylesheet/image/manufacturer/button_load.svg"
                                alt="more" class="manufacturers-page__preloader fa-spin"/>
                    </p>
                    <br/>
                </div>
                <div class="modal-footer">
                    <div class="pull-right">
                        <button type="button" class="btn btn-lg btn-default" data-dismiss="modal">Закрыть</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<div class="cart-top cart-top-fixed">
    <button type="button" data-toggle="modal" data-target="#basketmodal" class="btn btn-primary">
        <i class="fa fa-shopping-basket"></i>
        <span class="cart-top__total">
</span>
    </button>
</div>

<header>
    <div id="menu-top" class="hidden-xs">
        <div class="container">
            <div class="row">
                <div class="col-lg-8 col-md-8 col-sm-10 delivery_block">
                    <ul class="list-inline">
                        <li class="ship-city dropdown">
                            <a class="dropdown-toggle ship-city__link" data-toggle="dropdown" role="button"
                               aria-expanded="false" href="index.html#">
                                <span class="ship-city__img msk"></span>
                                Москва
                            </a>
                        </li>
                        <li>
                            <div class="phone hidden-xs hidden-sm">
                                <a href="tel:<?php echo $telephone; ?>"><i class="fa fa-fw fa-phone"></i></a>
                                <a href="tel:<?php echo $telephone; ?>"><?php echo $telephone; ?></a>
                            </div>
                        </li>
                    </ul>
                </div>
                <div class="col-lg-4 col-md-4 col-sm-2 text-right account-block">
                    <ul class="list-inline">
                        <?php if ($logged) { ?>
                        <li class="hidden-sm">
                            <a href="<?php echo $wishlist; ?>" id="wishlist-total" title="<?php echo $text_wishlist; ?>">
                                <i class="fa fa-fw fa-heart"></i>
                                <?php echo $text_wishlist; ?>
                            </a>
                        </li>
                            <li class="ground dropdown">
                                <a href="<?php echo $account; ?>" title="Личный кабинет" class="dropdown-toggle" data-toggle="dropdown">
                                    <i class="fa fa-fw fa-user-circle"></i>
                                    <span class="hidden-xs">Кабинет</span>
                                </a>
                                <ul class="dropdown-menu dropdown-menu-right">
                                    <li>
                                        <a href="<?php echo $account; ?>">
                                            <span class="account-block__dropdown-icon">
                                                <i class="fa fa-fw fa-user-circle"></i>
                                            </span>
                                            <?php echo $text_account; ?>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="<?php echo $order; ?>">
                                            <span class="account-block__dropdown-icon">
                                                <img src="/catalog/view/theme/ghost-one/image/header/file.svg" alt="file" />
                                            </span>
                                            <?php echo $text_order; ?>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="<?php echo $logout; ?>">
                                            <span class="account-block__dropdown-icon">
                                                <i class="fas fa-fw fa-sign-out-alt"></i>
                                            </span>
                                            <?php echo $text_logout; ?>
                                        </a>
                                    </li>
                                </ul>
                            </li>
                        <?php } else { ?>
                            <li>
                                <a class="signup auth_form_show">
                                    <i class="fas fa-fw fa-user-circle"></i></a>
                                <a class="signup auth_form_show">Войти</a>
                            </li>
                        <?php } ?>
                    </ul>
                </div>
            </div>
        </div>
    </div>

    <nav class="pushy pushy-right" style="visibility: visible;">
        <div class="pushy-link-top">
            <span class="pushy-link-top__text">Меню</span>
            <a class="pushy-link-top__close">
                <img src="catalog/view/theme/ghost-one/image/header/close_menu.svg" width="14" height="14"
                     loading="lazy" decoding="async" alt="close">
            </a>
        </div>
        <ul itemscope="itemscope" itemtype="http://schema.org/SiteNavigationElement">
            <li class="pushy-submenu pushy-submenu-open pushy-submenu-closed" id="pushy-category">
                <a class="pushy-submenu__link">
                    <div class="pushy-submenu__wrap">
                        <img src="catalog/view/theme/ghost-one/image/header/assortment.svg" width="14" height="14"
                             loading="lazy" decoding="async" alt="">
                        Наш ассортимент
                    </div>
                </a>
                <ul>
                    <?php foreach ($categories as $category) { ?>
                    <li class="pushy-link">
                        <a href="<?php echo $category['href']; ?>" itemprop="url"
                           title="<?php echo $category['name']; ?>">
                            <span itemprop="name"><?php echo $category['name']; ?></span>
                            <?php if ($active_category_id && $active_category_id == $category['category_id']) { ?>
                                <i class="fa fa-chevron-right orange"></i>
                            <?php } else { ?>
                                <i class="fa fa-chevron-right"></i>
                            <?php } ?>
                        </a>
                    </li>
                    <?php } ?>
                </ul>
            </li>
            <div class="pushy-common-menu">
                <li class="pushy-link"><a href="https://esh-derevenskoe.ru/new" itemprop="url" title="Новинки"><span
                                itemprop="name">Новинки</span></a></li>
                <li class="pushy-link pushy-link__sale"><a href="https://esh-derevenskoe.ru/sale" itemprop="url"
                                                           title="Акции"><span itemprop="name">Акции</span></a></li>
                <li class="pushy-link"><a href="https://esh-derevenskoe.ru/dostavka" itemprop="url"
                                          title="Доставка"><span itemprop="name">Доставка</span></a></li>
                <li class="pushy-link"><a href="https://esh-derevenskoe.ru/brands" itemprop="url"
                                          title="Поставщики"><span itemprop="name">Поставщики</span></a></li>
                <li class="pushy-link"><a href="https://esh-derevenskoe.ru/reviews" itemprop="url" title="Отзывы"><span
                                itemprop="name">Отзывы</span></a></li>
                <li class="pushy-link"><a href="https://esh-derevenskoe.ru/quality" itemprop="url"
                                          title="Качество"><span itemprop="name">Качество</span></a></li>
                <li class="pushy-link"><a href="https://esh-derevenskoe.ru/recipe" itemprop="url" title="О нас"><span
                                itemprop="name">Рецепты</span></a></li>
                <li class="pushy-link"><a href="https://esh-derevenskoe.ru/about_us" itemprop="url" title="О нас"><span
                                itemprop="name">О нас</span></a></li>
            </div>
            <li class="ship-city pushy-city-link dropdown">
                <a class="dropdown-toggle ship-city__link" data-toggle="dropdown" role="button" aria-expanded="false"
                   href="javascript:void(0);">
                    <span class="ship-city__img msk"></span>
                    Москва
                </a>
            </li>
            <div class="pushy-link__about-block">
                <li class="pushy-link phone"><a href="tel:<?php echo $telephone; ?>"><?php echo $telephone; ?></a></li>
                <div class="work-time">Ежедневно с 10 до 20</div>
                <div class="feedback-email">
                    <a href="mailto:feedback@esh-derevenskoe.ru" class="feedback-email__white">feedback@esh-derevenskoe.ru</a>
                </div>
                <li class="pushy-link social">
                    <a class="btn btn-social-icon btn-sm btn-vk" href="https://vk.com/eshderevenskoe" rel="nofollow"
                       target="_blank"><i class="fab fa-vk"></i>
                    </a>
                    <a class="btn btn-social-icon btn-sm btn-youtube"
                       href="https://www.youtube.com/channel/UCAtE1yghjoenzNg8TjArUAQ/videos" rel="nofollow"
                       target="_blank"><i class="fab fa-youtube"></i>
                    </a>
                    <a class="btn btn-social-icon btn-facebook" href="https://www.facebook.com/EshDerevenskoe/"
                       rel="nofollow" target="_blank"><i class="fab fa-facebook-f"></i>
                    </a>
                    <a class="btn btn-social-icon btn-sm btn-instagram"
                       href="https://www.instagram.com/esh_derevenskoe/" rel="nofollow" target="_blank">
                        <i class="fab fa-instagram"></i>
                    </a>
                </li>
            </div>
        </ul>
    </nav>

    <div class="site-overlay"></div>

    <div id="menu-general" data-spy="affix" data-offset-top="40">
        <div class="container menu-general-wrap">
            <div class="row">
                <div class="col-md-2 col-sm-4 col-xs-6 hidden-xs">
                    <?php if ($logo) { ?>
                    <?php if ($home == $og_url) { ?>
                    <img src="<?php echo $logo; ?>" title="<?php echo $name; ?>" alt="<?php echo $name; ?>"
                         class="img-responsive"/>
                    <?php } else { ?>
                    <a href="<?php echo $home; ?>"><img src="<?php echo $logo; ?>" width="173" height="48"
                                                        decoding="async" title="<?php echo $name; ?>"
                                                        alt="<?php echo $name; ?>" class="img-responsive"/></a>
                    <?php } ?>
                    <?php } else { ?>
                    <h1><a href="<?php echo $home; ?>"><?php echo $name; ?></a></h1>
                    <?php } ?>
                </div>
                <div class="col-md-10 col-sm-8 col-xs-6">
                    <nav id="menu" class="hidden-xs ">
                        <ul class="nav navbar-nav" itemscope="itemscope"
                            itemtype="http://schema.org/SiteNavigationElement">
                            <li class="hidden"></li>
                            <li class="header-li-padding visible-lg visible-md"><a href="new.html" itemprop="url"
                                                                                   title="Новинки"><span
                                            itemprop="name">Новинки</span></a></li>
                            <li class="header-li-padding header-li-padding__sale visible-lg visible-md hidden-sm">
                                <a href="sale.html" itemprop="url" title="Акции"><span itemprop="name">Акции</span></a>
                            </li>
                            <li class="header-li-padding visible-lg visible-md">
                                <a href="dostavka.html" itemprop="url" title="Доставка"><span
                                            itemprop="name">Доставка</span>
                                </a>
                            </li>
                            <li class="header-li-padding visible-lg visible-md parent">
                                <a title="О нас">
                                    <span>О нас</span>
                                </a>
                                <ul itemscope="itemscope" itemtype="http://schema.org/SiteNavigationElement">
                                    <li>
                                        <a href="about_us.html" itemprop="url" title="Кто мы">
                                            <span itemprop="name">Кто мы</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="brands.html" itemprop="url" title="Поставщики">
                                            <span itemprop="name">Поставщики</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="quality.html" itemprop="url" title="Качество">
                                            <span itemprop="name">Качество</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="reviews.html" itemprop="url" title="Отзывы">
                                            <span itemprop="name">Отзывы</span>
                                        </a>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </nav>
                    <span class="cart-wrap">
<div class="search-box hidden-xs">
<form action="https://esh-derevenskoe.ru/search" method="get">
<input type="text" name="search" value="" placeholder="Поиск" id="input-search" class="search-box__input">
<a href="javascript:void(0);" class="search-box__btn search-box__btn-toggle" id="button-toggle">
<img src="catalog/view/theme/ghost-one/image/header/search.svg" alt="search"/>
</a>
<button id="button-search" type="submit" class="search-box__btn search-box__btn-search">
<img src="catalog/view/theme/ghost-one/image/header/search_white.svg" alt="search"/>
<span class="search-box__text">Найти</span>
</button>
<a href="javascript:void(0);" class="search-box__btn search-box__btn-close" id="button-close">
<img src="catalog/view/theme/ghost-one/image/header/close.svg" alt="close"/>
<span class="search-box__text">Закрыть</span>
</a>
</form>
</div>
                        <?php echo $cart; ?>
                        <div class="hidden-lg hidden-md hidden-xs tablet__btn">
<a href="javascript:void(0);" role="button" id="tablet__btn"></a>
</div>
</span>
                </div>
            </div>
            <div class="row special-section-wrap visible-md">
                <ul class="nav navbar-nav col-md-12" itemscope="itemscope"
                    itemtype="http://schema.org/SiteNavigationElement">
                    <li class="visible-md header-li-padding special_section-desktop">
                        <a href="pasxa.html" itemprop="url" title="Пасха">
                            <img src="catalog/view/theme/ghost-one/image/icons/icons-easter9.png" width="25" height="20"
                                 class="easter-img"> <span
                                    itemprop="name">Пасха</span></a></li>
                    <li class="visible-md header-li-padding special_section-desktop">
                        <a href="postnoe.html" itemprop="url" title="Постное">
                            <span itemprop="name">Постное</span></a></li>
                </ul>
            </div>
        </div>
        <div class="tablet__menu-wrap visible-sm">
            <div class="tablet__menu">
                <div class="container">
                    <ul itemscope="itemscope" itemtype="http://schema.org/SiteNavigationElement">
                        <li><a href="new.html" title="Новинки" itemprop="url"><span itemprop="name">Новинки</span></a>
                        </li>
                        <li class="header-li-padding__sale"><a href="sale.html" title="Акции" itemprop="url"><span
                                        itemprop="name">Акции</span></a></li>
                        <li><a href="dostavka.html" title="Доставка" itemprop="url"><span
                                        itemprop="name">Доставка</span></a></li>
                        <li><a href="brands.html" title="Поставщики" itemprop="url"><span
                                        itemprop="name">Поставщики</span></a></li>
                        <li><a href="reviews.html" title="Отзывы" itemprop="url"><span itemprop="name">Отзывы</span></a>
                        </li>
                        <li><a href="quality.html" title="Качество" itemprop="url"><span itemprop="name">Качество</span></a>
                        </li>
                        <li><a href="about_us.html" title="О нас" itemprop="url"><span itemprop="name">О нас</span></a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <script type="text/javascript">
            var menuImages = [];

            menuImages.push("catalog/view/theme/default/image/icons/milk-cheese-and-eggs.svg");
            menuImages.push("catalog/view/theme/default/image/icons/meat-and-poultry.svg");
            menuImages.push("catalog/view/theme/default/image/icons/fruits-and-veggies.svg");
            menuImages.push("catalog/view/theme/default/image/icons/bakery.svg");
            menuImages.push("catalog/view/theme/default/image/icons/sweets.svg");
            menuImages.push("catalog/view/theme/default/image/icons/grocery.svg");
            menuImages.push("catalog/view/theme/default/image/icons/fish.svg");
            menuImages.push("catalog/view/theme/default/image/icons/frozen.svg");
            menuImages.push("catalog/view/theme/default/image/icons/non-food.svg");

            if (typeof preloadImages === "function") preloadImages(menuImages);
        </script>
        <?php if ($categories) { ?>
        <div id="categories" class="hidden-xs">
            <div class="container">
                <ul itemscope="itemscope" class="list-inline" itemtype="http://schema.org/SiteNavigationElement">
                    <?php foreach ($categories as $category) { ?>

                    <?php if ($active_category_id && $active_category_id == $category['category_id']) { ?>
                        <li class="category-item active">
                    <?php } else { ?>
                        <li class="category-item">
                    <?php } ?>

                        <a href="<?php echo $category['href']; ?>">
                            <?php if ($category['image']) { ?>
                            <div class="category-icon">
                                <img src="image/<?php echo $category['image']; ?>"
                                     alt="<?php echo $category['name']; ?>" width="60" height="60" loading="lazy"
                                     decoding="async"
                                     title="<?php echo $category['name']; ?>"/>
                            </div>
                            <?php } ?>
                            <span><?php echo $category['name']; ?></span>
                        </a>
                    </li>
                    <?php } ?>
                </ul>
            </div>
        </div>
        <?php } ?>
    </div>
    <style type="text/css">
        #menu-general .special_section-desktop a {
            color: #ffffff !important;
            background: #459343 !important;
            padding: 5px 7px 5px 10px;
            border-radius: 17px;
            line-height: 22px;
            font-size: 15px !important;
        }

        #menu-general .special_section-desktop a:hover,
        #menu-general .special_section-tablet a:hover,
        .special_section-phone a:hover, .special_section-phone a:focus {
            background: #ff7a2c !important;
        }

        #menu-general .special_section-tablet a {
            color: #ffffff !important;
            background: #459343 !important;
        }

        #menu-general .special_section-desktop a {
            color: #ffffff !important;
            background: #459343 !important;
            padding: 5px 7px 5px 10px;
            border-radius: 17px;
            line-height: 22px;
            font-size: 15px !important;
        }

        #menu-general .special_section-desktop a:hover,
        #menu-general .special_section-tablet a:hover,
        .special_section-phone a:hover, .special_section-phone a:focus {
            background: #ff7a2c !important;
        }

        #menu-general .special_section-tablet a {
            color: #ffffff !important;
            background: #459343 !important;
        }                </style>
</header>
<div id="wrapper">