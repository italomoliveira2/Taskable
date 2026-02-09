<?php

/**
 * ============================================================================
 * LARAVEL PROJECT SETUP - ALL IN ONE FILE
 * ============================================================================
 * 
 * Este arquivo contém todas as migrations, models, factories e seeders
 * para o sistema de gerenciamento de tarefas.
 * 
 * ESTRUTURA:
 * 1. Migrations
 * 2. Models
 * 3. Factories
 * 4. Seeders
 * ============================================================================
 */

// ============================================================================
// 1. MIGRATIONS
// ============================================================================

/**
 * Migration: Create Users Table
 * Localização: database/migrations/2024_01_01_000001_create_users_table.php
 */
namespace Database\Migrations;

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUsersTable extends Migration
{
    public function up(): void
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('email')->unique();
            $table->string('phone')->nullable();
            $table->enum('status', ['activated', 'deactivated'])->default('activated');
            $table->string('password');
            $table->string('profile_photo')->nullable();
            $table->json('config')->nullable();
            $table->timestamp('email_verified_at')->nullable();
            $table->rememberToken();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('users');
    }
}

/**
 * Migration: Create Categories Table
 * Localização: database/migrations/2024_01_01_000002_create_categories_table.php
 */
class CreateCategoriesTable extends Migration
{
    public function up(): void
    {
        Schema::create('categories', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->text('describe')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('categories');
    }
}

/**
 * Migration: Create Tasks Table
 * Localização: database/migrations/2024_01_01_000003_create_tasks_table.php
 */
class CreateTasksTable extends Migration
{
    public function up(): void
    {
        Schema::create('tasks', function (Blueprint $table) {
            $table->id();
            $table->integer('number')->unique();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('title');
            $table->text('describe')->nullable();
            $table->enum('status', ['pending', 'in_progress', 'completed', 'cancelled'])->default('pending');
            $table->enum('priority', ['low', 'medium', 'high', 'urgent'])->default('medium');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('tasks');
    }
}

// ============================================================================
// 2. MODELS
// ============================================================================

/**
 * Model: User
 * Localização: app/Models/User.php
 */
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    use HasFactory, Notifiable;

    protected $fillable = [
        'name',
        'email',
        'phone',
        'status',
        'password',
        'profile_photo',
        'config',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'config' => 'array',
        ];
    }

    // Relationships
    public function tasks()
    {
        return $this->hasMany(Task::class);
    }

    // Scopes
    public function scopeActivated($query)
    {
        return $query->where('status', 'activated');
    }

    public function scopeDeactivated($query)
    {
        return $query->where('status', 'deactivated');
    }
}

/**
 * Model: Category
 * Localização: app/Models/Category.php
 */
class Category extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'describe',
    ];

    // Relacionamento futuro (se necessário)
    // public function tasks()
    // {
    //     return $this->hasMany(Task::class);
    // }
}

/**
 * Model: Task
 * Localização: app/Models/Task.php
 */
class Task extends Model
{
    use HasFactory;

    protected $fillable = [
        'number',
        'user_id',
        'title',
        'describe',
        'status',
        'priority',
    ];

    // Relationships
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // Scopes
    public function scopePending($query)
    {
        return $query->where('status', 'pending');
    }

    public function scopeInProgress($query)
    {
        return $query->where('status', 'in_progress');
    }

    public function scopeCompleted($query)
    {
        return $query->where('status', 'completed');
    }

    public function scopeHighPriority($query)
    {
        return $query->whereIn('priority', ['high', 'urgent']);
    }
}

// ============================================================================
// 3. FACTORIES
// ============================================================================

/**
 * Factory: UserFactory
 * Localização: database/factories/UserFactory.php
 */
namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class UserFactory extends Factory
{
    protected static ?string $password;

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

    public function unverified(): static
    {
        return $this->state(fn (array $attributes) => [
            'email_verified_at' => null,
        ]);
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
}

/**
 * Factory: CategoryFactory
 * Localização: database/factories/CategoryFactory.php
 */
class CategoryFactory extends Factory
{
    public function definition(): array
    {
        return [
            'name' => fake()->words(2, true),
            'describe' => fake()->sentence(),
        ];
    }
}

/**
 * Factory: TaskFactory
 * Localização: database/factories/TaskFactory.php
 */
class TaskFactory extends Factory
{
    public function definition(): array
    {
        return [
            'number' => fake()->unique()->numberBetween(1000, 9999),
            'user_id' => User::factory(),
            'title' => fake()->sentence(4),
            'describe' => fake()->paragraph(),
            'status' => fake()->randomElement(['pending', 'in_progress', 'completed', 'cancelled']),
            'priority' => fake()->randomElement(['low', 'medium', 'high', 'urgent']),
        ];
    }

    public function pending(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'pending',
        ]);
    }

    public function completed(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'completed',
        ]);
    }

    public function highPriority(): static
    {
        return $this->state(fn (array $attributes) => [
            'priority' => 'high',
        ]);
    }

    public function urgent(): static
    {
        return $this->state(fn (array $attributes) => [
            'priority' => 'urgent',
        ]);
    }
}

// ============================================================================
// 4. SEEDERS
// ============================================================================

/**
 * Seeder: UserSeeder
 * Localização: database/seeders/UserSeeder.php
 */
namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        // Criar usuário administrador
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

        // Criar usuários regulares
        User::factory(10)->create();
    }
}

/**
 * Seeder: CategorySeeder
 * Localização: database/seeders/CategorySeeder.php
 */
class CategorySeeder extends Seeder
{
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
            Category::create($category);
        }

        // Criar categorias adicionais aleatórias
        Category::factory(5)->create();
    }
}

/**
 * Seeder: TaskSeeder
 * Localização: database/seeders/TaskSeeder.php
 */
class TaskSeeder extends Seeder
{
    public function run(): void
    {
        $users = User::all();

        if ($users->isEmpty()) {
            $this->command->warn('Nenhum usuário encontrado. Executando UserSeeder primeiro...');
            $this->call(UserSeeder::class);
            $users = User::all();
        }

        // Criar tarefas para cada usuário
        $users->each(function ($user) {
            Task::factory(5)->create([
                'user_id' => $user->id,
            ]);
        });

        // Criar algumas tarefas específicas
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

/**
 * Seeder: DatabaseSeeder
 * Localização: database/seeders/DatabaseSeeder.php
 */
class DatabaseSeeder extends Seeder
{
    /**
     * Seed da base de dados da aplicação.
     */
    public function run(): void
    {
        $this->call([
            UserSeeder::class,
            CategorySeeder::class,
            TaskSeeder::class,
        ]);
    }
}

/**
 * ============================================================================
 * INSTRUÇÕES DE USO
 * ============================================================================
 * 
 * 1. SEPARAR OS ARQUIVOS:
 *    - Copie cada classe para o arquivo correspondente indicado nos comentários
 *    - Mantenha a estrutura de pastas do Laravel
 * 
 * 2. EXECUTAR AS MIGRATIONS:
 *    php artisan migrate
 * 
 * 3. EXECUTAR OS SEEDERS:
 *    php artisan db:seed
 * 
 * 4. CREDENCIAIS DO ADMIN:
 *    Email: admin@example.com
 *    Senha: password
 * 
 * 5. ESTRUTURA DE PASTAS:
 *    ├── app/Models/
 *    │   ├── User.php
 *    │   ├── Category.php
 *    │   └── Task.php
 *    ├── database/
 *    │   ├── factories/
 *    │   │   ├── UserFactory.php
 *    │   │   ├── CategoryFactory.php
 *    │   │   └── TaskFactory.php
 *    │   ├── migrations/
 *    │   │   ├── 2024_01_01_000001_create_users_table.php
 *    │   │   ├── 2024_01_01_000002_create_categories_table.php
 *    │   │   └── 2024_01_01_000003_create_tasks_table.php
 *    │   └── seeders/
 *    │       ├── DatabaseSeeder.php
 *    │       ├── UserSeeder.php
 *    │       ├── CategorySeeder.php
 *    │       └── TaskSeeder.php
 * 
 * ============================================================================
 */