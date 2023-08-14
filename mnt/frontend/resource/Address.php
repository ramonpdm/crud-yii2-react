<?php

namespace frontend\resource;

class Address extends \common\models\Address
{
    /**
     * Columnas que retornará la API.
     * 
     * @return array
     */
    public function fields()
    {
        return ['id_address', 'id_client', 'address', 'country'];
    }
}
