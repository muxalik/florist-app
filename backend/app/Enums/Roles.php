<?php

namespace App\Enums;

use App\Interfaces\IEnumerable;
use App\Traits\Enumerable;

enum Roles: string implements IEnumerable
{
   use Enumerable;

   case Admin = 'admin';
   case Manager = 'manager';
   case Employee = 'employee';
}
