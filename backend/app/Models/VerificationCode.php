<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class VerificationCode extends Model
{
    use HasFactory;

    protected $fillable = [
        'code',
        'user_id',
        'verified_at',
    ];

    protected $casts = [
        'verified_at' => 'datetime',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public static function boot(): void
    {
        parent::boot();

        self::creating(function (self $model) {
            $model->code = verification_code();
        });
    }

    public function verify(): bool
    {
        return $this->update([
            'verified_at' => now(),
        ]);
    }

    public function isExpired(): bool
    {
        return $this->verified_at->lessThanOrEqualTo(
            now()->subMinutes(30)
        );
    }

    public function isVerified(): bool
    {
        return !is_null($this->verified_at);
    }
}
