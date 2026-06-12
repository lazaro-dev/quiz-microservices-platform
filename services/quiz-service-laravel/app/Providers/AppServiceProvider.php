<?php

namespace App\Providers;

use App\Contracts\EventPublisher;
use App\Infrastructure\RabbitMQ\RabbitMQClient;
use App\Infrastructure\RabbitMQ\RabbitMQPublisher;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\App;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->singleton(RabbitMQClient::class);

        $this->app->singleton(RabbitMQPublisher::class);

        $this->app->bind(
            EventPublisher::class,
            RabbitMQPublisher::class
        );
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Model::preventLazyLoading(! App::isProduction());
        Model::preventSilentlyDiscardingAttributes(! App::isProduction());
    }
}
