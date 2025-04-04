<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $post = Post::all(["title", "id", "path"]);
        //-- calling query scope
        // $post = Post::latest();

        return view("posts.index", ["data" => $post]);
    }

    public function contact($name, $age) {
        // return view(view: "contact", data: ["name" => $name, "age" => $age]);
        
        //-- Compact function takes strings and convert it
        //--  into an array of variables like above
        // return view("contact", compact('name', "age"));
        
        $people = ["Tabish", "Danish", "Edwin"];
        return view( "contact", [
            "name" => $name,
            "age" => $age,
            "people" => $people
            ]);
    }

    // Custom Method
    public function custom()
    {
        return "<h1>This is custom method</h1>";
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return view("posts.create");
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)        
    {
        //! If this validation fails Laravel will automatically redirect
        //! the user back to their previous location

        //-- bail rule means if required fails then min:4 will not checked
        $validated = $request->validate([
            // "title" => "required|min:4"
            "title" => ["bail", "required", "min:4"]
        ]);

        //-- validateWithBag will store error message in MessageBag in page with multiform
        //-- Allowing you to retrieve the error messages for a specific form
        // $validatedData = $request->validateWithBag('post', [

        //     'title' => ['required', 'min:4'],        
        // ]);


        $title = $request->title;
        Post::create(["title" => $title]);
        
        return redirect("/post");

    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $post = Post::findOrFail($id);

        return view("posts.show", compact("post"));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
        $post = Post::findOrFail($id);

        return view("posts.edit", compact("post"));

    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {

        $data = Post::findOrFail($id);

        $data->update(["title" => $request->title]);

        return redirect("/post/$id");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
        
        $post = Post::findOrFail($id);

        $post->delete();

        return redirect("/post");

    }


    public function fileHandler(Request $request) {

        //-- request object has file function that takes name of upload input field
        echo "<br/> PostController.php 👉👉👉  <pre>" ;
        var_dump($request->file("fileToUpload"));
        echo "</pre>" ;

        //-- request objects makes name of upload field as object
        //-- and provide varies method on it.
        $inputFile = $request->fileToUpload;

        //-- Building method available in input file object
        echo "<br/> PostController.php 👉 request->fileToUpload: ", $inputFile, "<br/>";
        echo "<br/> PostController.php 👉 request->fileToUpload: ", $inputFile->path(), "<br/>";
        echo "<br/> PostController.php 👉 request->fileToUpload: ", $inputFile->extension(), "<br/>";
        echo "<br/> PostController.php 👉 request->fileToUpload: ", $inputFile->getClientOriginalName(), "<br/>";
        echo "<br/> PostController.php 👉 request->fileToUpload: ", $inputFile->getMaxFilesize(), "<br/>";
        echo "<br/> PostController.php 👉 request->fileToUpload: ", $inputFile->getErrorMessage(), "<br/>";

        echo "<br/> PostController.php 👉👉👉 145 👉👉👉 input: <pre>" ;
        var_dump($inputFile);
        echo "</pre>" ;

        //-- isValid() is also a function that tell if uploaded file is valid
        if ($inputFile->isValid()) {
            $filename = $inputFile->getClientOriginalName();

            //-- move function takes directory (if not exist makes it in public folder)
            //-- and move uploaded file with the name provided in second parameter.
            $inputFile->move("images", $filename);

            //-- Store image name in database to retieve it.
            $post = Post::findOrFail(1);
            $post->path = $filename;
            $post->save();
            
        }

        



        return;
    }
}
