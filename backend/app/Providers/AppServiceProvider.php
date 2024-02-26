<?php

namespace App\Providers;

use Carbon\Carbon;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        // Password::defaults(function () {
        //     return Password::min(10)
        //         ->letters()
        //         ->numbers()
        //         ->symbols()
        //         ->mixedCase()
        //         ->uncompromised();
        // });

        JsonResource::withoutWrapping();

        Carbon::setLocale(app()->getLocale());
    }
}
