<?php

namespace App\ValueObjects;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;

class FilterResultObj
{

   public function __construct(
      public readonly Request $request,
      public readonly Builder $query,
   ) {
   }

   public static function create(
      Request $request,
      Builder $query,
   ): self {
      return new self($request, $query);
   }
}
