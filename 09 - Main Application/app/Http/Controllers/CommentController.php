<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use Carbon\Carbon;
use Carbon\Traits\Timestamp;
use DB;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Symfony\Component\HttpFoundation\Session\Session;

class CommentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index($perPage = 10)
    {
        //
        $PaginateComments = DB::table("comments")->paginate($perPage);

        $comments = [];

        foreach($PaginateComments as $comment) {

            
            $comments[] = [               

                "id" => $comment->id,
                "name" => $comment->name,
                "comment" => json_decode($comment->comment)[0] ?? $comment->comment,
                "postId" => $comment->post_id,
                "status" => $comment->status,
                "created_at" => Carbon::parse($comment->created_at)->toFormattedDateString() ?? "25/02/2025",
            ];
        }

        
        $totalPages = $PaginateComments->total() / $PaginateComments->perPage();

        

        return Inertia::render("admin/comments/comments", [
            "comments" => $comments,
            "totalPages" => $totalPages,
            "message" => session()->get("message")
        ]);
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

        session(["message" => "Your Comment Is Submitted For Moderation"]);

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

        // dd($comment);
        $content = json_decode($comment->comment) ?? $comment->comment;

        if(is_array($content)) {
            $content = implode($content);
        }

    //     id: string;
    // name: string;
    // comment: string;
    // post_id: string;
        
        $commentObj = [
            "id" => $comment->id,
            "name" => $comment->name,
            "comment" => $content,
            "postId" => $comment->post_id,
            "postTitle" => $comment->post->title
        ];
        
        //-- Upon passing the ID, Larvel provide comment object
        return Inertia::render("admin/comments/edit", [
            "comment" => $commentObj,            

        ]);


    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Comment $comment)
    {
        //
        


        $comment->name = $request->authorName;
        $comment->comment = $request->contentArr;
        $comment->save();

        return redirect()->route("comment.index");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Comment $comment)
    {
        //
        $comment->delete();
        return redirect()->route("comment.index")->with("message", "Comment with ID {$comment->id} deleted");
    }

    public function approve($commentId) {
        $comment = Comment::findOrFail($commentId);
        $comment->status = "approved";
        $comment->save();
        
    }

    public function disapprove($commentId) {
        $comment = Comment::findOrFail($commentId);
        $comment->status = "moderation";
        $comment->save();
    }

}
