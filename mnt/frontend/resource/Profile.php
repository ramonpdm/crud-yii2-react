<?php

namespace frontend\resource;

class Profile extends \common\models\Profile
{
    /**
     * Columnas que retornará la API.
     * 
     * @return array
     */
    public function fields()
    {
        return ['id_profile', 'id_client', 'email', 'phone'];
    }
}
