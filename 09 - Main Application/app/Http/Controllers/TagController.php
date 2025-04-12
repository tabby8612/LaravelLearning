<?php

namespace App\Http\Controllers;

use App\Models\Tag;
use Illuminate\Http\Request;
use Inertia\Inertia;

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

        

        $curUser = auth()->user()->name;        

        return Inertia::render("admin/tags/tags", [
            "tagsData" => $tagsData,
            "curUser" => $curUser
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
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Tag $tag)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Tag $tag)
    {
        //
    }
}
