<?php

namespace Tests\Feature\Auth;

use App\Models\User;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class LoginTest extends TestCase
{
    use DatabaseTransactions;

    public function test_user_can_login(): void
    {
        $data = [
            'email' => fake()->safeEmail(),
            'password' => valid_password(),
        ];

        $user = User::factory()->create($data);

        $response = $this->postJson(route('login'), $data);

        $response->assertOk();

        $response->assertJsonStructure(['user', 'token']);

        $this->assertAuthenticatedAs($user, 'sanctum');
    }


    public function test_authenticated_user_cannot_login(): void
    {
        $data = [
            'email' => fake()->safeEmail(),
            'password' => valid_password(),
        ];

        $user = User::factory()->create($data);

        $token = $user->createToken('test-token')->plainTextToken;

        $response = $this->postJson(
            route('login'),
            $data,
            $this->auth($token),
        );

        $response->assertForbidden();

        $response->assertJsonStructure(['message']);

        $this->assertAuthenticatedAs($user, 'sanctum');
    }
}
