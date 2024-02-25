<?php

namespace App\ValueObjects\Category;

use App\Models\Category;
use Illuminate\Http\UploadedFile;

class UpdateCategoryImageObj
{
   public function __construct(
      public readonly Category $category,
      public readonly UploadedFile|null $image,
   ) {
   }

   public static function create(
      Category $category,
      UploadedFile | null $image,
   ): self {
      return new self(
         $category,
         $image
      );
   }
}
