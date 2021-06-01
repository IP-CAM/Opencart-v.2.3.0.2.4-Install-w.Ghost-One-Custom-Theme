<div class="modal-popup__container" itemscope itemtype="http://schema.org/Product">
    <div class="product-card">
        <div class="product-card__info">
            <meta name="fragment" content="!">
            <div class="product-card__info-image">
                <div class="product-card__info-slider owl-carousel">
                    <div class="product-card__info-slider-item item" itemscope
                         itemtype="http://schema.org/ImageObject"
                         style="background-image: url('<?php echo $popup; ?>');" itemprop="contentUrl">
                    </div>
                    <?php if ($images) { ?>
                        <?php foreach($images as $image) { ?>
                            <div class="product-card__info-slider-item item" itemscope
                                 itemtype="http://schema.org/ImageObject"
                                 style="background-image: url('<?php echo $image['popup']; ?>');" itemprop="contentUrl">
                            </div>
                        <?php } ?>
                    <?php } ?>

                </div>
                <div class="product-card__info-tags tags-product">
                    <div class="product-card__info-icons icons-product">
                    </div>
                </div>
                <div class="slider-preloader" id="slider-preloader">
                    <div class="bg-grad">
                        <img data-src="/catalog/view/theme/ghost-one/image/preloader-slider.svg" alt />
                    </div>
                </div>
            </div>
            <div class="product-card__info-desc">
                <div class="product-card__info-from">От <a href="https://esh-derevenskoe.ru/eduard-vasiljev">Эдуарда Васильева</a></div>
                <div class="product-card__info-name" itemprop="name">Фарш из молодой говядины</div>
                <meta itemprop="brand" content="Эдуард Васильев"/>
                <div class="product-card__info-rating">
                    <div class="rating-level"
                         itemprop="aggregateRating"
                         itemscope itemtype="http://schema.org/AggregateRating">
                        <meta itemprop="ratingValue" content="4"/>
                        <meta itemprop="reviewCount" content="250"/>
                        <div class="rating-level__stars">
                            <div class="rating-level__stars-under"></div>
                            <div class="rating-level__stars-over" style="width: 90%;"></div>
                        </div>
                        <div class="rating-level__text">
                            <a class="product-card__goto-reviews">250 отзывов</a>
                        </div>
                    </div>
                </div>
                <div class="product-card__info-intro">
<span class="product-card__info-intro-string "
      id="product-preview-description"
      data-price="385"
      data-name="Фарш из молодой говядины"
      data-product_id="171"
      data-manufacturer_name="Эдуард Васильев"
      data-category_name="Полуфабрикаты из мяса охлажденные"
      itemprop="description">
<b>Состав:</b> говядина.<br><br>
<b>Описание:</b> Бычки пород голштино-фризская, черно-пестрая, красно-пестрая выращиваются на ферме без антибиотиков, на натуральном корме. Забиваются в возрасте от 8 до 14 месяцев. Состав корма: сено, пшеница, кукуруза, натуральный комбикорм. Тут всё по семейному: стадо пополняется молодняком, никакие промышленные методы не применяются.
Натуральный фарш, изготовленный из свежего мяса на профессиональной мешалке — только такой предлагает Ешь Деревенское своим покупателям.
Говядина — это более постное мясо, и мы добавляем немного жира в фарш — для сочности. Готовите вы котлеты или фрикадельки, пельмени или мясной пирог — ваша семья полюбит домашний вкус блюд, сделанных из говяжьего фарша. </span>
                    <a class="product-card__info-intro-more">Подробнее</a>
                </div>
                <div class="product-card__info-prices" itemprop="offers"
                     itemscope itemtype="http://schema.org/Offer">
                    <link itemprop="url" href="https://esh-derevenskoe.ru/farsh-iz-govjadiny"/>
                    <div class="price-container price-container-lg">
<span class="price-container__value">385<i
            class="CurrencyIcon CurrencyIcon--rub"></i></span>
                        <span class="price-container__units">
