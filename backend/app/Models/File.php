<?php

namespace App\Models;

use App\Enums\Files;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class File extends Model
{
    use HasFactory;

    protected $fillable = [
        'path',
        'filename',
        'type',
    ];

    protected $casts = [
        'type' => Files::class,
    ];

    public function getFullPathAttribute(): string
    {
        return asset('storage/' . $this->path . '/' . $this->filename);
    }
}
