<?php

namespace App\Http\Middleware;

use App\Models\User;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class RoleMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {

        
        //-- This middle will check if user role is administrator 
        //-- then allow next request otherwise home page
        $currentUserId = $request->user()->id;
        $user = User::findOrFail($currentUserId);

        // $user->role is property to access relation
        // $user->role->role is the value in role column
        $role = $user->role->role; 
        
        if ($role === "administrator") {
            return $next($request);
        } else {
            return redirect("/");
        }

        // return $next($request);
    }
}
