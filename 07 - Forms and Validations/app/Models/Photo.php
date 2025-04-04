<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Photo extends Model
{
    //-- imageable will become an identifier

    //-- in DB, The imageable_id column will contain 
    //-- the ID value of the post or user

    //-- imageable_type column will contain 
    //-- the class name of the parent model
    public function imagable() {
        return $this->morphTo();
    }
}
