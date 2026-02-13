<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Support\Facades\DB;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class TaskController extends Controller
{
    public function index(Request $request)
    {
        $user = User::query()->where('id', '=', 1)->first();

        $search     = $request->query('q');
        $startDate  = $request->query('startDate');
        $endDate    = $request->query('endDate');
        $priority = $request->query('priority') === '-'
            ? null
            : $request->query('priority');

        $status = $request->query('status') === '-'
            ? null
            : $request->query('status');

        $tasks = Task::query()
            ->when($search, function ($q) use ($search) {
                $q->where(function ($q) use ($search) {
                    $q->where('title', 'like', '%' . $search . '%')
                        ->orWhere('number', 'like', '%' . $search . '%');
                });
            })
            ->when($priority, function ($q) use ($priority) {
                $q->where('priority', $priority);
            })
            ->when($status, function ($q) use ($status) {
                $q->where('status', $status);
            })
            ->when($startDate, function ($q) use ($startDate) {
                $q->whereDate('created_at', '>=', $startDate);
            })
            ->when($endDate, function ($q) use ($endDate) {
                $q->whereDate('created_at', '<=', $endDate);
            })
            ->paginate(15);

        return Inertia::render('home/index', [
            'user' => $user,
            'tasks' => $tasks
        ]);
    }

    public function show(Request $request, int $number)
    {
        dd('visualizar task');
    }

    public function store(Request $request)
    {
        $data = $request->only(['title', 'describe', 'priority']);

        $user = Auth::user();
        
        try
        {
            /** @var \App\Models\User $user */
            DB::transaction(function() use ($data, $user){
                $user->tasks()->create($data);
            });

            
        }
        catch(\Throwable $e)
        {
             dd($e->getMessage());
        }
    }

    public function update(Request $request, string $id)
    {
        dd('atualização task');
    }

    public function destroy(string $id)
    {
        dd('destuir task');
    }
}
