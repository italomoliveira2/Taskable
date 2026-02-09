<?php 

namespace App\Enums;

enum UserStatusEnum : string
{
    case ACTIVATED = 'activated';
    case DEACTIVATED = 'deactivated';

    public static function getValues(): array
    {
        return [
            self::ACTIVATED,
            self::DEACTIVATED,
        ];
    }
}