<div class="cart-item row row_flex" id="<?php echo $product_id; ?>"
     data-product_id="<?php echo $product_id; ?>" data-price="<?php echo $price; ?>"
     data-name="<?php echo $product_name; ?>"
>
    <div class="col-md-6 col-sm-7 col-xs-12 cart-item__info">
        <a class="product-preview cart-item__image-wrapper" href="#!goods/jajtsa-kurinye">
            <img src="image/<?php echo $img; ?>" alt="<?php echo $product_name; ?>"
                 title="Показать карточку товара" class="img-rounded cart-item__image"/>
        </a>
        <div class="cart-item__text">
            <div class="cart-item__title">
                <?php echo $product_name; ?>
            </div>
            <div class="cart-item__value">
                <?php echo $price; ?> <span class="CurrencyIcon CurrencyIcon--rub"></span>
                / 10 шт
            </div>
        </div>
    </div>
    <div class="col-md-6 col-sm-5 col-xs-12 cart-item__quantity">
        <div class="cart-item__counter plus_minus">
            <div class="cart-item__counter-btn cart-item__counter-btn_remove product-minus">
                <div class="cart-item__counter-btn-icon"
                     onclick="cart.minus('<?php echo $product_id; ?>');"></div>
            </div>
            <div class="cart-item__counter-number product-quantity">
                <span>1</span>
            </div>
            <div class="cart-item__counter-btn cart-item__counter-btn_plus product-plus">
                <div class="cart-item__counter-btn-icon"
                     onclick="cart.add('<?php echo $product_id; ?>', '1');"></div>
            </div>
        </div>
        <div class="cart-item__price">
            <span class="product_total">165&nbsp;<span class="CurrencyIcon CurrencyIcon--rub"></span></span>
        </div>
    </div>
    <div class="cart-item__remove" onclick="cart.remove('<?php echo $product_id; ?>');"></div>
</div>