<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\User>
 */
class UserFactory extends Factory
{
    /**
     * The current password being used by the factory.
     */
    protected static ?string $password;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->name(),
            'email' => fake()->unique()->safeEmail(),
            'phone' => fake()->phoneNumber(),
            'status' => fake()->randomElement(['activated', 'deactivated']),
            'email_verified_at' => now(),
            'password' => static::$password ??= Hash::make('password'),
            'profile_photo' => fake()->imageUrl(200, 200, 'people'),
            'config' => [
                'theme' => fake()->randomElement(['light', 'dark']),
                'language' => fake()->randomElement(['pt-BR', 'en-US', 'es-ES']),
                'notifications' => fake()->boolean(),
                'timezone' => fake()->timezone(),
            ],
            'remember_token' => Str::random(10),
        ];
    }

    public function activated(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'activated',
        ]);
    }

    public function deactivated(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'deactivated',
        ]);
    }

    /**
     * Indicate that the model's email address should be unverified.
     */
    public function unverified(): static
    {
        return $this->state(fn (array $attributes) => [
            'email_verified_at' => null,
        ]);
    }
}
