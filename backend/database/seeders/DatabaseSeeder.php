<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Enums\Files;
use App\Models\User;
use App\Enums\Roles;
use App\Models\File;
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

        $avatar = File::factory()->create([
            'path' => '',
            'filename' => 'avatar.jpg',
            'type' => Files::Image->value,
        ]);

        $admin = User::factory()->create([
            'first_name' => 'Михаил',
            'last_name' => 'Корнилов',
            'patronymic' => null,
            'email' => 'admin@gmail.com',
            'phone' => '7 777 777 77 77',
            'password' => 'admin',
            'avatar_id' => $avatar->id,
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
