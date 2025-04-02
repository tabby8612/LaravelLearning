<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Staff extends Model
{
    //

    public function photo() {
        return $this->morphMany(Photo::class, "imagable");
    }
}
