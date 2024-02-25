<?php

namespace App\Services;

use App\Enums\Files;
use App\Models\Category;
use App\Models\File;
use App\ValueObjects\Category\StoreCategoryObj;
use App\ValueObjects\Category\UpdateCategoryImageObj;
use Exception;
use Illuminate\Support\Facades\DB;

class CategoryService
{
   /**
    * @throws Exception
    */
   public static function updateImage(UpdateCategoryImageObj $obj): bool
   {
      $image = $obj->image;

      $category = $obj->category;

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

   public static function store(StoreCategoryObj $obj): bool
   {
      $image = $obj->image;

      DB::beginTransaction();

      try {
         $category = Category::create($obj->fields);

         if (!$image) {
            return true;
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

         $category->update(['image_id' => $file->id]);
      } catch (Exception $e) {
         DB::rollBack();

         throw new Exception(__('category.errors.store'));
      }


      DB::commit();

      return true;
   }
}
