<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class RegistrationRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            "name" =>[
                "required", 
                "string", 
                "regex:/^[a-zA-ZáéíóöőúüűÁÉÍÓÖŐÚÜŰ\s]+$/"
            ],
            "email" => [
                "required", 
                "email", 
                "unique:users,email"
            ],
            "password"=> [
                "required", 
                "string", 
                "min:6", 
                "max:50", 
                "regex:/^(?=.*\d).{6,}$/"
            ],
            "password_confirm" => [
                "required",
                "string",
                "same:password"
            ],
            "image" => [
                "nullable",
                "image",
                "mimes:jpeg,jpg",
                "required_with:phone"
            ],
            "phone" => [
                "nullable",
                "string",
                "regex:/^\+?[0-9]{10,15}$/",
                "required_with:image"
            ],
        ];
    }
}
