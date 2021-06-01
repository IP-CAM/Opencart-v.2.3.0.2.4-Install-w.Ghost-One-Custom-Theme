<div id="login-form" class="form-horizontal">
    <div class="modal-body">
        <div class="row">
            <div class="col-xs-12">
                <div class="login_header">
                    Вход или регистрация </div>
            </div>
            <div class="col-xs-12">
                <div class="login_header_info">
                    Введите номер телефона, чтобы войти, либо зарегистрироваться, если у вас нет аккаунта. </div>
            </div>
            <div class="col-xs-12">
                <div class="login_phone">
                    <label>Ваш телефон</label>
                    <input type="tel" name="phone_number" id="login_phone_number" value="" autofocus autocomplete="off" im-insert="true"/>
                </div>
            </div>
            <div class="col-xs-12 login_button_row">
                <button type="button" class="btn btn-lg btn-block btn-primary" id="" onclick="validatePhoneNumber();">
                    Продолжить
                </button>
            </div>
            <div class="col-xs-12 text-center manual_login_cont">
                <a id="login_manual">Войти по почте</a>
            </div>
            <div class="col-xs-12">
                <div class="login_oferta">
                    При входе или регистрации вы соглашаетесь с <a
                            href="https://esh-derevenskoe.ru/index.php?route=information/information/oferta_modal" class="oferta_modal">офертой</a>
                    и <a href="https://esh-derevenskoe.ru/index.php?route=information/information/policy_modal" class="policy_modal">политикой
                        конфиденциальности</a>
                </div>
            </div>
        </div>
    </div>
    <script src="https://www.google.com/recaptcha/api.js?render=<?php echo $recaptcha_code; ?>"></script>
    <script type="text/javascript">
        metric.notify('view_authorization_form'); // оповестим о событии

        window.onload = function () {
            $("#login-form").on('click', '.login_phone', function () {
                $('#login_phone_number').selectionStart = $('#login_phone_number').val().length;
            });

            $("#login-form #login_phone_number").mask("+7 (999) 999-99-99", {autoclear: false});
        };

        $("#login-form").on('click', '.login_phone', function () {
            $('#login_phone_number').selectionStart = $('#login_phone_number').val().length;
        });

        $('#login_phone_number').keydown(function (e) {
            if (e.keyCode === 13) {
                validatePhoneNumber();
            }
        });

        if (typeof $("#login-form #login_phone_number").mask != "undefined") {
            $("#login-form #login_phone_number").mask("+7 (999) 999-99-99", {autoclear: false});
        }

        $('#login_phone_number').selectionStart = $('#login_phone_number').val().length;

        function validatePhoneNumber() {
            let phone = $('#login_phone_number').val().replace(/[^\d]/g, '').slice(1);
            $('.login_phone').removeClass('has-error');

            if (!isPhonevValid('8' + phone)) {
                $('.login_phone').addClass('has-error');
                return;
            }

            metric.notify('click_send_sms_code'); // оповестим о событии

            grecaptcha.ready(function () {
                grecaptcha.execute('<?php echo $recaptcha_code; ?>', {action: 'login'}).then(function (token) {
                    sendCode(phone, token);
                });
            });
        }

        $('#login-form').on('click', '#login_manual', function () {
            $('.modal').modal('hide');
            $.ajax({
                type: 'GET',
                url: 'index.php?route=account/login/modal_loginform',
                async: false,
                success: function (data) {
                    $('body').append(data);
                }
            });
        });

        function sendCode(phone, token) {
            let data = {
                phone: phone,
                need_reg: 1            }
            if (typeof token !== 'undefined') {
                data.token = token
            }

            $('#login-data').html($('#login-data-default').html())
            $.ajax({
                url: 'index.php?route=ghost/phone_api',
                dataType: 'html',
                type: 'post',
                data: data,
                success: function (html) {
                    $('#login-data').html(html)
                }
            })
        }
    </script>
</div>
