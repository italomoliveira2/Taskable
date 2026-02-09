<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = [
            [
                'name' => 'Trabalho',
                'describe' => 'Tarefas relacionadas ao trabalho e projetos profissionais',
            ],
            [
                'name' => 'Pessoal',
                'describe' => 'Tarefas pessoais e compromissos do dia a dia',
            ],
            [
                'name' => 'Estudos',
                'describe' => 'Atividades de aprendizado e desenvolvimento',
            ],
            [
                'name' => 'Saúde',
                'describe' => 'Exercícios, consultas médicas e bem-estar',
            ],
            [
                'name' => 'Compras',
                'describe' => 'Lista de compras e aquisições necessárias',
            ],
        ];

        foreach ($categories as $category) {
            \App\Models\Category::create($category);
        }

        // Criar categorias adicionais aleatórias
        \App\Models\Category::factory(5)->create();
    }
}
