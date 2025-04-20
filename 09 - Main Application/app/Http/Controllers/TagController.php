<?php

namespace App\Http\Controllers;

use App\Models\Tag;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Session;

class TagController extends Controller
{
    /**
     * Display a listing of the resource.
     */


    public function index()
    {
        //       

        $tags = Tag::all();

        $tagsData = [];

        foreach($tags as $tag) {
            

            $tagsData[] = [
                "id" => $tag->id,
                "name" => $tag->tag_name,
                "created_at" => $tag->created_at->isoFormat("DD-MM-YYYY"),
                "updated_at" => $tag->updated_at->isoFormat("DD-MM-YYYY"),
            ];
        }

        $message = Session::get("message");
        
        return Inertia::render("admin/tags/tags", [
            "tagsData" => $tagsData,
            "message" => $message
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        
        return Inertia::render("admin/tags/CreateTag");
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
        
        $request->validate([
            "tag" => ["required", "min:2"]
        ]);

        Tag::create(["tag_name" => $request->tag]);

        return redirect(route("tags.index"))->with("message", "Tag {$request->tag} Added Successfully");


    }

    /**
     * Display the specified resource.
     */
    public function show(Tag $tag)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Tag $tag)
    {
        //        

        $tagData = [
            "id" => $tag->id,
            "tag_name" => $tag->tag_name
        ];

        return Inertia::render("admin/tags/EditTag", [
            "tagData" => $tagData
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Tag $tag)
    {
        //

        $request->validate([
            "tagName" => ["required", "min:2"] 
        ]);

        $tag->tag_name = $request->tagName;
        $tag->save();

        return redirect(route("tags.index"))->with("message", "Tag Updated Successfully");

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Tag $tag)
    {
        
        //
        $tag->delete();

        return redirect(route("tags.index"))->with("message", "Tag Deleted Successfully");
    }
}
