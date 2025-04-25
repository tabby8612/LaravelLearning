<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use App\Models\Reply;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ReplyController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //

        $replies = Reply::all();


        // foreach($replies as $reply) {
        //     dd($reply);
        // }

        return Inertia::render("admin/replies/AllReplies", [
            "replies" => $replies
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
            "replyContent" => ["required", "min:10"]
        ]);
        
        Reply::create(
            [
                "name" => auth()->user()->name,
                "reply_text" => $request->replyContent,
                "comment_id" => $request->comment_id,
            ]
        );

        

        session()->flash("replySuccessMessage", "Your Reply Is Submitted");
    }

    /**
     * Display the specified resource.
     */
    public function show(Reply $reply)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Reply $reply)
    {
        //
        

        return Inertia::render("admin/replies/edit", [
            "reply" => $reply
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Reply $reply)
    {
        //
        

        $reply->name = $request->name;
        $reply->reply_text = $request->reply;
        $reply->save();

        return redirect(route("reply.index"));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Reply $reply)
    {
        //
    }
}
