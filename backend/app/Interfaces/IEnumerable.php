<?php

namespace App\Interfaces;

interface IEnumerable
{
   public static function values(): array;

   public static function randomValue(): mixed;
}
