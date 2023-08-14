<?php

namespace frontend\resource;

class Client extends \common\models\Client
{
    /**
     * Columnas que retornará la API.
     * 
     * @return array
     */
    public function fields()
    {
        return ['id_client', 'client_name'];
    }

    /**
     * Columnas extras que retornará la API.
     * usando el parámetro 'expand'
     * 
     * @return array
     */
    public function extraFields()
    {
        return ['addresses', 'profiles'];
    }


    /**
     * Gets query for [[Addresses]].
     *
     * @return \yii\db\ActiveQuery|\common\models\query\AddressQuery
     */
    public function getAddresses()
    {
        // Especificar la clase creada en \frontend\resource
        return $this->hasMany(Address::class, ['id_client' => 'id_client']);
    }

    /**
     * Gets query for [[Profiles]].
     *
     * @return \yii\db\ActiveQuery|\common\models\query\ProfileQuery
     */
    public function getProfiles()
    {
        // Especificar la clase creada en \frontend\resource
        return $this->hasMany(Profile::class, ['id_client' => 'id_client']);
    }
}
