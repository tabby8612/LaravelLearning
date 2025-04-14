<?php

namespace App\Policies;

use App\Models\Post;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class PostPolicy
{   
     
    //-- Before method in policy will be run before any other method.
    public function isAdmin(User $user) {

        //-- Currently isAdministrator() method is not defined in our User
        //-- model so 'before' function will not be called.        

        if ($user->isAdministrator()) {
            return true;
        }

        return null;
    }
    

    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        dd("in viewAny");
        return false;
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, Post $post): Response
    {
        
        return $user->id === $post->user_id ? Response::allow() : Response::deny("You are not authorized to review this post", 403);
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        return $user->role == "writer";
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, Post $post)
    {   
        return $user->id === $post->user_id ? Response::allow() : Response::deny("You are not authorized to update this post", 403);
        
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, Post $post):Response
    {
        //-- We can send a different response status than 403 to hide the resource from scammer.
        return $user->id === $post->user_id ? Response::allow() : Response::denyWithStatus(404, "The Resource You Are Looking For Is Not Found");
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, Post $post): bool
    {
        
        return false;
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, Post $post): bool
    {
        return false;
    }
}
