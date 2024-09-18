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
            ],
            "phone" => [
                "nullable",
                "string",
                "regex:/^\+?[0-9]{10,15}$/",
                "required_with:tax_number"
            ],
            "tax_number" => [
                "nullable",
                "string",
                "regex:/^\d{8,15}$/",
                "required_with:phone"
            ],
            "agency" => [
                "nullable",
                "string",
                "required_with:phone"
            ],
            "description" => [
                "nullable",
                "string",
                "min:20",
                "max:1000",
            ],
            "sex" => [
                "required",
                "string",
                "in:Male,Female,Other",
            ],
            "birth_date" => [
                "required",
                "date",
                "before_or_equal:today",
            ],
            "country" => [
                "nullable",
                "string",
                "max:50",
                "required_with:phone"
            ],
            "city" => [
                "nullable",
                "string",
                "max:50",
                "required_with:phone"
            ],
            "postal_code" => [
                "nullable",
                "string",
                "max:10",
                "regex:/^[A-Za-z0-9\s\-]+$/",
                "required_with:phone"
            ]
        ];
    }
}
