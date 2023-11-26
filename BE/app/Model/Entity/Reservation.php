<?php
/**
 * This file is part of the parkingApp project.
 * Copyright (c) 2023 Slavomír Švigar <slavo.svigar@gmail.com>
 */

namespace App\Model\Entity;

use DateTime;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass="App\Model\Services\ReservationRepository")
 * @ORM\Table(name="`reservation`")
 * @ORM\HasLifecycleCallbacks
 */
class Reservation
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
     * @ORM\ManyToOne(targetEntity="Employee")
     * @ORM\JoinColumn(onDelete="CASCADE")
     * @var Employee
     */
    private $employee;

    /**
     * @ORM\ManyToOne(targetEntity="ParkingSpot")
     * @ORM\JoinColumn(onDelete="CASCADE")
     * @var ParkingSpot|null
     */
    private $spot;

    /**
     * @ORM\ManyToOne(targetEntity="EmployeeCar")
     * @ORM\JoinColumn(onDelete="CASCADE")
     * @var EmployeeCar
     */
    private $employeeCar;

    /**
     *
     * @ORM\Column(type="datetime", nullable = true)
     * @var DateTime
     */
    private $dateFrom;

    /**
     *
     * @ORM\Column(type="datetime", nullable = true)
     * @var DateTime
     */
    private $dateTo;

    /**
     *
     * @ORM\Column(type="boolean")
     * @var boolean
     */
    private $waiting;

    /**
     *
     * @ORM\Column(type="datetime", nullable = true)
     * @var DateTime
     */
    private $createdAt;

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
     * @return Employee
     */
    public function getEmployee(): Employee
    {
        return $this->employee;
    }

    /**
     * @param Employee $employee
     */
    public function setEmployee(Employee $employee): void
    {
        $this->employee = $employee;
    }

    /**
     * @return ParkingSpot|null
     */
    public function getSpot(): ParkingSpot|null
    {
        return $this->spot;
    }

    /**
     * @param ParkingSpot|null $spot
     */
    public function setSpot(ParkingSpot|null $spot): void
    {
        $this->spot = $spot;
    }

    /**
     * @return EmployeeCar
     */
    public function getEmployeeCar(): EmployeeCar
    {
        return $this->employeeCar;
    }

    /**
     * @param EmployeeCar $employeeCar
     */
    public function setEmployeeCar(EmployeeCar $employeeCar): void
    {
        $this->employeeCar = $employeeCar;
    }

    /**
     * @return DateTime
     */
    public function getDateFrom(): DateTime
    {
        return $this->dateFrom;
    }

    /**
     * @param DateTime $dateFrom
     */
    public function setDateFrom(DateTime $dateFrom): void
    {
        $this->dateFrom = $dateFrom;
    }

    /**
     * @return DateTime
     */
    public function getDateTo(): DateTime
    {
        return $this->dateTo;
    }

    /**
     * @param DateTime $dateTo
     */
    public function setDateTo(DateTime $dateTo): void
    {
        $this->dateTo = $dateTo;
    }

    /**
     * @return bool
     */
    public function isWaiting(): bool
    {
        return $this->waiting;
    }

    /**
     * @param bool $waiting
     */
    public function setWaiting(bool $waiting): void
    {
        $this->waiting = $waiting;
    }

    /**
     * @return DateTime
     */
    public function getCreatedAt(): DateTime
    {
        return $this->createdAt;
    }

    /**
     * @param DateTime $createdAt
     */
    public function setCreatedAt(DateTime $createdAt): void
    {
        $this->createdAt = $createdAt;
    }

}
