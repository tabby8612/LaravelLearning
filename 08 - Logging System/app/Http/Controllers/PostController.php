<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        //-- two way to put data into sessions
        $request->session()->put("name", "Tabish Sajwani");
        session(["isLoggedIn" => true]);

        //-- Two way to get data from session
        echo "<br/> web.php 👉 request: ", $request->session()->get("name"), "<br/>";
        echo "<br/> web.php 👉 request: ", session("isLoggedIn"), "<br/>";

        echo "<br/> PostController.php 👉👉👉 21 👉👉👉 request: <pre>" ;
        var_dump($request->session()->all());
        echo "</pre>" ;

        //-- gives only username and email
        $data = $request->session()->only(['username', 'email']);
        
        //-- gives all values except username and email
        $data = $request->session()->except(['username', 'email']);

        //-- check if session has users key
        $isUser = $request->session()->has('users');

        //-- returns the value of key and removes it.
        $value = $request->session()->pull('key', 'default');

        //-- Data will remain only till single http refresh
        $request->session()->flash('status', 'Task was successful!');

        //-- If you want data to remain for few http refreshes
        $request->session()->reflash();

        //-- if you want to flash data but keep specific keys data
        $request->session()->keep(['username', 'email']);
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
    public function show(string $id)
    {
        //
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
