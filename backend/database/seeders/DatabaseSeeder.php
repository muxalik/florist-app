<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\User;
use App\Enums\Roles;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $adminRole = Role::create(['name' => Roles::Admin->value]);
        $managerRole = Role::create(['name' => Roles::Manager->value]);
        $employeeRole = Role::create(['name' => Roles::Employee->value]);

        $admin = User::factory()->create([
            'first_name' => fake()->firstName(),
            'last_name' => fake()->lastName(),
            'patronymic' => null,
            'email' => 'admin@gmail.com',
            'phone' => '7 777 777 77 77',
            'password' => 'admin',
        ]);

        $admin->assignRole($adminRole);

        $managers = User::factory(5)->create();

        $managers->each(function (User $manager) use ($managerRole) {
            $manager->assignRole($managerRole);
        });

        $employees = User::factory(45)->create();

        $employees->each(function (User $employee) use ($employeeRole) {
            $employee->assignRole($employeeRole);
        });
    }
}
