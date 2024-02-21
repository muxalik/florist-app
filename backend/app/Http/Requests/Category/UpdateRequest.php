<?php

namespace App\Http\Requests\Category;

use Illuminate\Foundation\Http\FormRequest;

class UpdateRequest extends FormRequest
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
            'name' => ['required', 'string', 'between:2,100'],
            'parentId' => ['nullable', 'numeric', 'exists:categories,id'],
        ];
    }

    public function validated($key = null, $default = null): array
    {
        $data = parent::validated();

        return array_merge($data, [
            'parent_id' => $data['parentId'],
        ]);
    }
}
