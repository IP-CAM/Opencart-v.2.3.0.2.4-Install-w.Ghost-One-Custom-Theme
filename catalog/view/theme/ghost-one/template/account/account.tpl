<?php echo $header; ?>
<div class="container">
  <?php if ($success) { ?>
    <div class="alert alert-success">
      <i class="fa fa-check-circle"></i>
      <?php echo $success; ?>
    </div>
  <?php } ?>
  <div class="row">
    <aside id="column-left" class="col-md-3 col-xs-12">
      <div id="menu-lc" class="list-group menu-account">
        <div class="top-menu visible-sm visible-xs">
          <div class="top-menu-wrap">
            <a href="https://esh-derevenskoe.ru/my-account" class="active">
              <i class="fa fa-fw fa-user-circle"></i>
              <span>
                Кабинет
              </span>
              <span class="menu-account__link-arrow"></span>
            </a>
          </div>
        </div>
        <div class="menu-wrap">
          <a href="https://esh-derevenskoe.ru/my-account" class="active visible-md visible-lg">
            <i class="fa fa-fw fa-user-circle"></i>
            <span>
              Кабинет
            </span>
          </a>
          <a href="<?php echo $edit; ?>" class="">
            <i class="fa fa-fw fa-address-book"></i>
            <span>
              <?php echo $text_edit; ?>
            </span>
          </a>
          <a href="<?php echo $password; ?>" class="">
            <i class="fa fa-fw fa-lock"></i>
            <span>
              <?php echo $text_password; ?>
            </span>
          </a>
          <a href="<?php echo $address; ?>" class="">
            <i class="fa fa-fw fa-map-marker"></i>
            <span>
              <?php echo $text_address; ?>
            </span>
          </a>
          <a href="<?php echo $wishlist; ?>" class="">
            <i class="fa fa-fw fa-heart"></i>
            <span>
              <?php echo $text_wishlist; ?>
            </span>
          </a>
          <a href="<?php echo $order; ?>" class="">
            <i class="fa fa-fw fa-file-alt"></i>
            <span>
              <?php echo $text_order; ?>
            </span>
          </a>
          <hr>
          <a href="https://esh-derevenskoe.ru/logout" class="list-group-item">
            <i class="fas fa-fw fa-sign-out-alt"></i>
            <span>
              Выход
            </span>
          </a>
        </div>
      </div>
      <script>
        $(document).ready(function() {
          $('.menu-account .top-menu').on('click', function() {
            $(".menu-account").toggleClass('open');
            return false;
          });

          if ($(window).outerWidth() < 992) {
            //для планшетов и мобил сворачиваем и анимируем меню
            //для страницы профиль при авторизации всегда меню раскрыто
            if (-1 < document.location.href.indexOf('my-account') && -1 < document.location.href.indexOf('account-profile')) {
              $(".menu-account").addClass('open');
            }
          }
        });
      </script>
    </aside>
    <div class="account_wrap">
      <div class="account-container">
        <div id="content" class="col-sm-12 col-md-9">
          <div class="panel panel-default">
            <div class="panel-body">
              <h2 class="text-center"><strong>Моя информация</strong></h2>
              <br>
              <form class="form-horizontal">
                <div class="form-group">
                  <label class="col-sm-3 control-label">Фамилия и имя</label>
                  <div class="col-sm-9">
                    <p class="form-control-static">Иван Простаков</p>
                  </div>
                </div>
                <div class="form-group">
                  <label class="col-sm-3 control-label">Сумма заказов
                  </label>
                  <div class="col-sm-9">
                    <p class="form-control-static">0 рублей</p>
                  </div>
                </div>
                <div class="form-group">
                  <label class="col-sm-3 control-label">Контактный телефон</label>
                  <div class="col-sm-9">
                    <p class="form-control-static">9656228993</p>
                  </div>
                </div>
                <div class="form-group">
                  <label class="col-sm-3 control-label">Контактный e-mail</label>
                  <div class="col-sm-9">
                    <p class="form-control-static">ivankoprost78@gmail.com</p>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
<?php echo $footer; ?> 