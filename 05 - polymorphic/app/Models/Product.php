<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    //
    public function photo() {
        return $this->morphMany(Photo::class, "imagable");
    }
}
