<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Task;
use App\Models\User;

class TaskSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $users = User::all();

        if ($users->isEmpty()) {
            $this->command->warn('Nenhum usuário encontrado. Executando UserSeeder primeiro...');
            $this->call(UserSeeder::class);
            $users = User::all();
        }

        $users->each(function ($user) {
            Task::factory(5)->create([
                'user_id' => $user->id,
            ]);
        });

        $firstUser = $users->first();
        
        Task::create([
            'number' => 1001,
            'user_id' => $firstUser->id,
            'title' => 'Implementar autenticação',
            'describe' => 'Configurar sistema de login e registro de usuários',
            'status' => 'in_progress',
            'priority' => 'high',
        ]);

        Task::create([
            'number' => 1002,
            'user_id' => $firstUser->id,
            'title' => 'Revisar código',
            'describe' => 'Fazer code review do pull request #45',
            'status' => 'pending',
            'priority' => 'medium',
        ]);
    }
}
