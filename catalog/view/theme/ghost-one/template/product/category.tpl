<?php echo $header; ?>


  <script type="text/javascript">
    'use strict';

    // немного красоты
    function CategoryLink(link) {
      link.innerHTML = '<i class="fa fa-spinner fa-pulse fa-3x fa-fw"></i>';
    }

    // Ограничиваем вывод категорий двумя строками
    $(function () {
      const collapsibleCategories = {
        menu: $('.new_menu'),

        expandButton: $('<a class="btn btn-link btn-category-expand" href="index.html#">Еще...</a>'),

        collapseButton: $('<a class="btn btn-link btn-category-collapse" href="index.html#">Скрыть</a>'),

        expanded: false,

        itemsToShow: 0,

        onExpand: function (e) {
          e.preventDefault();
          this.expand();
        },

        onCollapse: function (e) {
          e.preventDefault();
          this.collapse();
        },

        onCategoryLinkClick: function (e) {
          const $button = $(e.currentTarget);

          if ($button.hasClass('active')) {
            e.preventDefault();
          } else {
            this.getChildren().removeClass('active');
            $(e.currentTarget).addClass('active');
          }
        },

        init: function () {
          this.onExpand = this.onExpand.bind(this);
          this.onCollapse = this.onCollapse.bind(this);
          this.onResize = this.onResize.bind(this);
          this.onCategoryLinkClick = this.onCategoryLinkClick.bind(this);

          this.menu.on('click', '.btn-link:not(.btn-category-expand,.btn-category-collapse)', this.onCategoryLinkClick);
          this.menu.on('click', '.btn-category-expand', this.onExpand);
          this.menu.on('click', '.btn-category-collapse', this.onCollapse);

          $(window).on('resize', this.onResize);

          if (this.getChildren().filter('.active:not(.btn-link-all-categories)').length > 0) {
            this.expanded = true;
          }

          this.onResize();
        },

        getChildren: function () {
          var children;

          function getMemoizedChildren() {
            if (!children) {
              children = this.menu.children(':not(.btn-category-expand,.btn-category-collapse)');
            }

            return children;
          }

          return getMemoizedChildren.call(this);
        },

        getItemsToShow: function () {
          let itemsWidthSum = 0;
          let itemsToShow = 0;
          let currentRow = 1;

          const menuWidth = this.menu.width();

          const rowsLimit = 2;

          const children = this.getChildren();

          for (let i = 0, l = children.length; i < l; i++) {
            const $item = children.eq(i);
            const itemWidth = $item.outerWidth(true);

            let allowedWidth = menuWidth;

            if (currentRow === rowsLimit) {
              allowedWidth -= 70; // место под кнопку "Еще..."
            }

            if (itemsWidthSum + itemWidth > allowedWidth) {
              itemsWidthSum = 0;
              currentRow++;

              if (currentRow === rowsLimit) {
                allowedWidth -= 70; // место под кнопку "Еще..."
              }
            }

            // еще одно условие для выхода из цикла -- если элемент не влезает в строку
            if (currentRow === rowsLimit && itemsWidthSum + itemWidth > allowedWidth) {
              break;
            }

            if (currentRow > rowsLimit) {
              break;
            }

            itemsWidthSum += itemWidth;
            itemsToShow++;
          }

          return itemsToShow;
        },

        collapse: function () {
          const expandButton = this.expandButton;
          const collapseButton = this.collapseButton;

          collapseButton.detach();
          expandButton.detach();

          const children = this.getChildren();

          const itemsToShow = this.itemsToShow;

          this.menu.css('max-height', 84);

          setTimeout(function () {
            children.slice(0, itemsToShow - 1).css('display', 'inline-block');
            children.slice(itemsToShow).css('display', 'none');
          }, 400);

          if (children.length > itemsToShow) {
            this.menu.append(expandButton);
          }

          this.expanded = false;
        },

        expand: function () {
          this.collapseButton.detach();
          this.expandButton.detach();

          const children = this.getChildren();

          children.show();

          if (children.length > this.itemsToShow) {
            this.menu.append(this.collapseButton);
          }

          this.expanded = true;

          this.menu.css('max-height', this.menu[0].scrollHeight);
        },

        onResize: function () {
          this.itemsToShow = this.getItemsToShow();

          if (!this.expanded) {
            this.collapse();
          } else {
            this.expand();
          }
        }
      };

      collapsibleCategories.init();
    });
  </script>
  <div class="" id="under_top_menu">
    <div class="container">
      <div class="row">
        <div class="col-xs-12">
          <ul class="bread" itemtype="http://schema.org/BreadcrumbList" itemscope>
            <?php $countBread = count($breadcrumbs); ?>
            <?php $countPath = 0; ?>
            <?php foreach ($breadcrumbs as $breadcrumb) { ?>
              <?php $countPath++; ?>

              <li itemprop="itemListElement" itemtype="http://schema.org/ListItem" itemscope>
                <meta itemprop="item" content="<?php echo $breadcrumb['href']; ?>">
                <span itemprop="name"><?php echo $breadcrumb['text']; ?></span>
                <meta itemprop="position" content="<?php echo $countPath ?>">
              </li>

              <?php if ($countBread != $countPath) { ?>
                <i class="dot">•</i>
              <?php } ?>

            <?php } ?>
          </ul>
        </div>
        <h1 class="col-xs-12 top-menu-categories-title"><?php echo $heading_title; ?></h1>
      </div>
      <div class="row">
        <div class="col-lg-12 col-sm-12">
          <div class="new_menu" data-disable-collapse="1" itemscope="itemscope"
               itemtype="http://schema.org/SiteNavigationElement">
            <?php if ($headCategory['category_id'] == $current_category_id) { ?>
              <a href="<?php echo $headCategory['href']; ?>" itemprop="url" title="<?php echo $headCategory['name']; ?>"
                 class="btn active btn-link btn-link-all-categories">
                <span itemprop="name">
                  <?php echo $headCategory['name']; ?>
                </span>
              </a>
            <?php } else { ?>
              <a href="<?php echo $headCategory['href']; ?>" itemprop="url" title="<?php echo $headCategory['name']; ?>"
                 class="btn btn-link btn-link-all-categories">
                  <span itemprop="name">
                    <?php echo $headCategory['name']; ?>
                  </span>
              </a>
            <?php } ?>
            <?php foreach ($sub_categories as $category) { ?>
              <?php if ($category['category_id'] == $current_category_id) { ?>
                <a href="<?php echo $category['href']; ?>" itemprop="url" title="<?php echo $category['name']; ?>"
                   class="btn active btn-link">
                  <span itemprop="name">
                    <?php echo $category['name']; ?>
                  </span>
                </a>
              <?php } else { ?>
                <a href="<?php echo $category['href']; ?>" itemprop="url" title="<?php echo $category['name']; ?>"
                   class="btn btn-link">
                      <span itemprop="name">
                        <?php echo $category['name']; ?>
                      </span>
                </a>
              <?php } ?>
            <?php } ?>
          </div>
        </div>
      </div>
    </div>
  </div>

