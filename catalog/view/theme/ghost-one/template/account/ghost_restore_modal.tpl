<div class="modal fade esh-modal esh-modal" id="modal_password_restore">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true"></span>
                </button>
            </div>
            <div id="modal_password_restore_form">
                <div class="modal-body">
                    <div class="row">
                        <div class="col-xs-12">
                            <div class="login_header">
                                Восстановление пароля
                            </div>
                        </div>
                    </div>
                    <div class="row" id="rest_res">
                        <div class="col-xs-12" id="resote_email">
                            <div class="label_input">
                                <label>E-mail</label>
                                <input type="email" name="email" id="input-email" value=""/>
                            </div>
                        </div>
                        <div class="col-xs-12">
                            <div id="result_restore"></div>
                        </div>
                        <div class="col-xs-12 text-center">
                            <input type="submit" value="Отправить пароль" id="modal_password_btn" class="btn btn-lg btn-primary"/>
                        </div>
                    </div>
                    <div class="row" id="restore_loader" style="display: none;">
                        <div class="col-xs-12">
                            <p class="text-center" style="min-height: 156px;">
                                <br/><br/><img src="/catalog/view/theme/ghost-one/image/manufacturer/button_load.svg" alt="more"
                                               class="manufacturers-page__preloader fa-spin"/>
                            </p>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-lg-12 text-center link-list">
                        <a href="/login" id="quick_password_restore_login">Назад</a>
                    </div>
                </div>
                <div class="modal_login_footer"></div>
            </div>
        </div>
    </div>
</div>
<script>
    $('#modal_password_restore').modal({show: true})
</script>
