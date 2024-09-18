<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Property;
use Database\Factories\AgentFactory;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::factory()->count(5)->state([
            'role' => 'agent', 
            'phone' => '+36201234567', 
            'description' => '', 
            'tax_number' => '123456789',
            'country' => 'Hungary', 
            'city' => 'Nyíregyháza', 
            'postal_code' => '4400'
        ])->create();
        User::factory()->count(100)->create();
        Property::factory()->count(20)->create();
    }
}
