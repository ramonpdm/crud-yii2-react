<?php

namespace frontend\controllers;

use frontend\resource\Profile;
use yii\rest\ActiveController;

class ProfileController extends ActiveController
{
    public $modelClass = Profile::class;

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
