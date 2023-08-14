<?php

namespace common\models;

use Yii;

/**
 * This is the model class for table "{{%address}}".
 *
 * @property int $id_address
 * @property int $id_client
 * @property string $address
 * @property string $country
 * @property string $created_at
 * @property string|null $updated_at
 *
 * @property Client $client
 */
class Address extends \yii\db\ActiveRecord
{
    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return '{{%address}}';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['id_client', 'address', 'country'], 'required'],
            [['id_client'], 'integer'],
            [['created_at', 'updated_at'], 'safe'],
            [['address', 'country'], 'string', 'max' => 100],
            [['id_client'], 'exist', 'skipOnError' => true, 'targetClass' => Client::class, 'targetAttribute' => ['id_client' => 'id_client']],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            'id_address' => 'Id Address',
            'id_client' => 'Id Client',
            'address' => 'Address',
            'country' => 'Country',
            'created_at' => 'Created At',
            'updated_at' => 'Updated At',
        ];
    }

    /**
     * Gets query for [[Client]].
     *
     * @return \yii\db\ActiveQuery|\common\models\query\ClientQuery
     */
    public function getClient()
    {
        return $this->hasOne(Client::class, ['id_client' => 'id_client']);
    }

    /**
     * {@inheritdoc}
     * @return \common\models\query\AddressQuery the active query used by this AR class.
     */
    public static function find()
    {
        return new \common\models\query\AddressQuery(get_called_class());
    }
}
