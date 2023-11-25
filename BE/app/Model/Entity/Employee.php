<?php
/**
 * This file is part of the parkingApp project.
 * Copyright (c) 2023 Slavomír Švigar <slavo.svigar@gmail.com>
 */

namespace App\Model\Entity;

use DateTime;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass="App\Model\Services\EmployeeRepository")
 * @ORM\Table(name="`employee`")
 * @ORM\HasLifecycleCallbacks
 */
class Employee
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
     * @ORM\Column(type="string", nullable = false)
     * @var string
     */
    private $name;

    /**
     *
     * @ORM\Column(type="string", nullable = false)
     * @var string
     */
    private $surname;

    /**
     *
     * @ORM\Column(type="string", nullable = false)
     * @var string
     */
    private $mobileNumber;


    /**
     *
     * @ORM\Column(type="string", nullable = false)
     * @var string
     */
    private $email;

    /**
     *
     * @ORM\Column(type="string", nullable = true)
     * @var string
     */
    private $password;

    /**
     *
     * @ORM\Column(type="integer")
     * @var int
     */
    private $companyId;

    /**
     *
     * @ORM\Column(type="string", nullable = false)
     * @var string
     */
    private $plateNumber;

    /**
     *
     * @ORM\Column(type="datetime", nullable = true)
     * @var DateTime
     */
    private $lastLoginAt;

    /**
     *
     * @ORM\Column(type="boolean")
     * @var boolean
     */
    private $enabled;


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
     * @return string
     */
    public function getName(): string
    {
        return $this->name;
    }

    /**
     * @param string $name
     */
    public function setName(string $name): void
    {
        $this->name = $name;
    }

    /**
     * @return string
     */
    public function getSurname(): string
    {
        return $this->surname;
    }

    /**
     * @param string $surname
     */
    public function setSurname(string $surname): void
    {
        $this->surname = $surname;
    }

    /**
     * @return string
     */
    public function getMobileNumber(): string
    {
        return $this->mobileNumber;
    }

    /**
     * @param string $mobileNumber
     */
    public function setMobileNumber(string $mobileNumber): void
    {
        $this->mobileNumber = $mobileNumber;
    }

    /**
     * @return string
     */
    public function getEmail(): string
    {
        return $this->email;
    }

    /**
     * @param string $email
     */
    public function setEmail(string $email): void
    {
        $this->email = $email;
    }

    /**
     * @return string
     */
    public function getPassword(): string
    {
        return $this->password;
    }

    /**
     * @param string $password
     */
    public function setPassword(string $password): void
    {
        $this->password = $password;
    }

    /**
     * @return int
     */
    public function getCompanyId(): int
    {
        return $this->companyId;
    }

    /**
     * @param int $companyId
     */
    public function setCompanyId(int $companyId): void
    {
        $this->companyId = $companyId;
    }

    /**
     * @return string
     */
    public function getPlateNumber(): string
    {
        return $this->plateNumber;
    }

    /**
     * @param string $plateNumber
     */
    public function setPlateNumber(string $plateNumber): void
    {
        $this->plateNumber = $plateNumber;
    }

    /**
     * @return DateTime
     */
    public function getLastLoginAt(): DateTime
    {
        return $this->lastLoginAt;
    }

    /**
     * @param DateTime $lastLoginAt
     */
    public function setLastLoginAt(DateTime $lastLoginAt): void
    {
        $this->lastLoginAt = $lastLoginAt;
    }

    /**
     * @return bool
     */
    public function isEnabled(): bool
    {
        return $this->enabled;
    }

    /**
     * @param bool $enabled
     */
    public function setEnabled(bool $enabled): void
    {
        $this->enabled = $enabled;
    }
}
