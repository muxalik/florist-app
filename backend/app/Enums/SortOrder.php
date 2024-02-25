<?php

namespace App\Enums;

use App\Interfaces\IEnumerable;
use App\Traits\Enumerable;

enum SortOrder: string implements IEnumerable
{
   use Enumerable;

   case Asc = 'asc';
   case Desc = 'desc';
}
