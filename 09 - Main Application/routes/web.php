<?php

use App\Http\Controllers\CategoryController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\ReplyController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\TagController;
use App\Http\Controllers\UserController;
use App\Models\Post;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [HomeController::class, "index"])->name('home');

Route::get('posts/all', [HomeController::class, "index"])->name('posts');

Route::get("contact", [HomeController::class, "contact"]);

Route::get("about", [HomeController::class, "about"]);

Route::get("post/{id}", [HomeController::class, "post"])->name("single.post");

Route::get("{categoryId}/post", [HomeController::class, "categoryPost"])->name("categoryPosts");

Route::resource("comment", CommentController::class);

Route::middleware(['auth', 'verified'])->group(function () {    
    
    Route::resource("admin", PostController::class);
    Route::resource("comments/reply", ReplyController::class);

    Route::get('admin', [PostController::class, "index"])->name('admin')->can("isAdmin", Post::class);

    Route::get("admin/roles/all", [RoleController::class, "index"])->name("roles.index")->can("isAdmin", Post::class);
    
    Route::post("admin/roles/{id}/attach", [RoleController::class, "attach"])->name("roles.attach");
    
    Route::post("admin/roles/{id}/detach", [RoleController::class, "detach"])->name("roles.detach");
    
    Route::resource("user", UserController::class);

    Route::resource("tags", TagController::class);

    Route::resource("categories", CategoryController::class);

    Route::post("post/{id}/tag/detach", [PostController::class, "removeTag"])->name("tag.detach");
    
    Route::post("post/{id}/tag/attach", [PostController::class, "attachTag"])->name("tag.attach");

    Route::post("comment/{id}/approve", [CommentController::class, "approve"])->name("comment.approve");

    Route::post("comment/{id}/disapprove", [CommentController::class, "disapprove"])->name("comment.disapprove");
});


// Route::middleware(["IsPostOwner"])->group(function() {
//     Route::get("admin/{admin}/edit", [PostController::class, "edit"]);
//     Route::delete("admin/{admin}", [PostController::class, "destroy"]);
// });


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
