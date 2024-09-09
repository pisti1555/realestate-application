<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Http\Resources\Json\JsonResource;

class MessageResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            "id" => $this->id,
            "sender" => new UserResource(User::findOrFail($this->sender)),
            "receiver" => new UserResource(User::findOrFail($this->receiver)),
            "title" => $this->title,
            "message" => $this->message,
            "time" => $this->created_at
        ];
    }
}