/ 400 г. </span>
                    </div>
                    <meta itemprop="price" content="385">
                    <meta itemprop="priceCurrency" content="RUB">
                    <link itemprop="availability" href="http://schema.org/InStock">
                </div>
                <div class="product-card__info-buttons product-card__info-buttons-wrap">
                    <div class="button-order-container disabled">
                        <div class="btn-like-container">
                            <a class="btn-like-container__button btn-like-container__button-minus"
                               onclick="cart.minus('171');"></a>
                            <div class="btn-like-container__quantity"
                                 data-value="0"></div>
                            <a class="btn-like-container__button btn-like-container__button-plus"
                               onclick="cart.add('171');"></a>
                        </div>
                        <a class="product-card__button-order btn btn-green btn-lg
                                                            " onclick="cart.add('171');" id="addToCartFromModal"
                        >В корзину
                        </a>
                    </div>
                    <a class="btn btn-wish" id="product-wishlist171"
                       onclick="wishlist.add('171');"></a>
                </div>
                <div class="product-card__info-features">
                </div>
            </div>
        </div>
        <div class="product-card__tabs">
            <div class="product-card__tabs-list tabs-list">
                <ul role="tablist">
                    <li role="presentation" class="active">
                        <a href="#product-description" aria-controls="product-description" role="tab" data-toggle="tab">Описание</a>
                    </li>
                    <li role="presentation">
                        <a href="#product-reviews" aria-controls="product-reviews" role="tab" data-toggle="tab">Отзывы
                            (250)</a>
                    </li>
                    <li role="presentation">
                        <a href="#product-recipes" aria-controls="product-recipes" role="tab" data-toggle="tab">Рецепты
                        </a>
                    </li>
                </ul>
            </div>
            <div class="product-card__tabs-content tabs-content">
                <div role="tabpanel" class="tab-pane fade in active" id="product-description">
                    <div class="product-description">
                        <div class="product-description__params">
                            <div class="product-description__params-item">
                                <b>Цена:</b> товар весовой, конечная стоимость будет рассчитана в соответствии с его весом. </div>
                            <div class="product-description__params-item">
                                <b>Масса:</b> 0,4 кг. (320-440 г.). </div>
                            <div class="product-description__params-item">
                                <b>Порода:</b> &quot;Костромская&quot; или &quot;Голштинская&quot;. </div>
                            <div class="product-description__params-item">
                                <b>Применение:</b> для приготовления котлет и бифштексов. </div>
                            <div class="product-description__params-item">
                                <b>Мякоть:</b> 80%. </div>
                            <div class="product-description__params-item">
                                <b>Пищевая ценность:</b> белки - 17,2 г., жиры - 20 г., углеводы - 0 г.; на 100 г. </div>
                            <div class="product-description__params-item">
                                <b>Энергетическая ценность:</b> 254,47 кКал. / 1064,7 кДж. </div>
                            <div class="product-description__params-item">
                                <b>Срок годности:</b> 5 суток. </div>
                            <div class="product-description__params-item">
                                <b>Условия хранения:</b> при температуре от +2 до +6 °С. После вскрытия хранится 24 часа при температуре от 0 до +5 °С. В замороженном виде 6 месяцев. </div>
                            <div class="product-description__params-item">
                                <b>Упаковка:</b> вакуумный пакет. </div>
                            <div class="product-description__params-item">
                                <b>Место происхождения:</b> Тверская область, Калининский район. </div>
                        </div>
                        <div class="product-description__provider">
                            <div class="product-description__provider-plates">
                                <div class="product-description__provider-plate">
                                    <div class="product-description__provider-plate-container">
                                        <script type="text/javascript">
                                            if (typeof preloadImages === 'function') preloadImages(
                                                ['https://esh-derevenskoe.ru/image/cache/catalog/farmer/27/zd3a4603-90x90.jpg?v=3']);
                                        </script>
                                        <div class="product-description__provider-plate-info">
                                            <div class="product-description__provider-plate-avatar">
                                                <a href="https://esh-derevenskoe.ru/eduard-vasiljev">
                                                    <img alt="Эдуард Васильев"
                                                         title="Эдуард Васильев"
                                                         src="https://esh-derevenskoe.ru/image/cache/catalog/farmer/27/zd3a4603-90x90.jpg?v=3"
                                                         id="img-supplier" />
                                                </a>
                                            </div>
                                            <div class="product-description__provider-plate-desc">
                                                <div class="product-description__provider-plate-post">Поставщик этого
                                                    продукта
                                                </div>
                                                <div class="product-description__provider-plate-title">
                                                    <a href="https://esh-derevenskoe.ru/eduard-vasiljev">
                                                        Эдуард Васильев </a>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="product-description__provider-plate-bottom">
                                            <div class="product-description__provider-plate-reviews">
                                                <div class="rating-level">
                                                    <div class="rating-level__stars">
                                                        <div class="rating-level__stars-under"></div>
                                                        <div class="rating-level__stars-over"
                                                             style="width: 86.21%;"></div>
                                                    </div>
                                                    <div class="rating-level__text">
                                                        <a href="javascript:void(0);">2876 отзывов</a>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="product-description__provider-plate-more">
                                                <a href="https://esh-derevenskoe.ru/eduard-vasiljev">
                                                    Подробнее
                                                </a>
                                            </div>
                                        </div>
                                        <div class="supplier-preloader" id="supplier-preloader">
                                            <div class="supplier-preloader__top">
                                                <div class="supplier-preloader__avatar"></div>
                                                <div class="supplier-preloader__desc">
                                                    <div class="supplier-preloader__post bg-grad"></div>
                                                    <div class="supplier-preloader__name bg-grad"></div>
                                                </div>
                                            </div>
                                            <div class="supplier-preloader__bot">
                                                <div class="supplier-preloader__stars bg-grad"></div>
                                                <div class="supplier-preloader__more bg-grad"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="product-description__provider-plate">
                                    <div class="product-description__provider-plate-container">
                                        <div class="product-description__provider-plate-image">
                                            <img src="/catalog/view/theme/ghost-oneimage/cert.svg" alt>
                                        </div>
                                        <div class="product-description__provider-plate-inner">
                                            <div class="product-description__provider-plate-title">Сертификат
                                                продукта
                                            </div>
                                            <div class="product-description__provider-plate-more">
                                                <a href="javascript:void(0);"
                                                   class="js-open-popupCertificate hidden">Смотреть</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div data-popmechanic-embed="24593" data-popmechanic-argument="171" data-popmechanic-area="mindBoxReco-productCard-1"></div>
                    <div data-popmechanic-embed="24811" data-popmechanic-argument="171" data-popmechanic-area="mindBoxReco-productCard-2"></div>
                </div>
                <div role="tabpanel" class="tab-pane fade" id="product-reviews">
                    <div class="product-reviews">
                        <div class="product-reviews__header">
                            <div class="product-reviews__header-sort">
                                <div class="drop-down">
                                    <a class="drop-down__selected"></a>
                                    <div class="drop-down__container">
                                        <a data-value="0" class="drop-down__item drop-down__item-desc
                                             js-drop-down-reviews">Дата по убыванию</a>
                                        <a data-value="1" class="drop-down__item drop-down__item-asc
                                             js-drop-down-reviews">Дата по возрастанию</a>
                                        <a data-value="2" class="drop-down__item drop-down__item-desc
                                             js-drop-down-reviews">Сначала позитивные</a>
                                        <a data-value="3" class="drop-down__item drop-down__item-asc
                                             js-drop-down-reviews">Сначала негативные</a>
                                    </div>
                                </div>
                            </div>
                            <div class="product-reviews__header-review">
                                Оставить отзыв может только покупатель, который заказывал данный продукт.
                            </div>
                        </div>
                        <div id="review"></div>
                    </div>
                </div>
                <div role="tabpanel" class="tab-pane fade" id="product-recipes">
                    <div id="product_recipes"></div>
                </div>
                <div class="product-card__footer">
                    <a data-dismiss="modal">Закрыть</a>
                </div>
            </div>
        </div>
    </div>
