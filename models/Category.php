<?php


namespace app\models;


use yii\db\ActiveRecord;

/**
 * @property mixed|null title
 * @property mixed|null keywords
 * @property mixed|null description
 */
class Category extends ActiveRecord
{
    public static function tableName()
    {
        return 'category';
    }
}
