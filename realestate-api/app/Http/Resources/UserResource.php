<?php

namespace App\Http\Resources;

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
            "role" => $this->role == "agent" ? 1 : 2
        ];
    }
}
