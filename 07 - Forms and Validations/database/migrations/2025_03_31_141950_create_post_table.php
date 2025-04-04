<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('posts', function (Blueprint $table) {
            $table->id();

            // ? ----------- Section 8 Laravel Migrations
            // $table->string("title");
            // $table->text("content");
            // $table->string("image")->unique(true);
            
            // ? ----------- /Section 8 Laravel Migrations
            
            
            // ? ----------- Section 11 Eloquent Relationships
            $table->string("title");
            $table->text("content");
            $table->integer("user_id")->unsigned();    
            //-- will work as foreign key - Laravel by default consider 
            //-- user_id as foreign key
            //-- and id as local key and create relationship among them. 

            // ? ----------- /Section 11 Eloquent Relationships

            
            $table->timestamps();
        });

        
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('posts');
    }
};
