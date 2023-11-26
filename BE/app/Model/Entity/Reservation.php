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
     * @var ParkingSpot
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
     * @return ParkingSpot
     */
    public function getSpot(): ParkingSpot
    {
        return $this->spot;
    }

    /**
     * @param ParkingSpot $spot
     */
    public function setSpot(ParkingSpot $spot): void
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

}
