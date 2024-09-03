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
        return $this->user()->tokenCan('store-property');
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'image'=> ['required', 'image', 'mimes:jpeg, jpg'],
            'title' => ['required', 'string', 'min:1', 'max:30'],
            'price' => ['required', 'numeric', 'min:100'],
            'description' => ['required', 'string', 'max:500'],
            'city' => ['required', 'string', 'max:20'],
            'postal_code' => ['required', 'string', 'max:10'],
            'address' => ['required', 'string', 'max:50'],
        ];
    }
}
