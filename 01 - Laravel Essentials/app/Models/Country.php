<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Country extends Model
{
    //
    public function posts() {
      //--The first argument  is the name of the final model we wish to access, 
      //-- while the second argument is the name of the intermediate model.
      //-- The third argument is the name of the foreign key on the intermediate model
      //-- The fourth argument is the name of the foreign key on the final model

        return $this->hasManyThrough(
            Post::class, 
            User::class,
            "country_id",
            "user_id"
            );
    }
}
