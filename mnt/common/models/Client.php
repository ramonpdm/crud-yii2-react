<?php

namespace common\models;

use Yii;

/**
 * This is the model class for table "{{%client}}".
 *
 * @property int $id_client
 * @property string $client_name
 * @property string $created_at
 * @property string|null $updated_at
 *
 * @property Address[] $addresses
 * @property Profile[] $profiles
 */
class Client extends \yii\db\ActiveRecord
{
    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return '{{%client}}';
    }


    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['client_name'], 'required'],
            [['created_at', 'updated_at'], 'safe'],
            [['client_name'], 'string', 'max' => 100],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            'id_client' => 'Id Client',
            'client_name' => 'Client Name',
            'created_at' => 'Created At',
            'updated_at' => 'Updated At',
        ];
    }

    /**
     * Gets query for [[Addresses]].
     *
     * @return \yii\db\ActiveQuery|\common\models\query\AddressQuery
     */
    public function getAddresses()
    {
        return $this->hasMany(Address::class, ['id_client' => 'id_client']);
    }

    /**
     * Gets query for [[Profiles]].
     *
     * @return \yii\db\ActiveQuery|\common\models\query\ProfileQuery
     */
    public function getProfiles()
    {
        return $this->hasMany(Profile::class, ['id_client' => 'id_client']);
    }

    /**
     * {@inheritdoc}
     * @return \common\models\query\ClientQuery the active query used by this AR class.
     */
    public static function find()
    {
        return new \common\models\query\ClientQuery(get_called_class());
    }
}
