<?php

namespace Database\Factories;

use App\Models\Employer;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Job>
 */
class JobFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            //
            "employer_id" => Employer::factory(),
            "title" => fake()->jobTitle,
            "salary" => fake()->randomElement(["$20,000 usd", "$30,000 usd", "$40,000 usd"]),
            "location" => fake()->randomElement(["remote", "onsite"]),
            "schedule" => fake()->randomElement(["full time", "part time"]),
            "url" => fake()->url,
            "featured" => fake()->randomElement([true, false])
        ];
    }
}
