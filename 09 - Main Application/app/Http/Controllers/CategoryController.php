<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Session;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //               

        $categories = Category::all();

        $categoriesData = [];

        foreach($categories as $category) { 
            

            $categoriesData[] = [
                "id" => $category->id,
                "name" => $category->category_name,
                "created_at" => $category->created_at->isoFormat("DD-MM-YYYY"),
                "updated_at" => $category->updated_at->isoFormat("DD-MM-YYYY"),
                "postsCount" => $category->posts()->count()
            ];
        }

        //-- reading message from session passed as feedback
        $message = Session::get("message");
        
        
        //-- similar to ["categoriesData" => $categoriesData, "curUser" => $curUser ]
        return Inertia::render("admin/category/categories", 
        compact("categoriesData", "message"));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //

        return Inertia::render("admin/category/CreateCategory");
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //        

        $request->validate([
            "category" => ["required", "min:2"]
        ]);

        Category::create(["category_name" => $request->category]);

        return redirect(route("categories.index"))->with("message", "Category Added Successfully");
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

        $categoryData = [
            "id" => $category->id,
            "name" => $category->category_name,
        ];

        return Inertia::render("admin/category/EditCategory", [
            "categoryData" => $categoryData
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Category $category)
    {
        //
        
        $request->validate([
            "categoryName" => ["required", "min:2"]
        ]);

        $category->category_name = $request->categoryName;
        $category->save();

        return redirect(route("categories.index"))->with("message", "Category Updated Successfully");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Category $category)
    {
        //
        $category->delete();

        

        return;



        // return redirect(route("categories.index"))->with("message", "Category Deleted");
    }
}
