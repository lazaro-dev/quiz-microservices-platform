<?php

namespace App\Exceptions;

use Exception;
use Illuminate\Contracts\Debug\ShouldntReport;

abstract class BusinessException extends Exception implements ShouldntReport {}
