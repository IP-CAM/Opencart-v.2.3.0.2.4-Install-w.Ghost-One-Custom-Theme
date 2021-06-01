<?php

class ControllerCheckoutCheckoutAjax extends Controller
{
    private $error = array();

    public function validatecode()
    {
        $this->load->model('account/customer');

        $data = array();
        $json = array();
        $customer = array();

        $customer = [
          'email' => '',
          'fax' => '',
          'password' => '',
          'firstname' => '',
          'lastname' => '',
          'company' => '',
          'address_1' => '',
          'address_2' => '',
          'city' => '',
          'postcode' => '',
          'country_id' => '',
          'zone_id' => ''
        ];

        $code = $this->session->data['phone_code'];

        if ($code == $this->request->post['code'] && !$this->session->data['customer_auth']) {
            $customer['telephone'] = $this->request->post['phone'];
            $customer_id = $this->model_account_customer->addPhoneCustomer($customer);
            $data['customer_id'] = $customer_id;

            $json['registration'] = 1;
            $json['customer_email'] = '';
            $json['customer_name'] = '';
            $json['error'] = '';
            $json['success'] = true;
            $json['customer_id'] = $customer_id;

            $this->session->data['customer_id'] = $customer_id;
            $this->session->data['telephone'] = $this->request->post['phone'];

            $this->response->addHeader('Content-Type: application/json');
            $this->response->setOutput(json_encode($json));
        } elseif($code == $this->request->post['code'] && $this->session->data['customer_auth'] && $this->session->data['customer_id']) {
            $customer = $this->model_account_customer->getCustomer($this->session->data['customer_id']);

            $json['authorization'] = 1;
            $json['customer_email'] = '';
            $json['customer_name'] = '';
            $json['error'] = '';
            $json['success'] = true;
            $json['customer_id'] = $customer['customer_id'];

            $this->response->addHeader('Content-Type: application/json');
            $this->response->setOutput(json_encode($json));
        } else {
            $error['error'] = "Неверный код";
            $this->response->addHeader('Content-Type: application/json');
            $this->response->setOutput(json_encode($error));
        }
    }

    public function validateRegistration()
    {
        $this->load->model('account/customer');

        $data = array();

        $json = array();

        $customer = array();

        $customer_data = $this->model_account_customer->getCustomerByEmail($this->request->post['email']);

        if (!$customer_data) {
            $cust_data = explode(' ', $this->request->post['name']);

            $customer = [
                'email' => $this->request->post['email'],
                'fax' => '',
                'password' => '',
                'firstname' => $cust_data[0],
                'lastname' => $cust_data[1],
                'telephone' => $this->session->data['telephone'],
                'company' => '',
                'address_1' => '',
                'address_2' => '',
                'city' => '',
                'postcode' => '',
                'country_id' => '',
                'zone_id' => ''
            ];

            $json['error'] = '';
            $json['success'] = true;

            $this->model_account_customer->editAjaxCustomer($this->session->data['customer_id'], $customer);
            $this->response->addHeader('Content-Type: application/json');
            $this->response->setOutput(json_encode($json));
        } else {
            $json['error'] = 'Такой email уже занят!';
            $json['success'] = false;

            $this->response->addHeader('Content-Type: application/json');
            $this->response->setOutput(json_encode($json));
        }
    }

    public function finishRegistration()
    {
        $data = array();

        $this->response->setOutput($this->load->view('account/ghost_data_reg', $data));
    }
}