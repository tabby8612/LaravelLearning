<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Reply extends Model
{
    //
    public $fillable = ["name", "reply_text", "comment_id"];
}
