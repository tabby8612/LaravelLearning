<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Post;
use Cache;
use Carbon\Carbon;
use Carbon\Traits\Timestamp;
use DB;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class HomeController extends Controller {

    private function getData() {
        $posts = Post::all()->take(5);
        $data = [];

        foreach($posts as $post) {
            
            $date = Carbon::create($post->updated_at);
            $user = Post::findOrFail($post->id)->user->name;

            
            
            $postObj = [
                "title" => $post->title,
                "description" => $post->description,
                "image" => $post->image_path,
                "date" => $date->diffForHumans(),
                "user" => $user
            ];
            
            $data[] = $postObj;
        } 

        return $data;
    }


    private function isLoggedIn() {
        
        return !empty(Auth::user());
    } 
    
    public function index() {       
        

        //-- pagination can be done using paginate function 
        //-- we need to use DB class then table and paginate function
        //-- We need to pass no. of post we wamt per page
        //-- Laravel by default execute result by using 'page' parameter
        $paginatorPosts = DB::table("posts")->paginate(5);
        $data = [];


        //-- now we interate to get posts into data
        foreach($paginatorPosts as $post) {
            

            //-- handling data stored in HTML formatted way
            $content = json_decode($post->description) ?? $post->description;

            if(is_array($content)) {
                $content = implode($content);
            }
            
            $date = Carbon::create($post->updated_at);
            
            $user = Post::findOrFail($post->id)->user->name;

            //-- since $post is Stdclass so we need to do this way
            //-- otherwise Post instance has category method
            // $category = Category::all()->where("id", $post->category_id)->first()->category_name;

            
            $category = Post::where("id", $post->id)->first()->category;
            
            // Cache::flush(); //-- is used to clean cache
            

            $postObj = [
                "id" => $post->id,
                "title" => $post->title,
                "description" => $content,
                "image" => $post->image_path,
                "date" => $date->diffForHumans(),
                "user" => $user,
                "category" => $category ? $category->category_name : "Not Listed" 
                
            ];
            
            $data[] = $postObj;
        }

        //-- paginator object have many methods like total(), perPage(), count() etc.
        $pages = ceil($paginatorPosts->total() / $paginatorPosts->perPage());

        

        return Inertia::render('homepage', [
            "data" => $data,
            "totalPages" => $pages,
            "isLoggedIn" => $this->isLoggedIn()
            
        ]); 
    }

    public function contact() {

        $data = $this->getData();
               

        return Inertia::render("contact", [
            "data" => $data,
            "isLoggedIn" => $this->isLoggedIn()
        ]);
    }


    public function post(Request $request, string $id) {
        $post = Post::findOrFail($id);

        //-- handling data stored in HTML formatted way
        $content = json_decode($post->description) ?? $post->description;

        if(is_array($content)) {
            $content = implode($content);
        }

        $tags = [];
        foreach($post->tags as $tag) {
            $tags[] = [
                "id" => $tag->id,
                "name" => $tag->tag_name
            ];
        }        
        
        $postContent = [
            "id" => $post->id,
            "title" => $post->title,
            "description" => $content,
            "updated_at" => $post->updated_at->diffForHumans(),
            "user" => $post->user->name,
            "image" => $post->image_path,
            "category" => $post->category->category_name,
            "tags" => $tags
        ];

        

        $data = $this->getData();  

        $comments = [];        
        foreach($post->comments as $comment) {
            
            $commObj = [
                "id" => $comment->id,
                "name" => $comment->name,
                "comment" => json_decode($comment->comment) ?? $comment->comment 
            ];

            $comments[] = $commObj;
        }
        
        $message = $request->session()->pull("message");


        return Inertia::render("SinglePost", [
            "post" => $postContent,
            "data" => $data,
            "isLoggedIn" => $this->isLoggedIn(),
            "comments" => $comments,
            "message" => $message
        ]);
    }

    public function categoryPost(Request $request, string $categoryId) {
        
        // $posts = Post::get()->where("category_id", $categoryId);

        // dd($posts->all());

        $paginatorPosts = DB::table("posts")->where("category_id", $categoryId)->paginate(5);

        
        $postData = [];

        foreach($paginatorPosts as $post) {

            $date = Carbon::create($post->updated_at);
            $category = Post::where("id", $post->id)->first()->category;
            $user = Post::findOrFail($post->id)->user->name;
            
            //-- handling data stored in HTML formatted way
            $content = json_decode($post->description) ?? $post->description;

            if(is_array($content)) {
                $content = implode($content);
            }   

            $postObj = [
                "id" => $post->id,
                "title" => $post->title,
                "description" => $content,
                "image" => $post->image_path,
                "date" => $date->diffForHumans(),
                "user" => $user,
                "category" => $category ? $category->category_name : "Not Listed" 
                
            ];
            
            $postData[] = $postObj;
        }

        //-- paginator object have many methods like total(), perPage(), count() etc.
        $pages = ceil($paginatorPosts->total() / $paginatorPosts->perPage());
        

        return Inertia::render('homepage', [
            "data" => $postData,
            "totalPages" => $pages,
            "isLoggedIn" => $this->isLoggedIn()
            
        ]);     
              
        

    }



    /* 
    public function chkPageinate() {
        
        //-- pagination can be done using paginate function 
        //-- we need to use DB class then table and paginate function
        //-- We need to pass no. of post we wamt per page
        //-- Laravel by default execute result by using 'page' parameter
        $paginatorPosts = DB::table("posts")->paginate(10);
        $data = [];

        //-- now we interate to get posts into data
        foreach($paginatorPosts as $post) {
            $data[] = $post;
        }

        //-- paginator object have many methods like total(), perPage(), count() etc.
        $pages = ceil($paginatorPosts->total() / $paginatorPosts->perPage());
        
        

        return Inertia::render('homepage', [
            "data" => $data,
            "totalPages" => $pages
            
        ]); 
    }
        */
}
