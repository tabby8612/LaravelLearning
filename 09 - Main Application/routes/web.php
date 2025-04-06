<?php

use App\Http\Controllers\PostController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

Route::resource("admin", PostController::class);

// Route::get("admin", function() {
//     return Inertia::render("admin/dashboard");
// });

Route::get("admin/posts/all", [PostController::class, "posts"])->name("admin.posts");

// Route::get("admin/post/create", function() {
//     return Inertia::render("admin/create");
// });

// Route::get("admin/post/{id}/edit", function($id) {
//     $data = [
//         "id" => 1,
//         "title" => "The Secret Book",
//         "description" => "This is the description of Secret Book",
//     ];
//     return Inertia::render("admin/edit", [
//         "data" => $data
//     ]);
// });

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
