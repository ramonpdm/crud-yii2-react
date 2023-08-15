<?php

namespace frontend\controllers;

use frontend\resource\Client;
use yii\data\ActiveDataProvider;
use yii\rest\ActiveController;
use yii\db\Query;

class ClientController extends ActiveController
{
    public $modelClass = Client::class;

    public function actions()
    {
        $actions = parent::actions();

        // Sobrescribir la acción 'index' que por defecto
        // retorna sólo las tablas de 'Clients'
        $actions['index']['prepareDataProvider'] = [$this, 'prepareDataProvider'];

        return $actions;
    }

    public function prepareDataProvider()
    {
        $getProfilesCount = (new Query())
            ->select('COUNT(id_profile)')
            ->from('profile')
            ->where('id_client = client.id_client');

        $getAddressesCount = (new Query())
            ->select('COUNT(id_address)')
            ->from('address')
            ->where('id_client = client.id_client');

        // Retornar el listado de clientes y cantidad 
        // de perfiles y direcciones de cada uno
        return new ActiveDataProvider([
            'query' => $this->modelClass::find()
                ->select([
                    'client.*',
                    'profiles_count' => $getProfilesCount,
                    'addresses_count' => $getAddressesCount,
                ]),
        ]);
    }

    public function behaviors()
    {
        $behaviors = parent::behaviors();

        // Permitir acceder desde ReactJS configurando las CORS
        $behaviors['corsFilter'] = array(
            'class' => \yii\filters\Cors::class,
        );

        return $behaviors;
    }
}
