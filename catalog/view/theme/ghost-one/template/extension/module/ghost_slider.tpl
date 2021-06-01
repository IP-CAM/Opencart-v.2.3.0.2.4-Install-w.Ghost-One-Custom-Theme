<div class="home-banners">
    <div class="home-banners-carousel__wrapper">
        <div class="banner-preloaders">
            <div class="banner-preloaders__outer">
                <div class="banner-preload">
                    <div class="banner-preload__container">
                        <div class="banner-preload__desc">
                            <div class="banner-preload__title">
                                <span class="bg-grad bg-grad-invert"></span>
                                <span class="bg-grad bg-grad-invert"></span>
                                <span class="bg-grad bg-grad-invert"></span>
                            </div>
                            <div class="banner-preload__intro bg-grad bg-grad-invert"></div>
                            <div class="banner-preload__button"></div>
                        </div>
                    </div>
                </div>
                <div class="banner-preload">
                    <div class="banner-preload__container">
                        <div class="banner-preload__desc">
                            <div class="banner-preload__title">
                                <span class="bg-grad bg-grad-invert"></span>
                                <span class="bg-grad bg-grad-invert"></span>
                                <span class="bg-grad bg-grad-invert"></span>
                            </div>
                            <div class="banner-preload__intro bg-grad bg-grad-invert"></div>
                            <div class="banner-preload__button"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="home-banners-carousel owl-carousel js-home-banners">
            <?php foreach ($banners as $banner) { ?>
            <div class="item home-banners-carousel__slide">
                <div class="home-banners-carousel__slide-content">

                    <?php if ($banner['link']) { ?>

                    <a href="<?php echo $banner['link']; ?>"
                       class="home-banners-carousel__slide-link">
                        <div class="home-banners-carousel__slide-background"
                             data-src-slide="<?php echo $banner['image']; ?>"
                             style="background-image: url(<?php echo $banner['image']; ?>);">
                        </div>
                    </a>

                    <?php } else { ?>

                    <div class="home-banners-carousel__slide-background"
                         data-src-slide="<?php echo $banner['image']; ?>"
                         style="background-image: url(<?php echo $banner['image']; ?>);"></div>

                    <?php } ?>

                    <?php if ($banner['text']) { ?>
                    <div class="home-banners-carousel__slide-tag__wrap">
                        <div class="home-banners-carousel__slide-tag">
                            <?php echo $banner['tag']; ?>
                        </div>
                    </div>
                    <?php } ?>

                    <div class="home-banners-carousel__slide-title">
                        <?php echo $banner['title']; ?>
                    </div>

                    <?php if ($banner['text']) { ?>
                    <div class="home-banners-carousel__slide-text">
                        <?php echo $banner['text']; ?>
                    </div>
                    <?php } ?>

                    <?php if ($banner['link']) { ?>
                    <a class="home-banners-carousel__slide-btn btn btn-primary btn_main btn_mobile-arrow"
                       href="<?php echo $banner['link']; ?>">Подробнее</a>
                    <?php } ?>

                </div>
            </div>
            <?php } ?>
        </div>
    </div>
</div>
<script type="text/javascript">
    'use strict';

    $(document).ready(function () {
        // прелоадер картинок
        $('.home-banners-carousel__slide-background').each(function (i, el) {
            var
                image_src = $(el).data('src-slide'),
                bgImg = new Image();

            bgImg.onload = function () {
                el.style.backgroundImage = 'url(' + bgImg.src + ')';
                $(el).addClass('loaded');
            };

            bgImg.src = image_src;
        });

        $('.js-home-banners').on('initialized.owl.carousel changed.owl.carousel', function (e) {
            if (!e.namespace) return;

            var
                $carousel = e.relatedTarget,
                $counter = $('.home-banners-carousel__counter');

            $counter.text($carousel.relative($carousel.current()) + 1 + '/' + $carousel.items().length);

            $('.banner-preloaders').remove();

            $counter.addClass('active');
        });

        var transient = {};

        $('.js-home-banners').owlCarousel({
            smartSpeed: 300,
            onDrag: (typeof onDrag === 'function') ? onDrag.bind(transient) : '',
            onDragged: (typeof onDragged === 'function') ? onDragged.bind(transient) : '',
            dots: false,
            margin: 20,
            nav: true,
            responsive: {
                0: {
                    items: 1,
                    nav: false,
                    margin: 8
                },
                550: {
                    items: 1,
                    nav: false,
                    margin: 16
                },
                992: {
                    items: 2
                }
            }
        });
    });
</script>