<?php declare(strict_types = 1);

/**
 * This file is part of the Telekom Parking App project.
 * Copyright (c) 2023 Slavomír Švigar <slavo.svigar@gmail.com>
 */

namespace App\Model\Services;

use App\Model\Entity\Employee;
use App\Model\Entity\EmployeeCar;
use Doctrine\ORM\EntityRepository;
use Doctrine\ORM\EntityManager;
use Doctrine\ORM\Exception\ORMException;
use Doctrine\ORM\Mapping\ClassMetadata;
use Doctrine\ORM\OptimisticLockException;

class EmployeeCarRepository extends EntityRepository {

	/**
	 * @var EntityManager
	 */
    private $em;

	/**
	 * EmployeeCarRepository constructor.
	 * @param EntityManager $entityManager
	 */
    public function __construct(EntityManager $entityManager) {
    	parent::__construct($entityManager, new ClassMetadata(EmployeeCar::class));

        $this->em = $entityManager;
    }

	/**
	 * @param int $id
	 * @return EmployeeCar|null
     * @throws \Doctrine\ORM\ORMException
	 * @throws \Doctrine\ORM\OptimisticLockException
	 * @throws \Doctrine\ORM\TransactionRequiredException
	 */
    public function getById(int $id) : ?EmployeeCar {
    	$aq = $this->em->find(EmployeeCar::class, $id);

    	if($aq instanceof EmployeeCar) {
    		return $aq;
		}
		return null;
	}

    /**
     * @param array $criteria
     * @param array|null $orderBy
     * @return EmployeeCar
     */
    public function findOneCarBy(array $criteria = array(), array|null $orderBy = array())
    {
        return $this->findOneBy($criteria, $orderBy);
    }

    /**
     * @param array $criteria
     * @param array|null $orderBy
     * @param null $limit
     * @param null $offset
     * @return array
     */
    public function findEmployeeCarsBy(array $criteria = array(), array|null $orderBy = array(), $limit = null, $offset = null): array
    {
        return $this->findBy($criteria, $orderBy, $limit, $offset);
    }

    /**
     * @param array $criteria
     * @return int
     */
    public function countCarsByPlate(array $criteria = array()): int
    {
        return $this->count($criteria);
    }


    /**
     * @param Employee $employee
     * @param string $carPlateNumber
     * @param string|null $carBrand
     * @return EmployeeCar
     * @throws ORMException
     * @throws OptimisticLockException
     */
    public function create(Employee $employee, string $carPlateNumber, string|null $carBrand): EmployeeCar
    {
        $employeeCar = new EmployeeCar;
        $employeeCar->setEmployee($employee);
        $employeeCar->setCarPlateNumber($carPlateNumber);
        $employeeCar->setCarBrand($carBrand);

        $this->em->persist($employeeCar);
        $this->em->flush();

        return $employeeCar;
    }

    /**
     * @param int $id
     * @param string $carBrand
     * @return EmployeeCar
     * @throws ORMException
     * @throws OptimisticLockException
     */
    public function updateBrand(int $id, string $carBrand): EmployeeCar
    {
        $employeeCar = $this->find($id);
        $employeeCar->setCarBrand($carBrand);

        $this->em->persist($employeeCar);
        $this->em->flush();

        return $employeeCar;
    }

}