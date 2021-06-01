<?php

require 'Helper/Data.php';


$smsApi = new HelperData();

if (isset($_POST)) {
    $data = $_POST;

    if ($data['need_reg']) {
        $phone = '7' . $data['phone'];
        $code = $smsApi->generateCode();
        $message = $smsApi->prepareMessage($phone, $code);
        if ($message) {
            $sendMessage = json_decode($smsApi->sendSmsMessage($message));

            if ($sendMessage['success']) {
                // TO DO реализовать регистрацию юзера
            } elseif ($sendMessage->error->descr) {
                return $sendMessage->error->descr;
            }
        }
    }
}