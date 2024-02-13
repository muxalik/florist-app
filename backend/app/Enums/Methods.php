<?php

namespace App\Enums;

use App\Interfaces\IEnumerable;
use App\Traits\Enumerable;

enum Methods: string implements IEnumerable
{
   use Enumerable;

   case Phone = 'phone';
   case Website = 'website';
   case Telegram = 'telegram';
   case Whatsapp = 'whatsapp';
   case Viber = 'viber';
   case FaceToFace = 'face_to_face';
}
