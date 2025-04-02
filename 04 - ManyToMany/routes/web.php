<?php

use App\Models\Role;
use App\Models\User;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});


Route::get("create", function () {
    $user = User::findOrFail(1);

    return $user->roles()->create(["name" => "Administrator"]);
});

Route::get("read", function () {
    $user = User::findOrFail(1);

    // $user->roles  // will give Collection Object

    foreach($user->roles as $role) {
        echo "<br/>👉👉 role: ", $role->name, "<br/>";
    }
});

Route::get("update", function () {
    $user = User::findOrFail(1);

    if ($user->has("roles")) {
        foreach($user->roles as $role) {
            if ($role->name === "Administrator") {
                $role->name = "Admin";
                $role->save();
            }
        }
    }
});

Route::get("delete", function() {
    $user = User::findOrFail(1);

    //! inValid approach as $user->roles() return queryBuilder in belongtoMany
    //! it will not delete record from the roles table
    // return $user->roles()->where("id", 1)->delete();
    
    //-- Valid approach as iteration on $user->roles gives Role object $role
    //-- Now on Role object we can delete record from Role Table 
    // foreach($user->roles as $role) {
    //     $role->where("id", 1)->delete();
    // }

    //? Best Approach as it distach relationship and then delete
    //? It removes entry from role_user table and delete in roles table
    $user->roles()->detach(1);  // This removes the relationship but keeps the role in DB.
    Role::where("id", 2)->delete();  // This deletes the role itself.

});






Route::get("attach", function () {
    $user = User::findOrFail(1);

    //-- Here we are attaching Subscriber and Editor with id 3 and 4 to user id 1;
    $user->roles()->attach([3,4]); 
});

Route::get("detach", function() {
    $user = User::findOrFail(1);
    
    //-- Here we are deataching Subscriber and Editor with id 3 and 4 to user id 1;
    return $user->roles()->detach([3,4]);
});

Route::get("sync", function() {
    $user = User::findOrFail(1);

    //-- Sync method removes all previous attachment in role_user and adds given one.
    //-- Now user will have all three roles Admin, Editor, Subscriber
    return $user->roles()->sync([3,4,5]);
});