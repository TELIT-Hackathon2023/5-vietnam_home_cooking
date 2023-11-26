<?php
/**
 * This file is part of the parkingApp project.
 * Copyright (c) 2023 Slavomír Švigar <slavo.svigar@gmail.com>
 */

namespace App\Model\Entity;

use DateTime;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass="App\Model\Services\ParkingSpotRepository")
 * @ORM\Table(name="`parkingSpot`")
 * @ORM\HasLifecycleCallbacks
 */
class ParkingSpot
{

    /**
     *
     * @ORM\Id()
     * @ORM\Column(type="integer")
     * @ORM\GeneratedValue(strategy="IDENTITY")
     * @var int
     */
    private $id;

    /**
     *
     * @ORM\Column(type="integer", nullable = false)
     * @var integer
     */
    private $number;

    /**
     *
     * @ORM\Column(type="boolean")
     * @var boolean
     */
    private $free;


    /**
     * @return int
     */
    public function getId(): int
    {
        return $this->id;
    }

    /**
     * @param int $id
     */
    public function setId(int $id): void
    {
        $this->id = $id;
    }

    /**
     * @return int
     */
    public function getNumber(): int
    {
        return $this->number;
    }

    /**
     * @param int $number
     */
    public function setNumber(int $number): void
    {
        $this->number = $number;
    }

    /**
     * @return bool
     */
    public function isFree(): bool
    {
        return $this->free;
    }

    /**
     * @param bool $free
     */
    public function setFree(bool $free): void
    {
        $this->free = $free;
    }
}
