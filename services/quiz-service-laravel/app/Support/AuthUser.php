<?php

namespace App\Support;

use App\Enums\Role;

class AuthUser
{
    public static function id()
    {
        return request()->attributes->get('user_id');
    }

    public static function username()
    {
        return request()->attributes->get('username');
    }

    public static function role()
    {
        return request()->attributes->get('role');
    }

    public static function isAdmin()
    {
        return self::role() === Role::ADMIN->value;
    }
}
