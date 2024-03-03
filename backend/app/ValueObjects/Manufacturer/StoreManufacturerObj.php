<?php

namespace App\ValueObjects\Manufacturer;

use Illuminate\Http\UploadedFile;

class StoreManufacturerObj
{
   public function __construct(
      public readonly array $fields,
      public readonly UploadedFile|null $image,
   ) {
   }

   public static function create(
      array $fields,
      UploadedFile | null $image,
   ): self {
      return new self(
         $fields,
         $image
      );
   }
}
