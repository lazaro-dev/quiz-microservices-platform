<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

#[Fillable(['name', 'slug'])]
class GameType extends Model
{
    use HasFactory;
    
    public function games()
    {
        return $this->hasMany(Game::class);
    }
}
