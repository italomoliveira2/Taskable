<?php

namespace App\Http\Controllers;

use App\Models\Task;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TaskController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $user = User::query()->where('id', '=', 1)->first();

        $search     = $request->query('q');
        $priority   = $request->query('priority');
        $status     = $request->query('status');
        $startDate  = $request->query('startDate');
        $endDate    = $request->query('endDate');

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

        return Inertia::render('Index', [
            'user' => $user,
            'tasks' => $tasks
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request) {}

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
