<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Session;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $message = "";
        if (Session::has("message")) {
            $message = Session::get("message");            
            
        }

        $users = User::all();

        $usersData = [];

        foreach($users as $user) {
            $usersData[] = [
                "user_id" => $user->id,
                "name" => $user->name,
                "email" => $user->email,
                "created_at" => $user->created_at->isoFormat("DD-MM-YYYY"),
                "updated_at" => $user->updated_at->isoFormat("DD-MM-YYYY"),

            ];
        }

        $authUser = Auth::user()->name;

        

        return Inertia::render("admin/users/users", [
            "usersData" => $usersData,
            "activeUser" => $authUser,
            "message" => $message
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //

    
        return Inertia::render("admin/users/CreateUser");
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //

        $request->validate([
            "name" => ["required", "min:6"],
            "email" => ["required", "email:rfc,dns"],
            "password" => ["required", "min:6", "confirmed"]
        ]);

        

        User::create([
            "name" => $request->name,
            "email" => $request->email,
            "password" => $request->password,
        ]);

        return redirect(route("user.index"))->with("message", "User Created Successfully");


    }

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(User $user)
    {
        //
        

        $userData = [
            "id" => $user->id,
            "name" => $user->name,
            "email" => $user->email,
        ];

        return Inertia::render("admin/users/EditUser", [
            "userData" => $userData
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, User $user)
    {
        //       

        echo($request->name);        
        echo($request->email);        
        echo($request->password);

        $request->validate([
            "name" => ["required", "min:6"],
            "email" => ["required", "email:rfc,dns"],
            "password" => ["required", "min:6", "confirmed"]
        ]);

        $user = User::findOrFail($user->id);
        $user->name = $request->name;
        $user->email = $request->email;
        $user->password = $request->password;
        $user->save();

        

        return redirect(route("user.index"))->with("message", "User updated successfully");

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        //
        
        $user->delete();

        return redirect(route("user.index"))->with("message", "User Deleted successfully");
        

    }
}
