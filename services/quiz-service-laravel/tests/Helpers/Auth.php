<?php

function authHeaders(
    int $userId = 1,
    string $username = 'test-user',
    string $role = 'common'
): array {

    return [
        'X-User-Id' => $userId,
        'X-Username' => $username,
        'X-Role' => $role,
    ];
}
