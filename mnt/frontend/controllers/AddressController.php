<?php

namespace frontend\controllers;

use frontend\resource\Address;
use yii\rest\ActiveController;

class AddressController extends ActiveController
{
    public $modelClass = Address::class;

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
