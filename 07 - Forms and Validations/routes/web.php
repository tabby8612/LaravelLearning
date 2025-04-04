<?php

use App\Models\Country;
use App\Models\Tag;
use App\Models\User;
use App\Models\Role;
use App\Models\Photo;
use App\Models\Video;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PostController;


Route::get('/', function () {
    return view('welcome');
});

//? ------------- Section 5 - Controllers ----------------------------
/*
Controllers handle the connection b/w views (fronend) and model (backend)

You can create controller file in app>http>Controllers yourself or you can write this artisan line. 
The option --resource means it will create several methods like index,create,delete,update, store, etc.

*/

//-- To link route with Controller you can use resource, now /post will invoke index method, 
//-- /post/create will invoke create method, and post/custom will invoke custom method.
// Route::resource("post", PostController::class);

// Route::resource("post/{id}", PostController::class);

//-- We can also invoke a method of controller using .get verb by providing Controller@Method format
// Route::get("abc", "PostController@custom");

//-- When we want to link multiple route to their multiple Controller 
// Route::resources([
//     "posts" => PostController::class,
//     "photos" => PhotoController::class,

// ]);


//? ------------- /Section 5 ----------------------------


//? ------------- Section 4 - Routes ----------------------------

{
    // Route::get('/contact', function () {
    //     return "<h1>Contact Page</h1>";
    // });

    // Route::get('/post/{id}/{name}', function ($id, $name) {
    //     return "<h1>You are on Post {$id} and {$name}</h1>";
    // });

    // // Laravel 8 way of renaming route. Second parameter will be array  
    // Route::get("/admin/posts/category", Array("as" => "admin.home", function() {
    //     $url = route("admin.home");

    //     return "This is a {$url}";
    // }));

    // // Laravel 12 way of renaming route. You need to chain it with name function.
    // Route::get("/admin/posts/tags", function () {
    //     $url = route("tags");

    //     return "<h1>This is named route of $url</h1>";
    // })->name("tags");

//? ------------- /Section 4 ----------------------------
}

//? ------------- Section 6 - Views ----------------------------

// Since contact is NOT one of the RESTFUL methods 
// like index, create, store, edit, destore, store  
// so we need to use get verb and pass array

// Route::get("contact/{name}/{age}", [PostController::class, "contact"]);



//? ------------- Section 6 - Views ----------------------------





//? ------------- Section 9 - Raw SQL Queries ----------------------------

// Route::get("insert", function() {
//     DB::insert("INSERT INTO posts(title,content,image) VALUES(?,?,?)", ["PHP With Laravel", "Laravel is best PHP Framework","image"]);
// });

// Route::get("read", function() {
//     $result = DB::select("SELECT * FROM posts WHERE id=?", ["1"]);

//     return var_dump($result);
// });

// Route::get("update", function() {
//     $query = DB::update("UPDATE `posts` SET `title`= ?,`votes`=? WHERE `id`=?", ["PHP With Laravel Framework", 10, 1]);

//     return $query;
// });

// Route::get("delete", function() {
//     $query = DB::delete("DELETE FROM `posts` WHERE `id`=?", [1]);
//     return $query;
// });

//? ------------- /Section 9 - Raw SQL Queries ----------------------------


