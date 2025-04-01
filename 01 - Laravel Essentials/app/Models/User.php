<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use App\Models\Post;
use App\Models\Role;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    //? ------------- Section 11 - Eloquent Relationships ----------------------------

    public function post() {

        // return $this->hasOne("App\Post", "foreign key", "local key");
        //-- Laravel will create one-to-one relationship b/w
        //-- user.id == post.user_id 
        //-- if foreign and local not provided

        return $this->hasOne(Post::class);  // equivlent to below line
        // return $this->hasOne(Post::class, "user_id", "id");
    }

    public function posts() {
        return $this->hasMany(Post::class);
    }

    public function roles() {
        //-- Laravel will by default join the two related model names in alphabetical order
        //-- so User and Role will make role_user
        
        // return $this->belongsToMany(Role::class, '<immediatary_table>', '<foreign key of this model>', '<foreign key of joining model>');
        // return $this->belongsToMany(Role::class, 'role_user', 'user_id', 'role_id');
        return $this->belongsToMany(Role::class)->withPivot("created_at", "updated_at");
    }

    public function image() {
        return $this->morphMany(Photo::class, "imagable");
    }

    //? ------------- /Section 11 - Eloquent Relationships ----------------------------


}
