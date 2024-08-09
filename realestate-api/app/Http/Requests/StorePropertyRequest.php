<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StorePropertyRequest extends FormRequest
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
            'title' => ['required', 'string', 'min:1', 'max:30'],
            'price' => ['required', 'numeric'],
            'description' => ['required', 'string', 'max:500'],
            'city' => ['required', 'string'],
            'postal_code' => ['required', 'integer'],
            'address' => ['required', 'string'],
        ];
    }
}
