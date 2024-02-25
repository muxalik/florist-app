<?php

namespace App\Services;

use App\Enums\Files;
use App\Models\File;
use App\ValueObjects\Category\UpdateImageObj;

class CategoryService
{
   /**
    * @throws Exception
    */
   public static function updateImage(UpdateImageObj $data): bool
   {
      $image = $data->image;

      $category = $data->category;

      if (!$image) {
         return $category->update(['image_id' => null]);
      }

      $path = 'categories';

      $fullPath = $image->store('public/' . $path);

      $filename = str($fullPath)->afterLast('/');

      $category->image()?->delete();

      $file = File::create([
         'path' => $path,
         'filename' => $filename,
         'type' => Files::Image->value,
      ]);

      return $category->update(['image_id' => $file->id]);
   }
}
