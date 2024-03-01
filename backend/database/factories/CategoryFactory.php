<?php

namespace Database\Factories;

use App\Enums\Files;
use App\Models\Category;
use App\Models\File;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Category>
 */
class CategoryFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->words(
                fake()->numberBetween(2, 6),
                true,
            ),
            'image_id' => File::factory()->create([
                'path' => '',
                'filename' => 'category.jpg',
                'type' => Files::Image->value,
            ])->id,
            'parent_id' => fake()->boolean()
                ? Category::inRandomOrder()->value('id')
                : null,
            'created_at' => random_date(),
            'updated_at' => random_date(),
        ];
    }
}
