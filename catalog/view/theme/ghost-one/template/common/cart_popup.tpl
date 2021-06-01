<div class="modal fade  in" id="basketmodal" role="dialog"">
    <div class="modal-lg modal-dialog cart" role="document">
    <div class="cart__close-modal visible-sm visible-xs" data-dismiss="modal"></div>
    <div class="modal-content cart__wrapper row row_flex">
        <div class="cart_basketmodalbody__wrapper" id="basketmodalbody"><div class="col-md-9 col-sm-12 col-xs-12 cart__content">
                <div class="row cart__header">
                    <div class="col-md-3">
                        <div class="cart__title">Корзина</div>
                        <div class="cart__header-clean">
                            <div class="cart__clear js-open-clear-popup" type="button">Очистить <span class="hidden-xs hidden-sm">корзину</span></div>
                        </div>
                    </div>
                    <div class="col-md-9 cart__notice-wrapper">
                    </div>
                </div>
                <div class="row cart__body">
                    <div class="col-md-12">
                        <div class="cart__items-wrapper">
                            <?php $product_cart_count = 0; ?>
                            <?php foreach ($products as $product) { ?>
                            <?php $product_id = $product['product_id']; ?>
                            <div class="cart-item row row_flex" id="product_id<?php echo $product_id; ?>" data-product_id="<?php echo $product_id; ?>" data-price="290.0000" data-name="Экопена для мытья овощей и фруктов (нейтральная)" data-brand_id="318" data-brand="WONDER LAB" data-category_id="183" data-category="Non-food" data-price_discount="" data-price_original="290.0000">
                                <div class="col-md-6 col-sm-7 col-xs-12 cart-item__info">
                                    <?php if ($product['thumb']) { ?>
                                    <a class="product-preview cart-item__image-wrapper" href="#!goods/<?php echo $product['href']; ?>">
                                        <img src="<?php echo $product['thumb']; ?>" alt="<?php echo $product['name']; ?>" title="Показать карточку товара" class="img-rounded cart-item__image">
                                    </a>
                                    <?php } else { ?>
                                    <a href="<?php echo $product['href']; ?>"><?php echo $product['name']; ?></a>
                                    <?php } ?>
                                    <div class="cart-item__text">
                                        <div class="cart-item__title">
                                            <?php echo $product['name']; ?>
                                        </div>
                                        <div class="cart-item__value">
                                            <?php echo $product['price']; ?>
                                            <span class="CurrencyIcon CurrencyIcon--rub"></span> / 240 мл.
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-6 col-sm-5 col-xs-12 cart-item__quantity">
                                    <div class="cart-item__counter plus_minus">
                                        <?php if ($product['quantity'] == 1) { ?>
                                        <div class="cart-item__counter-btn cart-item__counter-btn_remove product-minus">
                                            <div class="cart-item__counter-btn-icon" onclick="cart.minus('<?php echo $product_id; ?>');"></div>
                                        </div>
                                        <?php } else { ?>
                                        <div class="cart-item__counter-btn cart-item__counter-btn_minus product-minus">
                                            <div class="cart-item__counter-btn-icon" onclick="cart.minus('<?php echo $product_id; ?>');"></div>
                                        </div>
                                        <?php } ?>
                                        <div class="cart-item__counter-number product-quantity">
                                            <span><?php echo $product['quantity']; ?></span>
                                        </div>
                                        <div class="cart-item__counter-btn cart-item__counter-btn_plus product-plus">
                                            <div class="cart-item__counter-btn-icon" onclick="cart.add('<?php echo $product_id; ?>', '1');"></div>
                                        </div>
                                    </div>
                                    <div class="cart-item__price">
                      <span class="product_total">
                        <?php echo $product['total']; ?>
                          <span class="CurrencyIcon CurrencyIcon--rub"></span>
                      </span>
                                    </div>
                                </div>
                                <div class="cart-item__remove" onclick="cart.remove('<?php echo $product_id; ?>');"></div>
                            </div>
                            <?php $product_cart_count += $product['quantity']; ?>
                            <?php } ?>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-3 col-sm-12 col-xs-12 cart-sidebar">
                <div class="cart-sidebar__header">
                    <div class="cart__close-modal visible-lg visible-md" data-dismiss="modal"></div>
                    <div class="cart-sidebar__header-title">
                        <div class="cart-sidebar__header-clock"></div>
                        Ближайшая доставка
                    </div>
                    <div class="cart-sidebar__header-data">

                    </div>
                </div>
                <div class="cart-sidebar__body">
                    <div class="cart-sidebar__total-box">
                        <div class="cart-sidebar__total-box__wrap">
                            <div class="cart-sidebar__total-line">
                                <div class="cart-sidebar__total-text">
                                    Кол-во товаров
                                </div>

                                <div class="cart-sidebar__total-number cart-count"> <?php echo $product_cart_count; ?> </div>
                            </div>
                            <div class="cart-sidebar__total-line">
                                <div class="cart-sidebar__total-text">
                                    Стоимость продуктов
                                </div>
                                <div class="cart-sidebar__total-number cart-sidebar__total-number_big" id="cart_sub_total">
                                    <span class="cart_total"><?php echo $custom_total; ?></span>
                                </div>
                            </div>
                        </div>
                        <div class="cart-sidebar__span-text visible-sm visible-xs">
                        </div>
                    </div>
                    <div class="btn_orange cart-sidebar__btn-checkout btn-js-checkout" data-toggle="modal" data-target="#checkout">
                        Оформить заказ
                    </div>
                    <div class="cart-sidebar__span-text visible-lg visible-md">
                    </div>
                </div>
                <div class="cart-sidebar__clear-wrapper">
                    <div class="cart__clear js-open-clear-popup" type="button">Очистить корзину</div>
                </div>
            </div>
        </div>
    </div>
</div>
</div>