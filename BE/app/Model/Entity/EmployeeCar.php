<?php
/**
 * This file is part of the parkingApp project.
 * Copyright (c) 2023 Slavomír Švigar <slavo.svigar@gmail.com>
 */

namespace App\Model\Entity;

use DateTime;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass="App\Model\Services\EmployeeCarRepository")
 * @ORM\Table(name="`employeeCar`")
 * @ORM\HasLifecycleCallbacks
 */
class EmployeeCar
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
     *
     * @ORM\Column(type="string", nullable = false)
     * @var string
     */
    private $carPlateNumber;

    /**
     *
     * @ORM\Column(type="string", nullable = true)
     * @var string|null
     */
    private $carBrand;

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
     * @return string
     */
    public function getCarPlateNumber(): string
    {
        return $this->carPlateNumber;
    }

    /**
     * @param string $carPlateNumber
     */
    public function setCarPlateNumber(string $carPlateNumber): void
    {
        $this->carPlateNumber = $carPlateNumber;
    }

    /**
     * @return string|null
     */
    public function getCarBrand(): ?string
    {
        return $this->carBrand;
    }

    /**
     * @param string|null $carBrand
     */
    public function setCarBrand(?string $carBrand): void
    {
        $this->carBrand = $carBrand;
    }

}
