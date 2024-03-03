<?php

namespace App\Filters;

use App\Actions\Filters\IdFilter;
use App\Actions\Filters\NameFilter;
use App\Actions\Filters\ImageFormatsFilter;
use App\Actions\Filters\CreatedAtFilter;
use App\Actions\Filters\HasImageFilter;
use App\Actions\Filters\UpdatedAtFilter;
use App\Models\Manufacturer;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;

class ManufacturerFilter extends AbstractFilter
{
   protected array $filters = [
      // IdFilter::class,
      // HasImageFilter::class,
      // ImageFormatsFilter::class,
      // NameFilter::class,
      // UpdatedAtFilter::class,
      // CreatedAtFilter::class,
   ];


   public function __construct(Request $request)
   {
      parent::__construct($request);

      $this->query = Manufacturer::with('image')->withCount('products');
   }

   protected function search(): self
   {
      if (!$this->q) {
         return $this;
      }

      $this->query
         ->where(function (Builder $q): Builder {
            return $q
               ->where('id', 'LIKE', "%$this->q%")
               ->orWhere('name', 'LIKE', "%$this->q%")
               ->orHas('products', 'LIKE', "%$this->q%");
         });

      return $this;
   }

   protected function sort(): self
   {
      switch ($this->sort) {
         case 'id':
         case 'name':
         case 'createdAt':
         case 'updatedAt':
            $this->query->orderBy(
               str($this->sort)->snake(),
               $this->order->value
            );

            break;

         default:
            $this->query->latest('id');
      }

      return $this;
   }
}
