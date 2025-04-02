<?php

use App\Models\Photo;
use App\Models\Staff;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

Route::get("insert", function() {
    $staff = Staff::findOrFail(1);
    
    return $staff->photo()->create(["path" => "TabishImage.jpg"]);
});

Route::get("read", function () {
    $staff = Staff::findOrFail(1);

    foreach($staff->photo as $photo) {
        echo "<br/> web.php 👉👉👉 20 👉👉👉 photo: ", $photo->path, "<br/>";
    }
});

Route::get("update", function () {
    $staff = Staff::findOrFail(1);

    $photo = $staff->photo()->where("id", 1)->first();
    $photo->path = "New Tabish.jpg";
    return $photo->save();

});

Route::get("delete", function() {
    $staff = Staff::findOrFail(1);

    return $staff->photo()->delete(); // deletes all photos
});

Route::get("assign", function() {
    $staff = Staff::findOrFail(1);

    $photo = Photo::findOrFail(2);

    return $staff->photo()->save($photo);
});

Route::get("unassign", function() {
    $staff = Staff::findOrFail(1);
    
    return $staff->photo()->update(["path" => "", "imagable_id" => 0, "imagable_type" => ""]);
});