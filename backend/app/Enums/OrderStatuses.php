<?php

namespace App\Enums;

use App\Interfaces\IEnumerable;
use App\Traits\Enumerable;

enum OrderStatuses: string implements IEnumerable
{
   use Enumerable;

   case Processing = 'processing';
   case Payment = 'payment';
   case Delivery = 'delivery';
   case Awaiting = 'awaiting';
   case Completed = 'completed';
   case Canceled = 'canceled';
}
