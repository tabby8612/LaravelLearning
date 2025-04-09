<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Carbon\Carbon;
use Carbon\Traits\Timestamp;
use DB;
use Illuminate\Http\Request;
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
    
    public function index() {

        
        //
        //-- pagination can be done using paginate function 
        //-- we need to use DB class then table and paginate function
        //-- We need to pass no. of post we wamt per page
        //-- Laravel by default execute result by using 'page' parameter
        $paginatorPosts = DB::table("posts")->paginate(5);
        $data = [];

        //-- now we interate to get posts into data
        foreach($paginatorPosts as $post) {
            
            $date = Carbon::create($post->updated_at);
            $user = Post::findOrFail($post->id)->user->name;
            
            $postObj = [
                "id" => $post->id,
                "title" => $post->title,
                "description" => $post->description,
                "image" => $post->image_path,
                "date" => $date->diffForHumans(),
                "user" => $user
            ];
            
            $data[] = $postObj;
        }

        //-- paginator object have many methods like total(), perPage(), count() etc.
        $pages = ceil($paginatorPosts->total() / $paginatorPosts->perPage());

        return Inertia::render('homepage', [
            "data" => $data,
            "totalPages" => $pages
            
        ]); 
    }

    public function contact() {

        $data = $this->getData();
               

        return Inertia::render("contact", [
            "data" => $data
        ]);
    }


    public function post($id) {
        $post = Post::findOrFail($id);

        
        $postContent = [
            "id" => $post->id,
            "title" => $post->title,
            "description" => $post->description,
            "updated_at" => $post->updated_at->diffForHumans(),
            "user" => $post->user->name,
            "image" => $post->image_path,
        ];

        $data = $this->getData();               
        

        return Inertia::render("SinglePost", [
            "post" => $postContent,
            "data" => $data
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
