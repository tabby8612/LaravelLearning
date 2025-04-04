<?php

use App\Http\Controllers\PostController;
use App\Mail\OrderShipped;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified', 'role'])->group(function () {
    Route::get('dashboard', function () {
        //-- Auth::user returns the object of current authentic user
        $user = Auth::user();
      
        return Inertia::render('dashboard', [
            "name" => $user->name,
        ]);
    })->name('dashboard');
});


//? Section 23 - Middleware //

//-- New Way
// Route::get("/admin/user/role", function() {
    //     return "Middleware Role";
    // })->middleware("role");
    
    //-- Make More Sense
    Route::middleware("role")->get("/admin/user/role2", fn() => redirect("dashboard"));
    
    //-- Old Method
    // Route::get("/admin/user/role/old", [
        //     "middleware" => "role",
        //     function () {
            //         return "middleware role";
            //     }
            // ]);
            
//? /Section 23 - Middleware //

//? Section 24 - Middleware //

Route::get("/checksession", [PostController::class, "index"]);

//? /Section 24 - Middleware //

//? Section 25 - Sending Email //

Route::get("sendemail", function() {
    Mail::to("tabishsajwani@gmail.com")->send(new OrderShipped());

});

//? Section 25 - Sending Email //



require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
