<?php

namespace Database\Seeders;

use App\Enums\Files;
use App\Models\File;
use App\Models\Product;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class FileProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $products = Product::all();

        $products->each(function (Product $product) {
            $randomFile = mt_rand(1, 2);

            $file = File::factory()->create([
                'path' => '',
                'filename' => "flower-$randomFile.jpg",
                'type' => Files::Image->value,
            ]);

            $product->files()->attach($file);
        });
    }
}
