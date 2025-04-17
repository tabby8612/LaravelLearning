<?php

namespace App\Providers;

use App\Models\Category;
use App\Models\Tag;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\ServiceProvider;
use Inertia\Inertia;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
        Inertia::share([
            "categories" => function() {
                return Cache::rememberForever("categories", function() {
                    return Category::all()->take(5);
                });
            },
            "tags" => function() {
                return Cache::rememberForever("tags", function() {
                    return Tag::all()->take(5);
                });
            }
        ]);
    }
}
