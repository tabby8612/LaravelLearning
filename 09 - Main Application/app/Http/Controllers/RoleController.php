<?php

namespace App\Http\Controllers;

use App\Models\Role;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class RoleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $roles = Role::all();

        $rolesObj = [];

        foreach($roles as $role) {
            $rolesObj[] = [
                "id" => $role->id,
                "role" => $role->name,
                "created_at" => $role->created_at->toFormattedDateString(),
                "updated_at" => $role->updated_at->toFormattedDateString(),
            ];
        }

        $curUserRoles = auth()->user()->roles;

        $assignedRoles = [];

        foreach($curUserRoles as $currole) {
            $assignedRoles[] = $currole->id;
        }

        

        return Inertia::render("admin/roles/index", [
            "roles" => $rolesObj, 
            "assignedRoles" => $assignedRoles
        ]);




    }

    /**
     * Attach Role
     */

    public function attach($roleId) {
        $userId = auth()->user()->id;

        $user = User::all()->where("id", $userId)->first();
        $user->roles()->attach($roleId);

        return redirect(route("roles.index"));        
    }

    public function detach($roleId) {
        $userId = auth()->user()->id;

        $user = User::all()->where("id", $userId)->first();
        $user->roles()->detach($roleId);

        return redirect(route("roles.index"));        
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
    public function show(Role $role)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Role $role)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Role $role)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Role $role)
    {
        //
    }
}