/*
Commented out for Section 18
//? ------------- Section 10 - Eloquent (Oobject Relational Model ORM) ----------------------------

use App\Models\Post;

Route::get("find", function() {
    $post = Post::find(2);

    return $post->title;  //>> returns Collection object that is JSON and work like PHP object
});

Route::get("findwhere", function() {
    $post = Post::where("id", 2)->orderBy("title", "desc")->take(1)->get();

    // where("votes", "<", 50) is also a way to make where clause

    return $post;  
});

Route::get("basicinsert", function() {
    $post = new Post();

    $post->title = "Laravel Got Eloquent";
    $post->content = "Eloquent Is Used For Database Interaction";
    $post->image = "Laravel Image";

    return $post->save();
});

Route::get("create", function() {
    $post = new Post();

    $post::create([
        "title" => "Laravel Made Routing Easy",
        "content" => "We can easily handle routes",
        "image" => "routing image"
    ]);
});

Route::get("update", function() {
    Post::where("id", 2)->where("votes", 0)->update(["title" => "PHP Has Got Laravel UPDATED!!"]);

});

Route::get("delete", function () {
    $post = Post::find(2);

    $post->delete();
});

Route::get("massdelete", function () {
    Post::destroy([3, 4]);

    // Post::where("id", ">", "2")->delete();  //>> Also used for mass delete
});



Route::get("softdelete", function() {
    $post = Post::find(5)->delete();

    return $post;
});

Route::get("restore", function() {
    // $post = Post::withTrashed()->where("votes", 0)->get();
    $post = Post::withTrashed()->where("votes", 0)->restore();

    return $post;
});

Route::get("forceDelete", function() {
    // $post = Post::withTrashed()->where("votes", 0)->get();
    $post = Post::onlyTrashed()->where("votes", 0)->forceDelete();

    return $post;
});

//? ------------- /Section 10 - Eloquent (Object Relational Model ORM) ----------------------------

//? ------------- Section 11 - Eloquent Relationships ----------------------------

//-- One to One Relation
Route::get("user/{id}/post", function ($id) {
    $userWithPost = User::find($id)->post;

    return $userWithPost;
});

//-- Inverse Relation
Route::get("post/{id}/user", function ($id) {
    $postUser = Post::find($id)->user;
    return $postUser;
});

//-- One to Many Relations
Route::get("user/{id}/posts", function ($id) {
    $userPosts = User::find($id)->posts;

    foreach($userPosts as $post) {
        echo "<br/> post title: ", $post->title, "<br/>";
    }

    return;

});

Route::get("user/{id}/role", function ($id) {
    
    $user = User::find($id);
    $roles = $user->roles()->orderBy('name')->get();

    foreach($roles as $role) {
        echo "<br/> 👉👉👉 role: ", $role->name, "<br/>";
        echo "<br/>------------------------------- ";
    }

    return;
});

//-- Many-to-Many Inverse
Route::get("adminroles", function() {
    $roles = Role::find(1);
    $admins = $roles->users()->get();

    return $admins;

});

//-- Asscessing Pivote/Immediate Table Data
Route::get("rolesassigned", function() {

    $user = User::find(1);

    foreach ($user->roles as $role) {

        echo "<br/> 👉 role->pivot->created_at: ", $role->pivot->created_at, "<br/>";
    
    }
});


//-- hasManyThrough Relation
Route::get("user/country", function() {
    $country = Country::find(6);

    foreach($country->posts as $post) {
        echo "<br/> 👉👉👉 post: ", $post->title, "<br/>";
    }

});


//-- Polymorphic Relation
// in which child model can have relationship with more than one table
//>> For example, imagine you are building an application that allows 
//>> users to share blog posts and videos. In such an application, 
//>> a Comment model might belong to both the Post and Video models
//>> In this example, photos table can belong to both posts and users table. 

Route::get("post/{id}/photo", function($id) {
    $post = Post::find($id);

    foreach($post->image as $image) {
        echo "<br/> 👉👉👉 image: ", $image->path, "<br/>";
    }

});

Route::get("user/{id}/photo", function ($id) {
    $user = User::find($id);
    
    foreach($user->image as $image) {
        echo "<br/> 👉👉👉 image: ", $image->path, "<br/>";
    }
});

Route::get("photo/{id}/user", function ($id) {
    $user = Photo::findOrFail($id);

    return $user->imagable;

});

//-- Polymorphic Many-to-many
//-- For example tags are required by both Post and Video 
//-- and there can be many tags attach to many posts or videos, so this will be many-to-many polymorphic 
Route::get("post/{id}/tags", function($id) {
    $post = Post::find($id);

    foreach($post->tags as $tag) {
        echo "<br/> 👉 tag: ", $tag->name, "<br/>";
    }    
});

Route::get("video/{id}/tags", function($id) {
    $video = Video::find($id);        

    foreach($video->tags as $tag) {
        echo "<br/> 👉 tag: ", $tag->name, "<br/>";
    }    
});

Route::get("tag/{id}", function ($id) {
    $tag = Tag::find($id);

    foreach($tag->posts as $post) {
        echo "<br/> 👉👉👉 post: ", $post, "<br/>";
    }
});

//? ------------- Section 11 - Eloquent Relationships ----------------------------


*/

Route::resource("post", PostController::class);

Route::get("createForm", function () {
    return view("posts/create");
});


//? ------------- Section 20 - More Model Manipulations ----------------------------

Route::get("dates", function() {
    //-- creates Carbon instance for current date
    //--  in human readable format
    $date1 = now();   
    echo "<br/> 👉 date1: ", $date1->toFormattedDateString(), "<br/>";

    $date2 = now("Europe/London");
    echo "<br/> 👉 date2: ", $date2, "<br/>";

});

Route::get("getname", function() {
    $user = User::findOrFail(1);

    echo $user->name;
});

Route::get("setname", function() {
    $user = User::findOrFail(1);

    $user->name = "Tabish";

    echo $user->name;
});



//? ------------- /Section 20 - More Model Manipulations ----------------------------

//? ------------- Section 21 - Forms Uploading Files ----------------------------


Route::get("upload", function () {
    return view("posts/upload");
});

Route::post("uploadfile", [PostController::class, "fileHandler"]);

//? ------------- /Section 21 - Forms Uploading Files ----------------------------