<?php

use App\Models\Post;
use App\Models\Tag;
use App\Models\Video;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});


Route::get("create", function() {
    $post = Post::create(["name" => "The Secret Book"]);
    $video = Video::create(["name" => "GTA 5"]);

    $tag1 = Tag::findOrFail(1);
    $tag2 = Tag::findOrFail(3);

    $post->tags()->save($tag1);
    $video->tags()->save($tag2);

});

Route::get("attach", function() {
    $video = Video::findOrFail(2);

    //-- Sync disatches all links for video id 2 and attach 3,4 
    return $video->tags()->sync([3,4]);
});

Route::get("read", function () {
    $post = Post::findOrFail(4);

    foreach($post->tags as $tag) {
        echo "<br/> 👉 tag: ", $tag->name, "<br/>";
    }
});

Route::get("delete", function () {
    $video = Video::findOrFail(2);

    $video->tags()->detach();
});

Route::get("update", function() {
    $video = Video::findOrFail(2);

    //-- updating tag name
    foreach($video->tags as $tag) {
        $tag->where("name","PC")->update(["name" => "Updated PC!!"]);
    }
});