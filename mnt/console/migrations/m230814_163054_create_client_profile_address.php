<?php

use yii\db\Migration;
use yii\db\Expression;

/**
 * Class m230814_163054_create_client_profile_address
 */
class m230814_163054_create_client_profile_address extends Migration
{
    /**
     * {@inheritdoc}
     */
    public function safeUp()
    {
        $this->createTable('client', [
            'id_client' => $this->primaryKey(),
            'client_name' => $this->string(100)->notNull(),
            'created_at' => $this->dateTime()->defaultValue(new Expression('CURRENT_TIMESTAMP')),
            'updated_at' => $this->dateTime()->defaultValue(null)->append('ON UPDATE CURRENT_TIMESTAMP'),
        ]);

        $this->createTable('profile', [
            'id_profile' => $this->primaryKey(),
            'id_client' => $this->integer()->notNull(),
            'email' => $this->string(100)->notNull(),
            'phone' => $this->string(12)->notNull(),
            'created_at' => $this->dateTime()->defaultValue(new Expression('CURRENT_TIMESTAMP')),
            'updated_at' => $this->dateTime()->defaultValue(null)->append('ON UPDATE CURRENT_TIMESTAMP'),
        ]);

        $this->createTable('address', [
            'id_address' => $this->primaryKey(),
            'id_client' => $this->integer()->notNull(),
            'address' => $this->string(100)->notNull(),
            'country' => $this->string(100)->notNull(),
            'created_at' => $this->dateTime()->defaultValue(new Expression('CURRENT_TIMESTAMP')),
            'updated_at' => $this->dateTime()->defaultValue(null)->append('ON UPDATE CURRENT_TIMESTAMP'),
        ]);

        // Índice para la columna 'id_client'
        $this->createIndex(
            'idx-profile-id_client',
            'profile',
            'id_client'
        );

        // Clave foránea 'profile' -> 'client'
        $this->addForeignKey(
            'fk-profile-id_client',
            'profile',
            'id_client',
            'client',
            'id_client',
            'CASCADE'
        );

        // Índice para la columna 'id_client'
        $this->createIndex(
            'idx-address-id_client',
            'address',
            'id_client'
        );

        // Clave foránea 'address' -> 'client'
        $this->addForeignKey(
            'fk-address-id_client',
            'address',
            'id_client',
            'client',
            'id_client',
            'CASCADE'
        );
    }

    /**
     * {@inheritdoc}
     */
    public function safeDown()
    {
        // Deshabilitar clave foránea 'profile' -> 'client'
        $this->dropForeignKey(
            'fk-profile-id_client',
            'profile'
        );

        // Deshabilitar índice de la columna 'id_client'
        $this->dropIndex(
            'idx-profile-id_client',
            'profile'
        );

        // Deshabilitar clave foránea 'address' -> 'client'
        $this->dropForeignKey(
            'fk-address-id_client',
            'address'
        );

        // Deshabilitar índice de la columna 'id_client'
        $this->dropIndex(
            'idx-address-id_client',
            'address'
        );

        // Eliminar tablas
        $this->dropTable('client');
        $this->dropTable('profile');
        $this->dropTable('address');

        return false;
    }

}
