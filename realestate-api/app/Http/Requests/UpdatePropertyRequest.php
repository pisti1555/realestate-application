<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdatePropertyRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return $this->user()->tokenCan('update-property');
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'image'=> ['sometimes', 'image', 'mimes:jpeg, jpg'],
            'title' => ['sometimes', 'string', 'min:1', 'max:30'],
            'price' => ['sometimes', 'numeric'],
            'description' => ['sometimes', 'string', 'max:500'],
            'city' => ['sometimes', 'string'],
            'postal_code' => ['sometimes', 'string'],
            'address' => ['sometimes', 'string'],
        ];
    }
}
