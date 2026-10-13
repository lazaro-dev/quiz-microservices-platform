<?php

namespace App\Traits;

use Error;

/** @mixin \BackedEnum */
trait HasEnum
{
    /**
     * Call method static getLabel with current instance.
     *
     * @return string
     */
    public function label(): string
    {
        return static::getLabel($this);
    }

    /**
     * Returns label based on current enum instance.
     *
     * @return string
     */
    public static function getLabel(self $value): string
    {
        if(!defined("self::LABELS") || !is_array(self::LABELS) || !count(self::LABELS))
            throw new Error("const 'LABELS' not defined in Enumeration: ".get_class($value));

        return self::LABELS[$value->name];
    }

    /**
     * Returns labels based in fields the class enum.
     *
     * @return array
     */
    public static function getLabels(): array
    {
        $arrayLabels = collect([]);

        collect(self::cases())
            ->map(fn ($serviceStatus) => $arrayLabels->push($serviceStatus->label()));

        return $arrayLabels->toArray();
    }

    /**
     * Returns labels based in fields the class enum.
     *
     * @param string $separator
     * @return string
     */
    public static function getLabelsInString($separator = ' e '): string
    {
        return collect(self::getLabels())->join(', ', $separator);
    }

    /**
     * Returns values based in fields the class enum.
     *
     * @return array
     */
    public static function getValues(): array
    {
        $arrayValues = collect([]);

        collect(self::cases())
            ->map(fn ($serviceValues) => $arrayValues->push($serviceValues->value));

        return $arrayValues->toArray();
    }

    /**
     * Returns names the fields the class enum.
     *
     * @return array
     */
    public static function getNameFields(): array
    {
        $arrayNames = collect([]);

        collect(self::cases())
            ->map(fn ($serviceNames) => $arrayNames->push($serviceNames->name));

        return $arrayNames->toArray();
    }
}
