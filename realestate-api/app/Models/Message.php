<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Message extends Model
{
    use HasFactory;

    protected $fillable = [
        'sender',
        'receiver',
        'title',
        'message'
    ];

    public function sender() {
        return $this->belongsTo(User::class);
    }

    public function receiver() {
        return $this->belongsTo(User::class);
    }
}
