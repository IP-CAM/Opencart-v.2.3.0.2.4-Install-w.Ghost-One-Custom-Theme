<?php echo $header; ?><?php echo $column_left; ?>
<div id="content">
    <div class="page-header">
        <div class="container-fluid">
            <div class="pull-right">
                <button type="submit" id="button-save" form="form-setting" data-toggle="tooltip" title="<?php echo $gh_button_save; ?>" class="btn btn-primary"><i class="fa fa-save"></i></button>
                <a href="<?php echo $cancel; ?>" data-toggle="tooltip" title="<?php echo $gh_button_cancel; ?>" class="btn btn-default"><i class="fa fa-reply"></i></a></div>
            <h1><?php echo $heading_title; ?></h1>
        </div>
    </div>
    <div class="container-fluid">
        <?php if ($error_warning) { ?>
        <div class="alert alert-danger">
            <i class="fa fa-exclamation-circle"></i> <?php echo $error_warning; ?>
            <button type="button" class="close" data-dismiss="alert">&times;</button>
        </div>
        <?php } ?>
        <?php if ($success) { ?>
        <div class="alert alert-success">
            <i class="fa fa-check-circle"></i><?php echo $success; ?>
            <button type="button" class="close" data-dismiss="alert">&times;</button>
        </div>
        <?php } ?>
        <div class="panel panel-default">
            <div class="panel-heading">
                <h3 class="panel-title">
                    <i class="fa fa-pencil"></i>
                    <?php echo $gh_text_edit; ?>
                </h3>
            </div>
            <div class="panel-body">
                <form action="<?php echo $action; ?>" method="post" enctype="multipart/form-data" id="form-setting" class="form-horizontal">
                    <ul class="nav nav-tabs">
                        <li class="active">
                            <a href="#tab-general" data-toggle="tab"><?php echo $gh_tab_general; ?></a>
                        </li>
                    </ul>
                    <div class="tab-content">
                        <div class="tab-pane active" id="tab-general">
                            <fieldset>
                                <legend><?php echo $gh_entry_re_captcha; ?></legend>
                                <div class="form-group">
                                    <label class="col-sm-2 control-label"><span data-toggle="tooltip" title="<?php echo $gh_entry_enable_re_captcha; ?>"><?php echo $gh_entry_enable_re_captcha; ?></span></label>
                                    <div class="col-sm-10">
                                        <label class="radio-inline">
                                            <?php if ($config_gh_enable_re_captcha) { ?>
                                            <input type="radio" name="config_gh_enable_re_captcha" value="1" checked="checked" />
                                            <?php echo $gh_text_yes; ?>
                                            <?php } else { ?>
                                            <input type="radio" name="config_gh_enable_re_captcha" value="1" />
                                            <?php echo $gh_text_yes; ?>
                                            <?php } ?>
                                        </label>
                                        <label class="radio-inline">
                                            <?php if (!$config_gh_enable_re_captcha) { ?>
                                            <input type="radio" name="config_gh_enable_re_captcha" value="0" checked="checked" />
                                            <?php echo $gh_text_no; ?>
                                            <?php } else { ?>
                                            <input type="radio" name="config_gh_enable_re_captcha" value="0" />
                                            <?php echo $gh_text_no; ?>
                                            <?php } ?>
                                        </label>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-sm-2 control-label" for="input-admin-limit"><span data-toggle="tooltip" title="<?php echo $gh_entry_code_re_captcha; ?>"><?php echo $gh_entry_code_re_captcha; ?></span></label>
                                    <div class="col-sm-10">
                                        <input type="text" name="config_gh_code_re_captcha" value="<?php echo $config_gh_code_re_captcha; ?>" placeholder="<?php echo $gh_entry_code_re_captcha; ?>" id="input-admin-limit" class="form-control" />
                                        <?php if ($error_gh_code_re_captcha) { ?>
                                            <div class="text-danger"><?php echo $error_gh_code_re_captcha; ?></div>
                                        <?php } ?>
                                    </div>
                                </div>
                            </fieldset>
                        </div>
                    </div>
            </div>
            </form>
        </div>
    </div>
</div>
<?php echo $footer; ?>
