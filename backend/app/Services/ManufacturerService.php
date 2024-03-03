<?php

namespace App\Services;

use App\Enums\Files;
use App\Models\Category;
use App\Models\File;
use App\Models\Manufacturer;
use App\ValueObjects\Manufacturer\StoreManufacturerObj;
use App\ValueObjects\Manufacturer\UpdateManufacturerImageObj;
use Exception;
use Illuminate\Support\Facades\DB;

class ManufacturerService
{
   /**
    * @throws Exception
    */
   public static function updateImage(UpdateManufacturerImageObj $obj): bool
   {
      $image = $obj->image;

      $manufacturer = $obj->manufacturer;

      if (!$image) {
         return $manufacturer->update(['image_id' => null]);
      }

      $path = 'manufacturers';

      $fullPath = $image->store('public/' . $path);

      $filename = str($fullPath)->afterLast('/');

      $manufacturer->image()?->delete();

      $file = File::create([
         'path' => $path,
         'filename' => $filename,
         'type' => Files::Image->value,
      ]);

      return $manufacturer->update(['image_id' => $file->id]);
   }

   public static function store(StoreManufacturerObj $obj): bool
   {
      $image = $obj->image;

      DB::beginTransaction();

      try {
         $manufacturer = Manufacturer::create($obj->fields);

         if (!$image) {
            return true;
         }

         $path = 'manufacturer';

         $fullPath = $image->store('public/' . $path);

         $filename = str($fullPath)->afterLast('/');

         $manufacturer->image()?->delete();

         $file = File::create([
            'path' => $path,
            'filename' => $filename,
            'type' => Files::Image->value,
         ]);

         $manufacturer->update(['image_id' => $file->id]);
      } catch (Exception $e) {
         DB::rollBack();

         throw new Exception(__('manufacturer.errors.store'));
      }


      DB::commit();

      return true;
   }
}
