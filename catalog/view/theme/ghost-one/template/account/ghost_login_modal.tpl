<div class="modal fade esh-modal" id="modal_loginform">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true"></span>
                </button>
            </div>
            <div id="login-form">
                <div class="modal-body">
                    <div class="row">
                        <div class="col-xs-12">
                            <div class="login_header">
                                Войти по почте
                            </div>
                        </div>
                        <div class="col-xs-12">
                            <div class="label_input">
                                <label>Ваш e-mail</label>
                                <input type="email" name="email" id="input-email" value="" />
                            </div>
                        </div>
                        <div class="col-xs-12">
                            <div class="label_input">
                                <label>Пароль</label>
                                <input type="password" name="password" id="input-password" value="" />
                            </div>
                        </div>
                        <div class="col-xs-12">
                            <div class="text-danger"></div>
                        </div>
                    </div>
                    <div class="clearfix"></div>
                    <div class="row">
                        <div class="col-xs-12 text-center">
                            <input type="submit" value="Войти" id="modal_login_btn" class="btn btn-lg btn-primary"/>
                        </div>
                        <div class="col-xs-12 text-center link-list">
                            <a id="quick_password_restore">Восстановить пароль</a>
                        </div>
                        <div class="col-xs-12 text-center link-list">
                            <a onclick="showAuth();">Назад</a>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer modal_login_footer">
                <div class="pull-left">
                </div>
            </div>
        </div>
    </div>
    <script type="text/javascript"><!--
        $('#modal_loginform').modal({show: true});
        //-->
    </script>
</div>
