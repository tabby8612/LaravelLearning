<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use Carbon\Traits\Timestamp;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Session\Session;

class CommentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        
        //
        $request->validate([
            "comment" => ["required", "min:30"]
        ]);

        $comment = new Comment();
        $comment->name = auth()->user()->name;
        $comment->comment = $request->comment;
        $comment->post_id = $request->postId;
        $comment->created_at = now();
        $comment->save();

        session(["message" => "Comment Posted"]);

        // return redirect()->action([HomeController::class, "post"], $request->postId);
        
        
    }

    /**
     * Display the specified resource.
     */
    public function show(Comment $comment)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Comment $comment)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Comment $comment)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Comment $comment)
    {
        //
    }
}
