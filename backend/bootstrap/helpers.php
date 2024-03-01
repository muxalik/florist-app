<?php

function verification_code(): string
{
   return fake()->numerify('######');
}

function valid_password(): string
{
   return mb_strimwidth(fake()->regexify('^(?=.*[a-zA-Z])(?=.*\d)(?=.*[~!@#$%^&*()_-+=\/?.>,<])(?=.*[a-z])(?=.*[A-Z]).{10,50}$'), 0, 50);
}

function random_date(): string
{
   return now()
      ->subYears(mt_rand(0, 24))
      ->subMonths(mt_rand(0, 12))
      ->subWeeks(mt_rand(0, 7))
      ->subDays(mt_rand(0, 7))
      ->subHours(mt_rand(0, 24))
      ->subMinutes(mt_rand(0, 60))
      ->subSeconds(mt_rand(0, 60))
      ->toDateTimeString();
}
