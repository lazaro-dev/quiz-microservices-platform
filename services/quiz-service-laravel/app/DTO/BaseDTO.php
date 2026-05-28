<?php

namespace App\DTO;

interface BaseDTO
{
    /**
     * makeFromRequest
     *
     * @param array $data
     * @return self
     */
    public static function fromArray(array $data): self;
}