</div>

<script type="text/javascript">
    'use strict';

    // для кастомной навигации
    function customNav (event) {
        let $slider = $(event.target);

        $slider.append('<div class="owl-nav-custom"><a class="owl-prev"></a><div class="owl-counts"></div><a class="owl-next"></a></div>');

        // события по клику
        $slider.find('.owl-nav-custom a').on('click', function () {
            if ($(this).is('.disabled')) return;

            if ($(this).is('.owl-prev')) {
                $slider.trigger('prev.owl.carousel');
            }

            if ($(this).is('.owl-next')) {
                $slider.trigger('next.owl.carousel');
            }
        });

        // запускаем счетчик
        countSlides(event);
    }

    // для подсчета слайдов
    function countSlides (event) {
        let
            slideElement = event.target,
            slideSize = event.item.count,
            slideItem = event.item.index + 1,
            $slider = $(slideElement);

        // включение и выключение кнопок в зависимости от счетчика
        if (slideItem === 1) {
            $slider.find('.owl-prev').addClass('disabled');
            $slider.find('.owl-next').removeClass('disabled');
        } else if (slideItem > 1 && slideItem < slideSize) {
            $slider.find('.owl-nav-custom a').removeClass('disabled');
        } else if (slideItem === slideSize) {
            $slider.find('.owl-prev').removeClass('disabled');
            $slider.find('.owl-next').addClass('disabled');
        }

        // сброс счетчика при выходе за лимит
        if (slideItem > slideSize) {
            slideItem = slideItem - slideSize;
        }

        if ($('.product-card__info-slider .product-card__info-slider-item').length == 1) {
            $slider.find('.owl-nav-custom').remove();
        } else {
            $slider.find('.owl-counts').html(slideItem + '/' + slideSize);
        }
    }

    $(function () {
        // слайдер изображения товара
        var owlProductImageOptions = {
            items: 1,
            margin: 0,

            loop: false,
            nav: false,
            navText: false,
            dots: false,
            autoplay: false,
            autoplayHoverPause: false,
            autoHeight: false,

            navSpeed: 600,
            autoplaySpeed: 600,
            autoplayTimeout: 6000,
            dragEndSpeed: 300,

            onInitialized: customNav,
            onTranslated: countSlides
        };

        $('#product-preview').on('shown.bs.modal', function () {
            loadProductImageSlider(owlProductImageOptions);
        });

        var
            transientSimilar = {},
            owlProductsOptions = {
                items: 3,
                margin: 20,

                loop: false,
                nav: false,
                navText: false,
                dots: false,
                autoplay: false,
                autoplayHoverPause: false,
                autoHeight: false,

                navSpeed: 600,
                autoplaySpeed: 600,
                autoplayTimeout: 6000,
                dragEndSpeed: 300,

                slideBy: 'page',
                smartSpeed: 100,
                animateIn: 'linear',
                animateOut: 'linear',

                //мерцает на мобильном устройстве
                //onDrag: sliderOnDrag.bind(transientSimilar),
                //onDragged: sliderOnDragged.bind(transientSimilar),

                responsive: {
                    0: {
                        items: 2,
                        margin: 10
                    },
                    768: {
                        items: 3
                    }
                }
            };

        // запускаем слайдер похожих продуктов
        loadRelativeProductsSlider(owlProductsOptions);

        //window.dispatchEvent(new Event('resize'));

        $(window).on('rotate resize', function () {
            //$('.product-card__info-slider').trigger('refresh.owl.carousel');

            //loadProductImageSlider(owlProductImageOptions);

            loadRelativeProductsSlider(owlProductsOptions);
        });

        function updateProductImageSlider () {
            $('.product-card__info-slider').data('owl.carousel').onResize();
        }

        function loadProductImageSlider (owlProductImageOptions) {
            let $carousel = $('.product-card__info-slider');

            $carousel.trigger('destroy.owl.carousel').find('.owl-nav-custom').remove();

            $carousel.owlCarousel(owlProductImageOptions);

            updateProductImageSlider();
        }

        function loadRelativeProductsSlider (owlProductsOptions) {
            let $carousel = $('.product-card__similar .products-container');

            if ($(window).width() < 992) {
                $carousel.addClass('owl-carousel').
                owlCarousel(owlProductsOptions);
            } else {
                $carousel.removeClass('owl-carousel').
                trigger('destroy.owl.carousel');
            }
        }
    });
