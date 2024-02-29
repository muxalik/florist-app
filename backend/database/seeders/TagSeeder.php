<?php

namespace Database\Seeders;

use App\Models\Color;
use App\Models\Tag;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TagSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $colors = Color::all();

        $tags = Tag::factory(40)->create();

        $tags->each(function (Tag $tag) use ($colors) {
            $randomColor = fake()->randomElement($colors);

            $tag->update([
                'color_id' => $randomColor->id,
            ]);
        });
    }
}
