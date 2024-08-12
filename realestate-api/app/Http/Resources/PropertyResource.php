<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PropertyResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            "id"=> $this->id,
            "image" => $this->image,
            "title" => $this->title,
            "price" => $this->price,
            "description" => $this->description,
            "city" => $this->city,
            "postal_code" => $this->postal_code,
            "address" => $this->address,
        ];
    }
}
