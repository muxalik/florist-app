<?php

namespace App\Http\Requests\Tag;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Arr;

class UpstoreTagRequest extends FormRequest
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
            'name' => ['required', 'string', 'between:2,50'],
            'colorId' => ['nullable', 'numeric', 'exists:colors,id'],
        ];
    }

    public function validated($key = null, $default = null): array
    {
        $data = parent::validated();

        return array_merge($data, [
            'color_id' => Arr::get($data, 'colorId', null),
        ]);
    }
}
