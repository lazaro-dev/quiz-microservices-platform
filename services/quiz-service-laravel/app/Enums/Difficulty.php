<?php

namespace App\Enums;

use App\Traits\HasEnum;

enum Difficulty: string
{
    use HasEnum;
    
    case EASY = 'easy';
    case MEDIUM = 'medium';
    case HARD = 'hard';
}
