<?php

/**
 * Class ControllerSettingGhostSetting
 * Custom Aka gh0st_developer settings OpenCart
 */
class ControllerSettingGhostSetting extends Controller
{
    /**
     * @var array
     */
    private $error = [];

    /**
     * Index Method Controller
     */
    public function index()
    {
        // Load Locale and Model
        $this->load->language('setting/ghost_setting');
        $this->document->setTitle($this->language->get('heading_title'));
        $this->load->model('setting/setting');

        // Include Localisation
        $data['heading_title'] = $this->language->get('heading_title');

        // Include Global Variables Localisation
        $data['gh_tab_general'] = $this->language->get('gh_tab_general');
        $data['gh_entry_general_market'] = $this->language->get('gh_entry_general_market');
        $data['gh_entry_min_price'] = $this->language->get('gh_entry_min_price');

        // Include Re-captcha Localisation
        $data['gh_entry_re_captcha'] = $this->language->get('gh_entry_re_captcha');
        $data['gh_entry_enable_re_captcha'] = $this->language->get('gh_entry_enable_re_captcha');
        $data['gh_entry_code_re_captcha'] = $this->language->get('gh_entry_code_re_captcha');

        // Include Optional Variables Localisation
        $data['gh_text_edit'] = $this->language->get('gh_text_edit');
        $data['gh_button_save'] = $this->language->get('gh_button_save');
        $data['gh_button_cancel'] = $this->language->get('gh_button_cancel');
        $data['gh_text_yes'] = $this->language->get('gh_text_yes');
        $data['gh_text_no'] = $this->language->get('gh_text_no');

        // Standard OpenCart Logic Token Work
        $data['action'] = $this->url->link('setting/ghost_setting', 'token=' . $this->session->data['token'], true);
        $data['cancel'] = $this->url->link('setting/ghost_setting', 'token=' . $this->session->data['token'], true);
        $data['token'] = $this->session->data['token'];

        // Error Loading
        if (isset($this->error['warning'])) {
            $data['error_warning'] = $this->error['warning'];
        } else {
            $data['error_warning'] = '';
        }

        if (isset($this->error['gh_code_re_captcha'])) {
            $data['error_gh_code_re_captcha'] = $this->error['gh_code_re_captcha'];
        } else {
            $data['error_gh_code_re_captcha'] = '';
        }

        // Post Data Loading
        if (isset($this->request->post['config_gh_code_re_captcha'])) {
            $data['config_gh_code_re_captcha'] = $this->request->post['config_gh_code_re_captcha'];
        } else {
            $data['config_gh_code_re_captcha'] = $this->config->get('config_gh_code_re_captcha');
        }

        if (isset($this->request->post['config_gh_enable_re_captcha'])) {
            $data['config_gh_enable_re_captcha'] = $this->request->post['config_gh_enable_re_captcha'];
        } else {
            $data['config_gh_enable_re_captcha'] = $this->config->get('config_gh_enable_re_captcha');
        }

        if (isset($this->session->data['success'])) {
            $data['success'] = $this->session->data['success'];

            unset($this->session->data['success']);
        } else {
            $data['success'] = '';
        }

        // Template Variables
        $data['header'] = $this->load->controller('common/header');
        $data['column_left'] = $this->load->controller('common/column_left');
        $data['footer'] = $this->load->controller('common/footer');

        if (($this->request->server['REQUEST_METHOD'] == 'POST') && $this->validate()) {
            $this->model_setting_setting->editSetting('config_gh', $this->request->post);

            $this->session->data['success'] = $this->language->get('text_success');
            $this->response->redirect($this->url->link('setting/ghost_setting', 'token=' . $this->session->data['token'], true));
        }

        // Render Options Template
        $this->response->setOutput($this->load->view('setting/ghost_setting', $data));
    }

    public function validate()
    {
        if (!$this->user->hasPermission('modify', 'setting/ghost_setting')) {
            $this->error['warning'] = $this->language->get('error_permission');
        }

        if (!$this->request->post['config_gh_code_re_captcha']) {
            $this->error['gh_code_re_captcha'] = $this->language->get('error_limit');
        }

        return !$this->error;
    }

    /**
     * @param false $route
     * @param false $data
     * @param false $output
     */
    public function addSubmenu(&$route = false, &$data = false, &$output = false){
        $module_name = $this->load->language('design/ghost_banner');
        $ghost_menu = [
            'id' => 'ghost-menu',
            'icon' => 'fa-fighter-jet',
            'name'     => 'Ghost_>Menu',
            'href'     => "",
            'children' => array(
                array(
                    'name'     => $module_name['heading_title'],
                    'href'     => $this->url->link('design/ghost_banner', 'token=' . $this->session->data['token'], true),
                    'children' => array()
                ),
                array(
                    'name'     => $this->load->language('setting/ghost_setting')['heading_title'],
                    'href'     => $this->url->link('setting/ghost_setting', 'token=' . $this->session->data['token'], true),
                    'children' => array()
                )
            )
        ];
        array_unshift($data['menus'], $ghost_menu);
    }
}