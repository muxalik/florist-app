<?php

namespace App\ValueObjects\Manufacturer;

use App\Models\Manufacturer;
use Illuminate\Http\UploadedFile;

class UpdateManufacturerImageObj
{
   public function __construct(
      public readonly Manufacturer $manufacturer,
      public readonly UploadedFile|null $image,
   ) {
   }

   public static function create(
      Manufacturer $manufacturer,
      UploadedFile | null $image,
   ): self {
      return new self(
         $manufacturer,
         $image
      );
   }
}
