<?php
class ModelDesignGhostBanner extends Model {
    public function addBanner($data) {
        $this->db->query("INSERT INTO " . DB_PREFIX . "ghost_banner SET name = '" . $this->db->escape($data['name']) . "', status = '" . (int)$data['status'] . "'");

        $banner_id = $this->db->getLastId();

        if (isset($data['banner_image'])) {
            foreach ($data['banner_image'] as $language_id => $value) {
                foreach ($value as $ghost_banner_image) {
                    $this->db->query("INSERT INTO " . DB_PREFIX . "ghost_banner_image SET banner_id = '" . (int)$banner_id . "', language_id = '" . (int)$language_id . "', title = '" .  $this->db->escape($ghost_banner_image['title']) . "', tag = '" .  $this->db->escape($ghost_banner_image['tag']) . "', text = '" .  $this->db->escape($ghost_banner_image['text']) . "', link = '" .  $this->db->escape($ghost_banner_image['link']) . "', image = '" .  $this->db->escape($ghost_banner_image['image']) . "', sort_order = '" .  (int)$ghost_banner_image['sort_order'] . "'");
                }
            }
        }

        return $banner_id;
    }

    public function editBanner($banner_id, $data) {
        $this->db->query("UPDATE " . DB_PREFIX . "ghost_banner SET name = '" . $this->db->escape($data['name']) . "', status = '" . (int)$data['status'] . "' WHERE banner_id = '" . (int)$banner_id . "'");

        $this->db->query("DELETE FROM " . DB_PREFIX . "ghost_banner_image WHERE banner_id = '" . (int)$banner_id . "'");

        if (isset($data['banner_image'])) {
            foreach ($data['banner_image'] as $language_id => $value) {
                foreach ($value as $ghost_banner_image) {
                    $this->db->query("INSERT INTO " . DB_PREFIX . "ghost_banner_image SET banner_id = '" . (int)$banner_id . "', language_id = '" . (int)$language_id . "', title = '" .  $this->db->escape($ghost_banner_image['title']) . "', tag = '" .  $this->db->escape($ghost_banner_image['tag']) . "', text = '" .  $this->db->escape($ghost_banner_image['text']) . "', link = '" .  $this->db->escape($ghost_banner_image['link']) . "', image = '" .  $this->db->escape($ghost_banner_image['image']) . "', sort_order = '" . (int)$ghost_banner_image['sort_order'] . "'");
                }
            }
        }
    }

    public function deleteBanner($banner_id) {
        $this->db->query("DELETE FROM " . DB_PREFIX . "ghost_banner WHERE banner_id = '" . (int)$banner_id . "'");
        $this->db->query("DELETE FROM " . DB_PREFIX . "ghost_banner_image WHERE banner_id = '" . (int)$banner_id . "'");
    }

    public function getBanner($banner_id) {
        $query = $this->db->query("SELECT DISTINCT * FROM " . DB_PREFIX . "ghost_banner WHERE banner_id = '" . (int)$banner_id . "'");

        return $query->row;
    }

    public function getBanners($data = array()) {
        $sql = "SELECT * FROM " . DB_PREFIX . "ghost_banner";

        $sort_data = array(
            'name',
            'status'
        );

        if (isset($data['sort']) && in_array($data['sort'], $sort_data)) {
            $sql .= " ORDER BY " . $data['sort'];
        } else {
            $sql .= " ORDER BY name";
        }

        if (isset($data['order']) && ($data['order'] == 'DESC')) {
            $sql .= " DESC";
        } else {
            $sql .= " ASC";
        }

        if (isset($data['start']) || isset($data['limit'])) {
            if ($data['start'] < 0) {
                $data['start'] = 0;
            }

            if ($data['limit'] < 1) {
                $data['limit'] = 20;
            }

            $sql .= " LIMIT " . (int)$data['start'] . "," . (int)$data['limit'];
        }

        $query = $this->db->query($sql);

        return $query->rows;
    }

    public function getBannerImages($banner_id) {
        $ghost_banner_image_data = array();

        $ghost_banner_image_query = $this->db->query("SELECT * FROM " . DB_PREFIX . "ghost_banner_image WHERE banner_id = '" . (int)$banner_id . "' ORDER BY sort_order ASC");

        foreach ($ghost_banner_image_query->rows as $ghost_banner_image) {
            $ghost_banner_image_data[$ghost_banner_image['language_id']][] = array(
                'title'      => $ghost_banner_image['title'],
                'tag'      => $ghost_banner_image['tag'],
                'text'      => $ghost_banner_image['text'],
                'link'       => $ghost_banner_image['link'],
                'image'      => $ghost_banner_image['image'],
                'sort_order' => $ghost_banner_image['sort_order']
            );
        }

        return $ghost_banner_image_data;
    }

    public function getTotalBanners() {
        $query = $this->db->query("SELECT COUNT(*) AS total FROM " . DB_PREFIX . "ghost_banner");

        return $query->row['total'];
    }
}
