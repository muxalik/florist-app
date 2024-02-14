<?php

namespace App\Http\Requests\Auth;

use App\Models\VerificationCode;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Password;

class ResetPasswordRequest extends FormRequest
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
            'code' => ['required', 'string', 'max:20'],
            'password' => ['required', 'string', 'between:10,50', Password::defaults()],
        ];
    }

    public function verificationCode(): VerificationCode | null
    {
        return VerificationCode::firstWhere('code', $this->code);
    }
}
