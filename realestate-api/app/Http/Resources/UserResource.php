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
            "tax_number" => $this->tax_number,
            "agency" => $this->agency,
            "joined" => $this->created_at,
            "role" => $this->role == "agent" ? 1 : 2,
            "description" =>$this->description,
            "sex" => $this->sex,
            "birth_date" => $this->birth_date,
            "country" => $this->country,
            "city" => $this->city,
            "postal_code" => $this->postal_code,
            "new_msg_count" => MessageService::getNewMessagesCount($this->id)
        ];
    }
}
