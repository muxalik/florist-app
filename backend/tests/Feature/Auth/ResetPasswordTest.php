<?php

namespace Tests\Feature\Auth;

use App\Models\User;
use App\Notifications\UpdatePasswordNotification;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Notification;
use Tests\TestCase;

class ResetPasswordTest extends TestCase
{
    use DatabaseTransactions;

    public function test_user_can_reset_password(): void
    {
        Notification::fake();

        $oldPassword = valid_password();
        $newPassword = valid_password();

        $user = User::factory()->create([
            'password' => $oldPassword,
        ]);

        $code = $user->verificationCodes()->create([
            'verified_at' => now(),
        ]);

        $data = [
            'password' => $newPassword,
            'code' => $code->code,
        ];

        $response = $this->patchJson(route('reset-password'), $data);

        $response->assertOk();

        $user->refresh();

        $this->assertFalse(Hash::check($oldPassword, $user->password));
        $this->assertTrue(Hash::check($newPassword, $user->password));

        Notification::assertSentToTimes(
            $user,
            UpdatePasswordNotification::class,
            1
        );
    }

    public function test_authenticated_user_cannot_reset_password(): void
    {
        Notification::fake();

        $oldPassword = valid_password();
        $newPassword = valid_password();

        $user = User::factory()->create([
            'password' => $oldPassword,
        ]);

        $token = $user->createToken('test-token')->plainTextToken;

        $code = $user->verificationCodes()->create([
            'verified_at' => now(),
        ]);

        $data = [
            'password' => $newPassword,
            'code' => $code->code,
        ];

        $response = $this->patchJson(
            route('reset-password'),
            $data,
            $this->auth($token)
        );

        $response->assertForbidden();

        $user->refresh();

        $this->assertTrue(Hash::check($oldPassword, $user->password));
        $this->assertFalse(Hash::check($newPassword, $user->password));

        Notification::assertNothingSentTo($user);
    }

    public function test_user_cannot_set_too_simple_password(): void
    {
        Notification::fake();

        $oldPassword = fake()->numerify(str_repeat('#', 9));
        $newPassword = fake()->numerify(str_repeat('#', 9));

        $user = User::factory()->create([
            'password' => $oldPassword,
        ]);

        $code = $user->verificationCodes()->create([
            'verified_at' => now(),
        ]);

        $data = [
            'password' => $newPassword,
            'code' => $code->code,
        ];

        $response = $this->patchJson(route('reset-password'), $data);

        $response->assertUnprocessable();

        $response->assertInvalid(['password']);

        $user->refresh();

        $this->assertTrue(Hash::check($oldPassword, $user->password));
        $this->assertFalse(Hash::check($newPassword, $user->password));

        Notification::assertNothingSentTo($user);
    }
}
