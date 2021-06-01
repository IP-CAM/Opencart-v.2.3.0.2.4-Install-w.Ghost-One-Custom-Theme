<?php

class HelperData
{
    const SMS_URL = 'https://lcab.sms-uslugi.ru/json/v1.0';
    const SMS_TOKEN = 'wyex55j1diwaa8ecodtoe8gfvqmbdefs3y3ajh9ik3suosn0w4xvqp7yoozfdl9m';
    const SMS_TEXT_METHOD = '/sms/send/text';

    public function sendSmsMessage($message)
    {
        $ch = curl_init();
        curl_setopt_array($ch, [
            CURLOPT_URL => self::SMS_URL . self::SMS_TEXT_METHOD,
            CURLOPT_POST => true,
            CURLOPT_HTTPHEADER => [
                "X-Token: " . self::SMS_TOKEN . "",
                "Content-Type: application/json"
            ],
            CURLOPT_POSTFIELDS => json_encode($message),
            CURLOPT_RETURNTRANSFER => true
        ]);

        $result = curl_exec($ch);

        return $result;
    }

    public function prepareMessage($phone, $code)
    {
        $message = [];

        if (!empty($phone) && !empty($code)) {
            $message['messages'] = array([
                'recipient' => $phone,
                'text' => "Тестирование регистрации! Зелённые луга новый сайт, Благодарим за регистрацию! Ваш код: " . $code
            ]);

            return $message;
        }

        return false;
    }

    public function generateCode()
    {
        $arr = array('a','b','c','d','e','f',
            'g','h','i','j','k','l',
            'm','n','o','p','r','s',
            't','u','v','x','y','z',
            'A','B','C','D','E','F',
            'G','H','I','J','K','L',
            'M','N','O','P','R','S',
            'T','U','V','X','Y','Z',
            '1','2','3','4','5','6',
            '7','8','9','0');

        // Генерируем пароль для смс
        $pass = "";
        for($i = 0; $i < 5; $i++)
        {
            // Вычисляем произвольный индекс из массива
            $index = rand(0, count($arr) - 1);
            $pass .= $arr[$index];
        }

        return $pass;
    }
}