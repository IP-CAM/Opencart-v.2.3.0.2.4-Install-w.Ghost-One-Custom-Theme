<form id="finish-registration-form" class="form-horizontal">
    <div class="modal-body">
        <div class="row">
            <div class="col-xs-12">
                <div class="finish-registration_header">
                    Для завершения регистрации укажите свои <span><b>Имя, Фамилию</b> и <b>E-mail</b></span>.
                </div>
            </div>
            <div class="col-xs-12">
                <div class="finish-registration_name">
                    <label>Имя и фамилия</label>
                    <input type="text" name="finish-registration_name" id="finish-registration_name" value=""/>
                </div>
            </div>
            <div class="col-xs-12">
                <div class="finish-registration_email">
                    <label>Ваш E-mail</label>
                    <input type="text" name="finish-registration_email" id="finish-registration_email" value=""/>
                </div>
            </div>
            <div class="col-xs-12">
                <div id="registration_error"></div>
            </div>
        </div>
        <div class="row" id="finish-registration_footer">
            <div class="col-xs-12 registration_button_row">
                <button type="button" class="btn btn-lg btn-block btn-primary" onclick="validateRegistration();">
                    Продолжить
                </button>
            </div>
        </div>
        <div class="row" id="finish-registration-default">
            <div class="col-xs-12">
                <p class="text-center" style="min-height: 156px;">
                    <br/><br/><img src="/catalog/view/theme/ghost-one/image/manufacturer/button_load.svg" alt="more"
                                   class="manufacturers-page__preloader fa-spin"/>
                </p>
            </div>
        </div>
    </div>
</form>
<script type="text/javascript">
    function validateEmail(email) {
        var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
        return re.test(String(email).toLowerCase());
    }

    function validateRegistration() {

        let name_check = $('#finish-registration_name').val().replace(' ', '');
        let name = $('#finish-registration_name').val().trim();

        let email_check = $('#finish-registration_email').val().replace(' ', '');
        let email = $('#finish-registration_email').val().trim();

        $('#registration_error').html('');

        if (!name_check) {
            $('#registration_error').html('Не заполнено поле имя и фамилия');
            return;
        }

        if (!email_check) {
            $('#registration_error').html('Не заполнен e-mail');
            return;
        }

        if (!validateEmail(email)) {
            $('#registration_error').html('Укажите правильный e-mail адрес');
            return;
        }

        $('#finish-registration_footer').hide();
        $('#finish-registration-default').show();

        $.ajax({
            url: '/index.php?route=checkout/checkout_ajax/validateRegistration',
            dataType: 'json',
            type: 'post',
            data: 'name=' + encodeURIComponent(name) + '&email=' + encodeURIComponent(email),
            success: function (json) {
                if (json.need_auth) {
                    showAuth();
                    return;
                }

                if (json.error) {
                    $('#registration_error').html(json.error);
                    $('#finish-registration_footer').show();
                    $('#finish-registration-default').hide();
                    return;
                }

                if (json.success) {
                    if (location.hash == '#checkout=open' || location.hash == '#cart=open') {
                        // handleReloadWebViewForAndroid();
                        window.location.reload();
                    } else {
                        window.location = "/my-account?account-profile=true";
                    }
                } else {
                    $('#finish-registration_footer').show();
                    $('#finish-registration-default').hide();
                }
            }
        });

    }
</script>
