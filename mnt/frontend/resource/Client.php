<?php

namespace frontend\resource;

class Client extends \common\models\Client
{
    /**
     * Propiedades virtuales para almacenar cantidades
     * @see \frontend\controllers\ClientController
     */
    public $profiles_count;
    public $addresses_count;

    /**
     * Columnas que retornará la API.
     * 
     * @return array
     */
    public function fields()
    {
        // Retornar clientes y la cantidad de perfiles y direcciones
        return [
            'id_client', 'client_name', 'profiles_count', 'addresses_count',
        ];
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
