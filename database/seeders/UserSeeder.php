<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::create([
            'name' => 'Admin User',
            'email' => 'admin@example.com',
            'phone' => '+55 (62) 99999-9999',
            'status' => 'activated',
            'password' => Hash::make('password'),
            'profile_photo' => null,
            'config' => [
                'theme' => 'dark',
                'language' => 'pt-BR',
                'notifications' => true,
                'timezone' => 'America/Sao_Paulo',
            ],
        ]);

        User::factory(10)->create();
    }
}
