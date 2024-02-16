<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $base = Category::factory(10)->create();

        $base->each(function (Category $category) {
            Category::factory(mt_rand(2, 5))->create([
                'parent_id' => $category->id,
            ]);
        });
    }
}
