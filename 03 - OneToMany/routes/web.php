<?php

use App\Models\Post;
use App\Models\User;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});


Route::get("create", function () {
    $user = User::findOrFail(1);

    $post = new Post(["title"=>"Rich Dad Poor Data", "content"=>"The best book ever"]);

    return $user->posts()->save($post);
});

Route::get("read", function() {
    $user = User::findOrFail(1);

    foreach($user->posts as $post) {
        echo "<br/> 👉👉👉 post: ", $post->title, "<br/>";
    }
});

Route::get("update", function () {
    $user = User::findOrFail(1);

    return $user->posts()->where("id", "=", "1")->update(["title" => "The Secret Updated!!"]);
});

Route::get("delete", function() {
    $user = User::findOrFail(1);

    return $user->posts()->where("id", 2)->delete();
});