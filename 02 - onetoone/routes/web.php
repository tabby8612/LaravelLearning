<?php

use App\Models\Address;
use Illuminate\Support\Facades\Route;
use App\Models\User;

Route::get('/', function () {
    return view('welcome');
});


Route::get("insert", function() {
    $user = User::findOrFail(1);

    $address = new Address(["name" => "77701 Cardinal Alley"]);

    $user->address()->save($address);

});

Route::get("update", function () {
    $address = Address::where("id", "1")->first();

    $address->name = "812 Updated Cross Street";

    return $address->save();

});

Route::get("read", function() {
    $user = User::findOrFail(1);

    echo $user->address->name;

});

Route::get("delete", function() {
    $user = User::findOrFail(1)->address;

    echo $user->delete();
});