</script>
<script type="text/javascript">
    [].forEach.call(document.querySelectorAll('.product-preview'), function(p_link) {
        if (p_link.getAttribute('data-ajax-link')) {
            p_link.setAttribute('href', p_link.getAttribute('data-ajax-link'));
            p_link.removeAttribute('data-ajax-link');
        }
    });

    // зарегистрируем и оповестим всех о наступлении события
    metric.var('preview_product_id', 171);
    metric.var('preview_product_price', parseInt('385'));
    metric.var('preview_product_name', 'Фарш из молодой говядины');
    metric.var('preview_product_img', $('#product-preview-left .item img').attr('src'));
    metric.var('preview_product_url', window.location.href);
    metric.notify('preview_product', {
        product_id:171,
        price: parseInt('385'),
        name: 'Фарш из молодой говядины',
    }, 1000);
</script>
<script type="text/javascript">
    var
        product_name = 'Фарш из молодой говядины',
        manufacturer_name = 'Эдуард Васильев';
</script>
<script type="text/javascript">
    'use strict';

    // закладка с сертификатами продукта
    if ($('#certificates_list').length > 0) {
        $('#certificates_list').
        load(
            'index.php?route=product/certificates/get_product_certificates_carousel&product_id=171',
            function() {
                $('.js-open-popupCertificate').removeClass('hidden');
            });
    }

    $('.js-open-popupCertificate').click(function() {
        bodyNoScroll();
        $('.popup-certificate').addClass('popupCarousel__block');
        setTimeout(function() {
            $('.popup-certificate').addClass('popupCarousel__show');
        }, 10);
    });

    $('#review').delegate('.page-navigation a', 'click', function(e) {
        e.preventDefault();
        $('#review').fadeOut('slow');
        $('#review').load(this.href);
        $('#review').fadeIn('slow');
    });

    $('#review').load('index.php?route=product/product/new_review&product_id=171');

    $('.js-drop-down-reviews').on('click', function () {
        let sortValue = $(this).attr('data-value');
        $('#review').load('index.php?route=product/product/new_review&product_id=171&sort=' + sortValue + '&page=1');
    });

    if ($('#product_recipes').length) {
        $('#product_recipes').load('index.php?route=extension/module/recipe/get_product_recipes&product_id=171');
    }

    $('#button-review').on('click', function() {
        let ratingVal = $('.js-add-review').find('input[name="rating"]').val();
        let $addRating = $('.js-add-review').find('.js-add-rating');
        let textId = 'input-review';
        let productId = $('.js-add-review').attr('data-product');

        if (!ratingVal || ratingVal == 0) {
            $addRating.addClass('has-error');
            return false;
        } else {
            $addRating.removeClass('has-error');
        }

        $('#' + textId).
        closest('div.add-review__text').
        removeClass('has-error').find('.text-error').remove();

        if (!checkTextWords($('#' + textId).val(), 3)) {
            $('#' + textId).
            closest('div.add-review__text').
            append(
                '<span class="text-error">в отзыве должно быть не меньше 3-х слов</span>').
            addClass('has-error');
            return false;
        }

        $('.js-review-send').attr('disabled', 'disabled');

        $.ajax({
            url: 'index.php?route=product/product/write&product_id=' + productId,
            type: 'post',
            dataType: 'json',
            data: $('#form-review').serialize(),
            beforeSend: function() {
                $('#button-review').button('отправка');
            },
            complete: function() {
                $('#button-review').button('reset');
            },
            success: function(json) {
                if (json['error']) {
                    $().toastmessage('showErrorToast', json['error'], 600);
                }

                if (json['success']) {
                    $('#review').html();
                    $('#review').load(
                        'index.php?route=product/product/new_review&product_id=' + productId);
                    $('input[name=\'rating\']').val('');
                    $('textarea[name=\'text\']').val('');
                    $('.js-add-review').find('.js-add-review-container').hide();
                    $('.js-review-send').removeAttr('disabled');
                    $('.js-add-review').find('.js-add-review-success').fadeIn();
                }
            },
        });

        return false;
    });

    $(document).ready(function() {
        $('[data-toggle="tooltip"]').tooltip({trigger: 'click'});

        $('.product-card-popup').on('scroll resize', function () {
            let
                posPopup = $(this).scrollTop(),
                $closeButton = $('.modal-popup__close-product-mobile');

            if (posPopup > $('.product-card__info-image').outerHeight() - 50) {
                $closeButton.addClass('active');
            } else {
                $closeButton.removeClass('active');
            }
        });
    });

    if (typeof (smoothLazyLoad) === 'function') smoothLazyLoad();
</script>
<script type="text/javascript">
    'use strict';

    $(function() {
        var carouselImage = document.getElementById('img-carousel');

        function replaceCarouselImage() {
            setTimeout(function() {
                $('.modal-product-preview #slider-preloader').fadeOut('fast');
            }, 100);
        }

        if (carouselImage) {
            if (carouselImage.complete) {
                replaceCarouselImage();
            } else {
                carouselImage.addEventListener('load', replaceCarouselImage);
            }
        } else {
            replaceCarouselImage();
        }

        var supplierImage = document.getElementById('img-supplier');

        function replaceSupplierImage() {
            setTimeout(function() {
                $('#supplier-preloader').fadeOut('fast');
            }, 50);
        }

        if (supplierImage) {
            if (supplierImage.complete) {
                replaceSupplierImage();
            } else {
                supplierImage.addEventListener('load', replaceSupplierImage);
            }
        } else {
            replaceSupplierImage();
        }

        $('.products-container__item-image img').each(function () {
            $(this).on('load', function () {
                $(this).addClass('ready').closest('div').addClass('loaded');
            });
        });
    });
</script>