<?php

class ControllerGhostPhoneApi extends Controller
{
    private $error = array();

    const SMS_URL = 'https://lcab.sms-uslugi.ru/json/v1.0';
    const SMS_TOKEN = 'wyex55j1diwaa8ecodtoe8gfvqmbdefs3y3ajh9ik3suosn0w4xvqp7yoozfdl9m';
    const SMS_TEXT_METHOD = '/sms/send/text';

    public function index()
    {
        $this->load->model('account/customer');
        unset($this->session->data['customer_auth']);
        unset($this->session->data['customer_id']);
        $data = array();
        $data['post_phone'] = $this->request->post['phone'];
        $phone = '7' . $this->request->post['phone'];
        $customer = $this->checkUser($phone);
        $data['telephone'] = $phone;

        if (!$customer) {
            $code = $this->generateCode();
            $this->session->data['phone_code'] = $code;
            $this->session->data['customer_auth'] = false;
            $this->session->data['customer_id'] = false;

//            $this->response->setOutput($this->load->view('account/ghost_presset', $data));

            $message = $this->prepareMessage($phone, $code);
            if ($message) {
                $sendMessage = json_decode($this->sendSmsMessage($message));

                if ($sendMessage->success) {
                    $this->session->data['phone_code'] = $code;
                    $this->response->setOutput($this->load->view('account/ghost_presset', $data));
                } elseif ($sendMessage->error->descr) {
                    $error['error'] = $sendMessage->error->descr;
                    $this->response->addHeader('Content-Type: application/json');
                    $this->response->setOutput(json_encode($error));
                }
            }

        } else {
            $code = $this->generateCode();
            $this->session->data['phone_code'] = $code;
            $this->session->data['customer_auth'] = true;
            $this->session->data['customer_id'] = $customer['customer_id'];

//            $this->response->setOutput($this->load->view('account/ghost_presset', $data));

            $message = $this->prepareMessage($phone, $code);
            if ($message) {
                $sendMessage = json_decode($this->sendSmsMessage($message));

                if ($sendMessage->success) {
                    $this->session->data['phone_code'] = $code;
                    $this->response->setOutput($this->load->view('account/ghost_presset', $data));
                } elseif ($sendMessage->error->descr) {
                    $error['error'] = $sendMessage->error->descr;
                    $this->response->addHeader('Content-Type: application/json');
                    $this->response->setOutput(json_encode($error));
                }
            }
        }
    }

    public function checkUser($phone)
    {
        $this->load->model('account/customer');
        $customer = $this->model_account_customer->getCustomerByPhone($phone);

        if ($customer) {
            return $customer;
        }

        return false;
    }

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
                'text' => "Зелённые луга, фермерские продукты. Ваш код: " . $code
            ]);

            return $message;
        }

        return false;
    }

    public function generateCode()
    {
        $arr = array(
            '1','2','3',
            '4','5','6',
            '7','8','9',
            '0');

        // Генерируем пароль для смс
        $pass = "";
        for($i = 0; $i < 4; $i++)
        {
            // Вычисляем произвольный индекс из массива
            $index = rand(0, count($arr) - 1);
            $pass .= $arr[$index];
        }

        return $pass;
    }
}