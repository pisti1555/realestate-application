<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Property>
 */
class PropertyFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => $this->faker->numberBetween(1,3),
            'image' => 'https://picsum.photos/1920/1080',
            'title' => $this->faker->sentence,
            'price' => $this->faker->randomFloat(2,100,999999),
            'description' => $this->faker->sentence,
            'city' => $this->faker->city,
            'postal_code'=> $this->faker->postcode,
            'address' => $this->faker->streetAddress,
        ];
    }
}
