<?php

namespace App\Enums;

use App\Interfaces\IEnumerable;
use App\Traits\Enumerable;

enum Files: string implements IEnumerable
{
   use Enumerable;

   case Image = 'image';
}
