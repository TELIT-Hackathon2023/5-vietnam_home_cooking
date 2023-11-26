<?php declare(strict_types = 1);

/**
 * This file is part of the Telekom Parking App project.
 * Copyright (c) 2023 Slavomír Švigar <slavo.svigar@gmail.com>
 */

namespace App\Model\Services;

use App\Model\Entity\Employee;
use App\Model\Entity\EmployeeCar;
use App\Model\Entity\ParkingSpot;
use App\Model\Entity\Reservation;
use Doctrine\ORM\EntityRepository;
use Doctrine\ORM\EntityManager;
use Doctrine\ORM\Exception\ORMException;
use Doctrine\ORM\Mapping\ClassMetadata;
use Doctrine\ORM\OptimisticLockException;

class ReservationRepository extends EntityRepository {

	/**
	 * @var EntityManager
	 */
    private $em;

	/**
	 * ReservationRepository constructor.
	 * @param EntityManager $entityManager
	 */
    public function __construct(EntityManager $entityManager) {
    	parent::__construct($entityManager, new ClassMetadata(Reservation::class));

        $this->em = $entityManager;
    }

	/**
	 * @param int $id
	 * @return Reservation|null
     * @throws \Doctrine\ORM\ORMException
	 * @throws \Doctrine\ORM\OptimisticLockException
	 * @throws \Doctrine\ORM\TransactionRequiredException
	 */
    public function getById(int $id) : ?Reservation {
    	$aq = $this->em->find(Reservation::class, $id);

    	if($aq instanceof Reservation) {
    		return $aq;
		}
		return null;
	}

    /**
     * @param array $criteria
     * @param array|null $orderBy
     * @return Reservation
     */
    public function findOneReservationBy(array $criteria = array(), array|null $orderBy = array()): Reservation
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
    public function findReservationsBy(array $criteria = array(), array|null $orderBy = array(), $limit = null, $offset = null): array
    {
        return $this->findBy($criteria, $orderBy, $limit, $offset);
    }

    /**
     * @param array $criteria
     * @return int
     */
    public function countReservationsBy(array $criteria = array()): int
    {
        return $this->count($criteria);
    }


    /**
     * @param Employee $employee
     * @param ParkingSpot $parkingSpot
     * @param \DateTime $from
     * @param \DateTime $to
     * @param EmployeeCar $employeeCar
     * @return Reservation
     * @throws ORMException
     * @throws OptimisticLockException
     */
    public function create(Employee $employee, ParkingSpot $parkingSpot, EmployeeCar $employeeCar, \DateTime $from, \DateTime $to): Reservation
    {
        $reservation = new Reservation;
        $reservation->setEmployee($employee);
        $reservation->setSpot($parkingSpot);
        $reservation->setEmployeeCar($employeeCar);
        $reservation->setDateFrom($from);
        $reservation->setDateTo($to);

        $this->em->persist($reservation);
        $this->em->flush();

        return $reservation;
    }

}