<div class="container">
  <div class="row"><?php echo $column_left; ?>
    <?php if ($column_left && $column_right) { ?>
    <?php $class = 'col-sm-6'; ?>
    <?php } elseif ($column_left || $column_right) { ?>
    <?php $class = 'col-sm-9'; ?>
    <?php } else { ?>
    <?php $class = 'col-sm-12'; ?>
    <?php } ?>
    <div id="content" class="<?php echo $class; ?>"><?php echo $content_top; ?>
      <?php if ($products) { ?>

      <div class="row">
        <div class="col-md-6 col-xs-6">
          <p class="category_results_count hidden-sm hidden-md hidden-xs"><?php echo count($products); ?> товаров</p>
        </div>
        <div class="col-md-6 col-xs-6">
          <div class="form-group input-group input-group-sm">
            <label class="input-group-addon" for="input-sort"><?php echo $text_sort; ?></label>
            <select id="input-sort" class="form-control" onchange="location = this.value;">
              <?php foreach ($sorts as $sorts) { ?>
              <?php if ($sorts['value'] == $sort . '-' . $order) { ?>
              <option value="<?php echo $sorts['href']; ?>" selected="selected"><?php echo $sorts['text']; ?></option>
              <?php } else { ?>
              <option value="<?php echo $sorts['href']; ?>"><?php echo $sorts['text']; ?></option>
              <?php } ?>
              <?php } ?>
            </select>
          </div>
        </div>
      </div>


      <div class="row">

        <?php foreach ($products as $product) { ?>

        <div class="product-layout product-grid row-eq-height col-lg-3 col-md-3 col-sm-4 col-xs-6" data-viewed="false">
          <div class="product-thumb thumbnail product2961">
            <div itemscope itemtype="http://schema.org/ImageObject" class="image">
              <a class="product-preview"
                 href="<?php echo $product['href']; ?>"
                 data-ajax-link="#!goods/<?php echo $product['href']; ?>">
                <div class="more"><i class="fa fa-search-plus"></i></div>
                <img itemprop="contentUrl"
                     data-src="<?php echo $product['thumb']; ?>"
                     width="268" height="268" loading="lazy" decoding="async"
                     alt="Филе грудки курицы" title="Филе грудки курицы" id="product-img-id2961"
                     class="img-responsive"/>
              </a>
              <span class="product-icons-wrap"></span>
            </div>
            <div class="caption with-price-old" data-product_id="2961">
              <div class="caption-title-wrap">
                <p><a class="product-preview"
                      href="<?php echo $product['href']; ?>"
                      data-ajax-link="#!goods/<?php echo $product['href']; ?>"><?php echo $product['name']; ?></a>
                </p>
                <div class="manufacturer_name">от Евгения Рошаля</div>
              </div>
              <?php if ($product['price']) { ?>

                <?php if (!$product['special']) { ?>
                  <div class="product-price-wrap">
                    <?php echo $product['price']; ?>
                    <div class="product-price-block">
                      <span class="product-price-line">
                        <div class="product-price">
                          <span class="price-new"><?php echo $product['special']; ?></span>
                        </div>
                        <div class="product-measure">/ 700 г. </div>
                      </span>
                <?php } else { ?>
                  <div class="product-price-wrap  with-price-old">
                    <span class="price-old"><?php echo $product['price']; ?></span>
                    <div class="product-price-block">
                      <span class="product-price-line">
                        <div class="product-price">
                          <span class="price-new"><?php echo $product['special']; ?></span>
                        </div>
                        <div class="product-measure">/ 700 г. </div>
                      </span>
                <?php } ?>
                      <?php $product_id = $product['product_id']; ?>
                      <button class="product-cart" value="Добавить в корзину" onclick="cart.add('<?php echo $product_id; ?>', '1');">
                        <i class="fas fa-shopping-basket fa-fw" aria-hidden="true"></i>
                      </button>

                      <?php if ($product['rating']) { ?>
                        <div class="category_rating">
                        <?php for ($i = 1; $i <= 5; $i++) { ?>
                        <?php if ($product['rating'] < $i) { ?>
                        <span class="fa fa-stack">
                        <img src="catalog/view/theme/ghost-one/image/star-solid.svg" alt="star-solid"/>
                      </span>
                        <?php } else { ?>
                        <span class="fa fa-stack">
                        <img src="catalog/view/theme/ghost-one/image/star-regular.svg" alt="star-solid"/>
                      </span>
                        <?php } ?>
                        <?php } ?>
                      </div>
                      <?php } ?>
                    </div>
                  </div>
              <?php } ?>


              <div class="product-wishlist" id="product-wishlist2961"
                   onclick="wishlist.add('2961');"><i class="far fa-heart" aria-hidden="true"></i>
              </div>
            </div>
          </div>
        </div>
        <?php } ?>

      </div>
      <div class="row">
        <div class="col-sm-6 text-left"><?php echo $pagination; ?></div>
        <div class="col-sm-6 text-right"><?php echo $results; ?></div>
      </div>
      <?php } ?>
      <?php if (!$categories && !$products) { ?>
      <p><?php echo $text_empty; ?></p>
      <div class="buttons">
        <div class="pull-right"><a href="<?php echo $continue; ?>" class="btn btn-primary"><?php echo $button_continue; ?></a></div>
      </div>
      <?php } ?>
      <?php echo $content_bottom; ?></div>
    <?php echo $column_right; ?></div>
