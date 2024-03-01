<?php

namespace Database\Factories;

use App\Models\Color;
use App\Models\Manufacturer;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Product>
 */
class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'color_id' => Color::inRandomOrder()->value('id'),
            'name' => fake()->words(3, true),
            'in_stock' => fake()->numberBetween(20, 200),
            'price' => fake()->numberBetween(999, 99_999),
            'manufacturer_id' => Manufacturer::inRandomOrder()->value('id'),
            'created_at' => random_date(),
            'updated_at' => random_date(),
        ];
    }
}
