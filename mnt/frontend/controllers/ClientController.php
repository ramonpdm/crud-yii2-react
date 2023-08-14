<?php

namespace frontend\controllers;

use frontend\resource\Client;
use yii\filters\auth\HttpBearerAuth;
use yii\rest\ActiveController;

class ClientController extends ActiveController
{
    public $modelClass = Client::class;

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
