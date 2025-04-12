<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        echo("hi");
        $categories = Category::all();

        $categoriesData = [];

        foreach($categories as $category) {
            

            $categoriesData[] = [
                "id" => $category->id,
                "name" => $category->category_name,
                "created_at" => $category->created_at->isoFormat("DD-MM-YYYY"),
                "updated_at" => $category->updated_at->isoFormat("DD-MM-YYYY"),
            ];
        }

        $curUser = auth()->user()->name;

        
        
        //-- similar to ["categoriesData" => $categoriesData, "curUser" => $curUser ]
        return Inertia::render("admin/category/categories", compact("categoriesData", "curUser"));
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
    public function show(Category $category)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Category $category)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Category $category)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Category $category)
    {
        //
    }
}