</div>

<script type="text/javascript">
  'use strict';

  function loadProductHref () {
    [].forEach.call(document.querySelectorAll('.product-preview'), function (p_link) {
      if (p_link.getAttribute('data-ajax-link')) {
        p_link.setAttribute('href', p_link.getAttribute('data-ajax-link'));
        p_link.removeAttribute('data-ajax-link');
      }
    });
  }

  if (typeof loadProductHref === 'function') loadProductHref();

  function loadProductImage () {
    $('.product-layout.product-grid .product-thumb .image img').each(function () {
      $(this).on('load', function () {
        $(this).addClass('ready').closest('.image').addClass('loaded');
      });
    });
  }

  if (typeof loadProductImage === 'function') loadProductImage();

  function loadSrc () {
    document.querySelectorAll('[data-src]').forEach(function (el) {
      let
              tag = el.tagName,
              src = el.getAttribute('data-src');

      if (!src) return;

      switch (tag) {
        case 'IMG': {
          if (!el.getAttribute('src')) {
            el.setAttribute('src', src);

            if (el.complete) {
              el.removeAttribute('data-src');
            } else {
              el.addEventListener('load', function () {
                el.removeAttribute('data-src');
              });
            }
          }

          break;
        }
        case 'DIV': {
          let img = new Image();

          img.onload = function () {
            el.setAttribute('style', 'background-image: url(\'' + src + '\')');
            el.removeAttribute('data-src');
            el.classList.add('div-loaded');
          };

          img.src = src;

          break;
        }
        default:
          return;
      }
    });
  }

  function smoothLazyLoad () {
    if (typeof loadSrc === 'function') setTimeout(loadSrc, 30);
  }

  if (typeof smoothLazyLoad === 'function') smoothLazyLoad();

  function preloadImages (array) {
    if (!preloadImages.list) {
      preloadImages.list = [];
    }

    let list = preloadImages.list;

    for (let i = 0; i < array.length; i++) {
      let img = new Image();

      img.onload = function () {
        let index = list.indexOf(this);

        if (index !== -1) {
          list.splice(index, 1);
        }
      };

      list.push(img);

      img.src = array[i];
    }
  }

  /* native redirect to play store */
  if (window.location.href.indexOf('?app') > -1) {
    if (navigator.userAgent.toLowerCase().indexOf('android') > -1) {
      window.location.href = 'https://play.google.com/store/apps/details?id=com.app.esh_derevenskoe';
    }

    if (navigator.userAgent.toLowerCase().indexOf('iphone') > -1) {
      window.location.href = 'https://apps.apple.com/ru/app/id1543190599';
    }
  }

  function detectMobile () {
    let toMatch = [/Android/i, /webOS/i, /iPhone/i, /iPad/i, /iPod/i, /BlackBerry/i, /Windows Phone/i];

    return toMatch.some(function (toMatchItem) {
      return navigator.userAgent.match(toMatchItem);
    });
  }
</script>

<?php echo $footer; ?>
