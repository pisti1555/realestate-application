<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreMessageByEmail extends FormRequest
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
            'sender' => ['numeric', 'exists:users,id'],
            'receiver' => ['required', 'string','exists:users,email'],
            'title' => ['required', 'string', 'min:1', 'max:30'],
            'message' => ['required', 'string', 'min:20', 'max:500']
        ];
    }
}
