<?php

namespace Database\Seeders;

use App\Models\Color;
use App\Models\Manufacturer;
use App\Models\Product;
use App\Models\Tag;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $colors = Color::all();
        $manufacturers = Manufacturer::all();

        for ($i = 0; $i < 45; $i++) {
            Product::factory()->create([
                'color_id' => fake()
                    ->randomElement($colors)
                    ->id,
                'manufacturer_id' => fake()
                    ->randomElement($manufacturers)
                    ->id,
            ]);
        }
    }
}
