<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Post;
use App\Models\Tag;
use App\Models\User;
use DB;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        // dd($request->user()->name);
        //
        $posts = Post::all()->count();
        $users = User::all()->count();
        $tags = Tag::all()->count();
        $categories = Category::all()->count();

        return Inertia::render("admin/dashboard", [
            "postsCount" => $posts,
            "usersCount" => $users,
            "tagsCount" => $tags,
            "categoriesCount" => $categories
        ]);
        
    }

    public function posts(Request $request)
    {

        $data = [];

        if ($request->user()->isAdministrator()) {
            // $posts = Post::all();
            $posts = DB::table("posts")->paginate(10);
        } else {
            $posts = Post::get()->where("user_id", $request->user()->id);
        }

        // dd($posts);
        
        foreach($posts as $post) {
            $content = json_decode($post->description) ?? $post->description;

            if(is_array($content)) {
                $content = implode($content);
            }

            $dataObj = [
                "id" => $post->id,
                "title" => $post->title,
                "description" => $content,
                "image" => $post->image_path,
                "user" => User::where("id", $post->user_id)->first()->name,   
                "category" => Category::where("id", $post->category_id)->first()->category_name             
            ];

            $data[] = $dataObj;
        }  
        
        //-- paginator object have many methods like total(), perPage(), count() etc.
        $pages = ceil($posts->total() / $posts->perPage());

        

        return Inertia::render("admin/posts/posts", [
            "data" => $data,
            "token" => csrf_token(),
            "totalPages" => $pages,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
        
        return Inertia::render("admin/posts/create");
        
        
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
        $post->user_id = $request->user()->id;
        $post->category_id = $request->category;

        $post->save();

        $latestPost = Post::get()->last();

        //-- handles tags if it is not available in tags table then it will add
        //-- and attach to intermediate table post_tag otherwise it will attach
        //-- only, and this will execute if tags array is being passed
        if (!empty($request->tags)) {
            foreach($request->tags as $tag) {
                $findTag = Tag::all()->where("tag_name", trim($tag))->first();

                if (empty($findTag)) {
                    $newTag = Tag::create(["tag_name" => trim($tag)]);

                    $post = Post::findOrFail($latestPost->id);
                    $post->tags()->attach($newTag->id);
                } else {

                    $post = Post::findOrFail($latestPost->id);
                    $post->tags()->attach($findTag->id);
                }
            }
        }

        return redirect(route("admin.posts"));
        
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
    public function edit(Request $request, string $id)
    {
        

        //
        $post = Post::findOrFail($id);

        //-- Adding policy to only allow post owner to update post
        if ($request->user()->cannot("update", $post)) {
            abort(403, "You are not owner of this post");
        }

        $content = json_decode($post->description) ?? $post->description;

        if(is_array($content)) {
            $content = implode($content);
        }

        //-- reading tags
        $tags = [];
        foreach($post->tags as $tag) {
            $tags[] = [
                "tag_name" => $tag->tag_name,
                "id" => $tag->id
            ];            
        }

        $data = [
            "id" => $id,
            "title" => $post->title,
            "description" => $content,
            "image" => $post->image_path,
            "category_id" => $post->category_id,
            "token" => csrf_token(),
            "tags" => $tags
        ];

        return Inertia::render("admin/posts/edit", [
            "data" => $data
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
        $post = Post::findOrFail($id);

        //-- Adding Policy to Not allow user to edit post
        //-- if it doesn't belong to him.
        if ($request->user()->cannot("update", $post)) {
            abort(403, "You are not owner of this post");
        }
        

        $request->validate([
            "title" => ["required", "min:2"],
            "description" => ["required"],            
        ]);        

        $post = Post::findOrFail($id);

        $submittedPost = $request->all();
        
        $post->title = $submittedPost["title"];
        $post->description = $submittedPost["description"];
        $post->user_id = $request->user()->id;
        $post->category_id = $request->category;

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

    public function removeTag(Request $request, string $postId) {
       
        
        
        $post = Post::findOrFail($postId);

        //-- Verifying if user is post owner
        if ($request->user()->cannot("update", $post)) {
            abort(403, "You are not owner of this post");
        }

        //-- detach will remove entry from intermiate or pivot table
        $post->tags()->detach($request->tagId);

        return redirect(route("admin.edit", $postId));

    }

    public function attachTag(Request $request, string $postId) {
        $tag = Tag::all()->where("tag_name", trim($request->tag))->first();
        

        if (empty($tag)) {
            $newTag = Tag::create([
                "tag_name" => trim($request->tag)
            ]);

            $post = Post::findOrFail($postId);
            $post->tags()->attach($newTag->id);

        } else {            
            $post = Post::findOrFail($postId);
            $post->tags()->attach($tag->id);
        }
        
        return redirect()->back();
    }
}
