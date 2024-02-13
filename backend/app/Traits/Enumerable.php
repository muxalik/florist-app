<?php

namespace App\Traits;

trait Enumerable
{
   public static function values(): array
   {
      return array_column(self::cases(), 'value');
   }

   public static function randomValue(): mixed
   {
      return fake()->randomElement(self::values());
   }
}
