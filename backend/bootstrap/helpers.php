<?php

function verification_code(): string
{
   return fake()->numerify('######');
}

function valid_password(): string
{
   return mb_strimwidth(fake()->regexify('^(?=.*[a-zA-Z])(?=.*\d)(?=.*[~!@#$%^&*()_-+=\/?.>,<])(?=.*[a-z])(?=.*[A-Z]).{10,50}$'), 0, 50);
}
