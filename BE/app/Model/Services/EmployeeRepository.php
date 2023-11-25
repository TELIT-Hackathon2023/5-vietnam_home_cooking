<?php declare(strict_types = 1);

/**
 * This file is part of the 2050 project.
 * Copyright (c) 2023 Slavomír Švigar <slavo.svigar@gmail.com>
 */

namespace App\Model\Services;

use App\Model\Entity\Employee;
use DateTime;
use Doctrine\ORM\EntityRepository;
use Doctrine\ORM\EntityManager;
use Doctrine\ORM\Exception\ORMException;
use Doctrine\ORM\Mapping\ClassMetadata;
use Doctrine\ORM\OptimisticLockException;
use Doctrine\ORM\TransactionRequiredException;

class EmployeeRepository extends EntityRepository {

	/**
	 * @var EntityManager
	 */
    private $em;

	/**
	 * EmployeeRepository constructor.
	 * @param EntityManager $entityManager
	 */
    public function __construct(EntityManager $entityManager) {
    	parent::__construct($entityManager, new ClassMetadata(Employee::class));

        $this->em = $entityManager;
    }

	/**
	 * @param int $id
	 * @return Employee|null
     * @throws \Doctrine\ORM\ORMException
	 * @throws \Doctrine\ORM\OptimisticLockException
	 * @throws \Doctrine\ORM\TransactionRequiredException
	 */
    public function getById(int $id) : ?Employee {
    	$aq = $this->em->find(Employee::class, $id);

    	if($aq instanceof Employee) {
    		return $aq;
		}
		return null;
	}

    /**
     * @param array $criteria
     * @param array $orderBy
     * @return Employee
     */
    public function findEmployeeBy(array $criteria = array(), array $orderBy = array()): Employee
    {
        return $this->findOneBy($criteria, $orderBy);
    }

    /**
     * @param array $criteria
     * @return int
     */
    public function countOfEmployees(array $criteria = array()): int
    {
        return $this->count($criteria);
    }


    /**
     * @param string $name
     * @param string $surname
     * @param string $mobileNUmber
     * @param string $email
     * @param int $companyId
     * @param string $plateNumber
     * @param string $password
     * @return Employee
     * @throws ORMException
     * @throws OptimisticLockException
     */
    public function create(string $name, string $surname, string $mobileNUmber, string $email, int $companyId, string $plateNumber, string $password): Employee
    {
        $employee = new Employee;
        $employee->setName($name);
        $employee->setSurname($surname);
        $employee->setMobileNumber($mobileNUmber);
        $employee->setEmail($email);
        $employee->setCompanyId($companyId);
        $employee->setPlateNumber($plateNumber);
        $employee->setEnabled(true);
        $employee->setPassword($password);

        $this->em->persist($employee);
        $this->em->flush();

        return $employee;
    }

    /**
     * @param Employee $employee
     * @throws OptimisticLockException
     * @throws \Doctrine\ORM\ORMException
     * @throws TransactionRequiredException
     */
    public function setLastLogin(Employee $employee)
    {
        $employee = $this->getById($employee->getId());
        $employee->setLastLoginAt(new DateTime());

        $this->em->persist($employee);
        $this->em->flush();
    }


}