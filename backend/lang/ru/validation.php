<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Validation Language Lines
    |--------------------------------------------------------------------------
    |
    | Поле following language lines contain Поле default error messages used by
    | Поле validator class. Some of Полеse rules have multiple versions such
    | as Поле size rules. Feel free to tweak each of Полеse messages here.
    |
    */

    "accepted"             => "Поле должен быть принят.",
    "active_url"           => "Поле содержит неправильный URL.",
    "after"                => "Поле должен быть после даты :date.",
    "alpha"                => "Поле должно содержать только символы.",
    "alpha_dash"           => "Поле должно содержать только символы, числа и тире.",
    "alpha_num"            => "Поле должно содержать только символы и числа.",
    "array"                => "Поле должен быть массивом.",
    "before"               => "Поле должен быть до даты :date.",
    "between"              => [
        "numeric" => "Поле должнен содержать от :min до :max.",
        "file"    => "Размер поля должен быть между :min и :max килоБайтом.",
        "string"  => "Поле должнен содержать от :min до :max символов.",
        "array"   => "Поле должен содержать от :min до :max пунктов.",
    ],
    "boolean"              => "Поле должно содержать булевые значения (true, false).",
    "confirmed"            => "Поле не подходит подтверждению.",
    "date"                 => "Поле содержить неправильную дату.",
    "date_format"          => "Поле не соответствует формату :format.",
    "different"            => "Поле и :other должны быть разные.",
    "digits"               => "Поле должен содержать :digits цифр.",
    "digits_between"       => "Поле должно содержать от :min до :max цифр.",
    "email"                => "Поле должно содержать правильную эл. почту.",
    "filled"               => "Поле обязательно для заполнения.",
    "exists"               => "Выбранное поле неправильное.",
    "image"                => "Поле должнен быть файлом.",
    "in"                   => "Выбранное поле неправильная.",
    "integer"              => "Поле должен быть целым числом.",
    "ip"                   => "Поле должен содержать правильный IP адрес.",
    "max"                  => [
        "numeric" => "Поле может быть не больше :max.",
        "file"    => "Поле может быть не больше :max килоБайтов.",
        "string"  => "Поле может быть не больше :max символов.",
        "array"   => "Поле может быть не больше :max пунктов.",
    ],
    "mimes"                => "Поле должен быть файлом type: :values.",
    "min"                  => [
        "numeric" => "Поле должен быть не менее :min.",
        "file"    => "Поле должен быть не менее :min килоБайтов.",
        "string"  => "Поле должен быть не менее :min символов.",
        "array"   => "Поле должен быть не менее :min пунктов.",
    ],
    "not_in"               => "Выбранное поле неправильное.",
    "numeric"              => "Поле должен быть цифрой.",
    "regex"                => "Поле имеет неправильный формат.",
    "required"             => "Поле обязательно к заполнению.",
    "required_if"          => "Поле обязательно когда :other равен :value.",
    "required_unless"      => "Поле обязательно если :other не равен :value.",
    "required_with"        => "Поле обязательно когда :values присутствует.",
    "required_with_all"    => "Поле обязательно когда :values присутствует всюду.",
    "required_without"     => "Поле обязательно когда :values равен нечему.",
    "required_without_all" => "Поле требуется, если ни один из :values не присутствует.",
    "same"                 => "Поле и :other должны совпадать.",
    "size"                 => [
        "numeric" => "Поле должен быть :size.",
        "file"    => "Поле должен содержать :size килоБайтов.",
        "string"  => "Поле должен содержать :size символов.",
        "array"   => "Поле должен содержать :size пунктов.",
    ],
    "timezone"             => "Поле должен содержать правильный часовой пояс.",
    "unique"               => "Поле уже используется.",
    "url"                  => "Поле имеет неправильный формат.",
    "entry_slug_exists"    => "Данный ЧПУ уже используется.",
    "page_uri_exists"      => "Данный ЧПУ уже используется.",
    "unique_asset_filename" => "Файл с таким именем уже существует",

    // Extended validation rules
    "ext" => "Поле должен быть файлом type: :extensions",

    /*
    |--------------------------------------------------------------------------
    | Custom Validation Language Lines
    |--------------------------------------------------------------------------
    |
    | Here you may specify custom validation messages for attributes using Поле
    | convention "attribute.rule" to name Поле lines. This makes it quick to
    | specify a specific custom language line for a given attribute rule.
    |
    */

    'custom' => [
        'attribute-name' => [
            'rule-name' => 'custom-message',
        ],
    ],

    /*
    |--------------------------------------------------------------------------
    | Custom Validation Attributes
    |--------------------------------------------------------------------------
    |
    | Поле following language lines are used to swap attribute place-holders
    | with something more reader friendly such as E-Mail Address instead
    | of "email". This simply helps us make messages a little cleaner.
    |
    */

    'attributes' => [],

];
