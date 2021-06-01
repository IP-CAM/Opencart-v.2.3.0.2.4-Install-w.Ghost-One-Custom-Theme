<?php

class ModelToolGhostProduct extends Model
{

    public function getProductIdByUrl($url)
    {
        $query = $this->db->query("SELECT * FROM " . DB_PREFIX . "url_alias WHERE keyword = '" . $this->db->escape($url) . "'");

        return $query;
    }

}