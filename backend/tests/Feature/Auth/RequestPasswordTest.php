<?php

namespace Tests\Feature\Auth;

use App\Models\User;
use App\Notifications\SendPasswordNotification;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Support\Facades\Notification;
use Tests\TestCase;

class RequestPasswordTest extends TestCase
{
    use DatabaseTransactions;

    public function test_user_can_request_password(): void
    {
        Notification::fake();

        $data = ['email' => fake()->safeEmail()];

        $user = User::factory()->create($data);

        $response = $this->postJson(route('request-password'), $data);

        $response->assertOk();

        Notification::assertSentToTimes(
            $user,
            SendPasswordNotification::class,
            1
        );
    }

    public function test_authenticated_user_cannot_request_password(): void
    {
        Notification::fake();

        $data = ['email' => fake()->safeEmail()];

        $user = User::factory()->create($data);

        $token = $user->createToken('test-token')->plainTextToken;

        $response = $this->postJson(
            route('request-password'),
            $data,
            $this->auth($token)
        );

        $response->assertForbidden();

        Notification::assertNothingSentTo($user);
    }
}
