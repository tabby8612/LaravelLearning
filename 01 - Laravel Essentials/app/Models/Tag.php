<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Tag extends Model
{
    //
    //-- It is like telling Laravel that class Tag is required by many with morphedByMany 
    public function posts() {
        return $this->morphedByMany(Post::class, "taggable");
    }

    public function videos() {
        return $this->morphedByMany(Video::class, "taggable");
    }
}
