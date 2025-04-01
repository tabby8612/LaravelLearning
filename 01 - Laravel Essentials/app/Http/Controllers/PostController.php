<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return "<h1>This is index of post</h1>";
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
        return "<h1>This is create method of post</h1>";
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
    public function show(string $id)
    {
        return "<h1>This is show method of $id</h1>";
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
