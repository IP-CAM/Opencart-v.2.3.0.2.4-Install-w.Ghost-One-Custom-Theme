<div id="sms-code-form" class="form-horizontal">
    <div class="modal-body">
        <div class="row">
            <div class="col-xs-12">
                <div class="sms-code-header">
                    Мы отправили вам код подтверждения на номер <b><nobr>+<?php echo $telephone; ?></nobr></b>.
                </div>
            </div>
            <div class="col-xs-12">
                <div class="sms-code-block">
                    <div class="figure point active" id="sms-figure1" data_num="1"></div>
                    <div class="figure point" id="sms-figure2" data_num="2"></div>
                    <div class="figure point" id="sms-figure3" data_num="3"></div>
                    <div class="figure point" id="sms-figure4" data_num="4"></div>
                    <input type="tel" name="sms-code" id="sms" value="" maxlength="4" max="9999" min="0" size="4" autofocus autocomplete="off" im-insert="true">
                </div>
                <div id="sms-code__error" class="text-danger"></div>
            </div>
        </div>
        <div class="row" id="sms_footer">
            <div class="col-xs-12 sms_button_row">
                <button type="button" class="btn btn-lg btn-block btn-primary" id="sms-code__button"
                        onclick="SMScodeVerification();">
                    Войти
                </button>
            </div>
            <div class="col-xs-12">
                <div class="timer_tracker" id="timer_tracker">
                    Повторная отправка кода через <b></b>
                </div>
            </div>
            <div class="col-xs-12 sms-back">
                <a class="sms_link" onclick="showAuth();">Вернуться</a>
            </div>
        </div>
        <div class="row" id="sms_footer-default">
            <div class="col-xs-12">
                <p class="text-center" style="min-height: 156px;">
                    <br/><br/><img src="/catalog/view/theme/ghost-one/image/manufacturer/button_load.svg" alt="more"
                                   class="manufacturers-page__preloader fa-spin"/>
                </p>
            </div>
        </div>
    </div>
