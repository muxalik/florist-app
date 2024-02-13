<?php

namespace App\Http\Requests\Auth;

use App\Models\VerificationCode;
use Illuminate\Foundation\Http\FormRequest;

class VerifyPasswordRequest extends FormRequest
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
            'code' => ['required', 'string', 'max:20', 'exists:verification_codes'],
        ];
    }

    public function messages(): array
    {
        return [
            'code.exists' => __('passwords.token'),
        ];
    }

    public function code(): VerificationCode
    {
        return VerificationCode::firstWhere('code', $this->code);
    }
}
