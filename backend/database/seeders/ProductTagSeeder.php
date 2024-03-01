<?php

namespace Database\Seeders;

use App\Models\Product;
use App\Models\Tag;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProductTagSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $products = Product::all();
        $tags = Tag::all();

        $products->each(function (Product $product) use ($tags) {
            $randomTags = fake()->randomElements(
                $tags->modelKeys(),
                mt_rand(1, 4),
            );

            $product->tags()->sync($randomTags);
        });
    }
}