</div>
<script type="text/javascript">

    // осталось секунд, будет отрицательным, если время вышло
    window.seconds_left = 90;
    window.start_time = new Date().getTime();

    if (typeof window.sms_code_timer != "undefined") {
        clearTimeout(window.sms_code_timer);
    }

    window.sms_code_timer = setTimeout(function sms_code_timer_tick() {

        let timer_label = $('#timer_tracker b');
        let timer_tracker = $('#timer_tracker');

        window.seconds_left= 90 - Math.round((new Date().getTime() - window.start_time) / 1000);


        if (0 < + window.seconds_left) {
            timer_label.html(window.seconds_left);
            window.sms_code_timer = setTimeout(sms_code_timer_tick, 1000);
            $('#sms-code__button').prop('disabled', false);
        } else {
            clearTimeout(window.sms_code_timer);
            $('#sms-code__button').prop('disabled', true);
            $('#sms-code__error').html('Код устарел');
            timer_tracker.html('<a id="resendlink" onclick="resend();">Отправить код повторно</a>');
        }

    }, 1000);

    window.sms_check = setTimeout(smschange, 300)

    function resend () {
        $('#resendlink').remove()
        $('#sms_footer').hide()
        $('#sms_footer-default').show()
        $.ajax({
            url: 'index.php?route=ghost/phone_api',
            dataType: 'html',
            type: 'post',
            data: 'phone=<?php echo $post_phone; ?>',
            success: function (html) {
                $('#login-data').html(html);
            }
        });
    }

    $('#sms').focus();

    $('#sms-code__button').on('click', function (event) {
        SMScodeVerification();
    });

    function smschange() {
        if (window.sms_check != 'undefined') {
            clearTimeout(window.sms_check);
        }

        if (typeof $('#sms').val() == "undefined") {
            return;
        }

        let len = $('#sms').val().replace(/[^\d]/g, '').length + 1;
        for (let i = 1; i <= len; i++) {
            $('#sms-figure' + i).removeClass('point');
            $('#sms-figure' + i).removeClass('active');
        }

        for (let i = len; i <= 4; i++) {
            $('#sms-figure' + i).addClass('point');
            $('#sms-figure' + i).removeClass('active');
        }

        if (len == 0) {
            len = 1;
        }

        if (len == 5) {
            len = 4;
        }

        $('#sms-figure' + len).addClass('active');

        if ($('#sms').val().replace(/[^\d]/g, '').length == 4) {
            $('#sms').blur();
            if (window.sms_check != 'undefined') {
                clearTimeout(window.sms_check);
            }
            SMScodeVerification();
        } else {
            window.sms_check = setTimeout(smschange, 300);
            $('#sms-code__error').html();
        }
    }



    $('#sms').on('keyup', function () {
        $('#sms').val($('#sms').val().replace(/[^\d]/g, ''));
        smschange();
    });

    $('#sms').on('change', function () {
        $('#sms').val($('#sms').val().replace(/[^\d]/g, ''));
        smschange();
    });

    var caretPosition = {
        get : function (ctrl) {
            // IE < 9 Support
            if (document.selection) {
                ctrl.focus();
                var range = document.selection.createRange();
                var rangelen = range.text.length;
                range.moveStart ('character', -ctrl.value.length);
                var start = range.text.length - rangelen;
                return {'start': start, 'end': start + rangelen };
            }
            // IE >=9 and other browsers
            else if (ctrl.selectionStart || ctrl.selectionStart == '0') {
                return {'start': ctrl.selectionStart, 'end': ctrl.selectionEnd };
            } else {
                return {'start': 0, 'end': 0};
            }
        },
        set :function (ctrl, start, end) {
            // IE >= 9 and other browsers
            if(ctrl.setSelectionRange)
            {
                ctrl.focus();
                ctrl.setSelectionRange(start, end);
            }
            // IE < 9
            else if (ctrl.createTextRange) {
                var range = ctrl.createTextRange();
                range.collapse(true);
                range.moveEnd('character', end);
                range.moveStart('character', start);
                range.select();
            }
        }
    };

    $('.figure').on('click', function () {
        position = parseInt($(this).attr('data_num'));
        for (let i = 1; i <= 4; i++) {
            $('#sms-figure' + i).removeClass('active');
        }

        code_len = $('#sms').val().replace(/[^\d]/g, '').length;

        if (position > code_len){
            position = code_len;
        }

        if (code_len == 0){
            $('#sms-figure' + 1).addClass('active');
            position = 0;
        }else{
            $(this).addClass('active');
        }
        caretPosition.set(document.getElementById('sms'),position, position+1);
    });

    function SMScodeVerification() {
        if ( $('#sms').is('[readonly]') ) { return; }

        if (window.sms_check != 'undefined') {
            clearTimeout(window.sms_check);
        }

        $('#sms').prop('readonly', true);
        let code = $('#sms').val().replace(/[^\d]/g, '');

        if (code.length != 4) {
            $('#sms-code__error').html('Должно быть 4 цифры!');
            $('#sms').prop('readonly', false);
            return;
        }
        if (+seconds_left <= 0) {
            return;
        }

        $('#sms_footer').hide();
        $('#sms_footer-default').show();
        $('#sms-code__error').html();

        $.ajax({
            url: '/index.php?route=checkout/checkout_ajax/validatecode',
            dataType: 'json',
            type: 'post',
            data: 'phone=<?php echo $telephone; ?>&code=' + code,
            success: function (json) {
                if (json.error) {
                    $('#sms-code__error').html(json.error);
                    $('#sms_footer').show();
                    $('#sms_footer-default').hide();
                    $('#sms').prop('readonly', false);
                    return;
                }
                if (json.success) {

                    // metric.notify('authorization');

                    metric.var('customer_email', json.customer_email);
                    metric.var('customer_id', json.customer_id);
                    metric.var('customer_phone', '<?php echo $telephone; ?>');
                    metric.var('customer_name', json.customer_name);

                    if (json.authorization) {

                        //PUSH
                        var currentToken = window.localStorage.getItem('sentFirebaseMessagingToken');
                        if (currentToken) {
                            var url = '/index.php?route=api/webpush'; // адрес скрипта на сервере который сохраняет ID устройства
                            $.post(url, {
                                token: currentToken
                            });
                        }

                        // не успевает выполниться из-за редиректов
                        metric.notify('authorization');
                        if (location.hash == '#checkout=open' || location.hash == '#cart=open') {
                            // handleReloadWebViewForAndroid();
                            window.location.reload();
                        }else{
                            window.location="/my-account?account-profile=true";
                        }
                    } else if (json.registration) {

                        //PUSH
                        var currentToken = window.localStorage.getItem('sentFirebaseMessagingToken');
                        if (currentToken) {
                            var url = '/index.php?route=api/webpush'; // адрес скрипта на сервере который сохраняет ID устройства
                            $.post(url, {
                                token: currentToken
                            });
                        }

                        metric.notify('registration');
                        $.ajax({
                            url: '/index.php?route=checkout/checkout_ajax/finishRegistration',
                            dataType: 'html',
                            type: 'post',
                            success: function (html) {
                                $('#login-data').html(html);
                            }
                        });
                    }
                }
            }
        });
    }
</script>
