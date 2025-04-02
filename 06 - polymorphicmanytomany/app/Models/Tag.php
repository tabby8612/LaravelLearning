<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Tag extends Model
{
    //
    
    protected function posts() {
        return $this->morphedByMany(Post::class, "taggable");
    }

    protected function videos() {
        return $this->morphedByMany(Video::class, "taggable");
    }
}
