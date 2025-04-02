<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    //

    //! We are telling Laravel to allow mass assignment to these fields
    //! Laravel by default protect hacker from making changes in important
    //! security fields like is_admin, balance, etc.
    protected $fillable = [
        "title", "content"
    ];
}
