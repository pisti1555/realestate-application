<?php

namespace App\Http\Resources;

use App\Services\MessageService;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
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
            "image" => $this->image,
            "name" => $this->name,
            "email" => $this->email,
            "phone" => $this->phone,
            "joined" => $this->created_at,
            "role" => $this->role == "agent" ? 1 : 2,
            "new_msg_count" => MessageService::getNewMessagesCount($this->id)
        ];
    }
}
