<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $posts = Post::all()->count();
        $users = User::all()->count();

        return Inertia::render("admin/dashboard", [
            "postsCount" => $posts,
            "usersCount" => $users
        ]);
        
    }

    public function posts()
    {
        
        //
        $data = [];

        $posts = Post::all();
        
        foreach($posts as $post) {
            $dataObj = [
                "id" => $post->id,
                "title" => $post->title,
                "description" => $post->description,
                "image" => $post->image_path,
                "user" => $post->user->name,                
            ];

            $data[] = $dataObj;
        }        

        return Inertia::render("admin/posts", [
            "data" => $data,
            "token" => csrf_token(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
        $token = csrf_token();
        return Inertia::render("admin/create", ["token" => $token]);
        
        
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
        $request->validate([
            "title" => ["required", "min:2"],
            "description" => ["required"],
            "image" => ["file", "image"]
        ]);

        $file = $request->file("image");
        $fileName = $file->getClientOriginalName();

        //-- stores file in public folder depending on filesystems.php file
        //-- since composer run dev builds the files so it will be in build/public
        $file->move("images", $fileName);  
        
        //-- submits data into database
        $submittedPost = $request->all();
        $post = new Post();
        $post->title = $submittedPost["title"];
        $post->description = $submittedPost["description"];
        $post->image_path = $fileName;
        $post->user_id = 1;

        echo $post->save() ? "Success" : "Failed";

        return redirect("/admin/posts/all");
        
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
        $post = Post::findOrFail($id);

        return;

        
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
        $post = Post::findOrFail($id);

        $data = [
            "id" => $id,
            "title" => $post->title,
            "description" => $post->description,
            "image" => $post->image_path,
            "token" => csrf_token()
        ];

        return Inertia::render("admin/edit", [
            "data" => $data
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //

        $request->validate([
            "title" => ["required", "min:2"],
            "description" => ["required"],            
        ]);


        

        $post = Post::findOrFail($id);

        $submittedPost = $request->all();
        
        $post->title = $submittedPost["title"];
        $post->description = $submittedPost["description"];
        $post->user_id = 1;

        if (isset($submittedPost["image"])) {
            $file = $request->file("image");
            $fileName = $file->getClientOriginalName();    
            $post->image_path = $fileName;
            $file->move("images", $fileName);
        }

        return $post->save() ? redirect("/admin/posts/all") : redirect()->back();

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
        

        $post = Post::findOrFail($id);

        $post->delete();

        return redirect("/admin/posts/all");
    }
}
