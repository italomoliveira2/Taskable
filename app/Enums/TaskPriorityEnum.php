<?php 

namespace App\Enums;

enum TaskPriorityEnum: string
{
    case LOW = 'low';
    case MEDIUM = 'medium';
    case HIGH = 'high';
    case URGENT = 'urgent';

    public static function getValues(): array
    {
        return array_map(fn($case) => $case->value, self::cases());
    }
}