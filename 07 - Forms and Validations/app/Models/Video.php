<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Video extends Model
{
    //-- At Video Model, we telling Video is morph (link) with many model tag is one of them.
    public function tags() {
        return $this->morphToMany(Tag::class, "taggable");
    }
}
