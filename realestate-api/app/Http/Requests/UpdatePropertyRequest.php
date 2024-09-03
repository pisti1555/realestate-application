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
            'price' => ['sometimes', 'numeric', 'min:100'],
            'description' => ['sometimes', 'string', 'max:500'],
            'city' => ['sometimes', 'string', 'max:20'],
            'postal_code' => ['sometimes', 'string', 'max:10'],
            'address' => ['sometimes', 'string', 'max:50'],
        ];
    }
}
