<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Models\Photo;

//>> Laravel will assume the table name is lowercase and plural, 
//>> in this case Post (class name) >> posts 
class Post extends Model
{


    //! In case table name is not posts and primary key is not id 
    //! then we need to explicity mention it.
    // protected $table = "admin_posts";
    // protected $primaryKey = "post_id"; 

    //! required for mass assignment method create
    protected $fillable = [
        "title", "content", "image"
    ];
    
    //! Soft Deleting is like putting 
    //! content in trash before permanent delete
    use SoftDeletes;

    //? ------------- Section 11 - Eloquent Relationships ----------------------------
    // One to One (inverse)

    protected function user() {

        // return $this->belongsTo(User::class); equivlent to
        return $this->belongsTo("App\Models\User"); 
        //-- you can give User::class constant
        //--  or namespace of User Class
    }


    public function image() {
        return $this->morphMany(Photo::class, "imagable");
    }

    // -- In Post model, we tell Post is in link with a many-to-many polymorphic class tags
    public function tags() {
        return $this->morphToMany(Tag::class, "taggable");
    }
    //? ------------- /Section 11 - Eloquent Relationships ----------------------------



}
