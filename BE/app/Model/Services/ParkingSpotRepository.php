<?php declare(strict_types = 1);

/**
 * This file is part of the Telekom Parking App project.
 * Copyright (c) 2023 Slavomír Švigar <slavo.svigar@gmail.com>
 */

namespace App\Model\Services;

use App\Model\Entity\ParkingSpot;
use Doctrine\ORM\EntityRepository;
use Doctrine\ORM\EntityManager;
use Doctrine\ORM\Exception\ORMException;
use Doctrine\ORM\Mapping\ClassMetadata;
use Doctrine\ORM\OptimisticLockException;
use Doctrine\ORM\TransactionRequiredException;

class ParkingSpotRepository extends EntityRepository {

	/**
	 * @var EntityManager
	 */
    private $em;

	/**
	 * ParkingSpotRepository constructor.
	 * @param EntityManager $entityManager
	 */
    public function __construct(EntityManager $entityManager) {
    	parent::__construct($entityManager, new ClassMetadata(ParkingSpot::class));

        $this->em = $entityManager;
    }

	/**
	 * @param int $id
	 * @return ParkingSpot|null
     * @throws \Doctrine\ORM\ORMException
	 * @throws \Doctrine\ORM\OptimisticLockException
	 * @throws \Doctrine\ORM\TransactionRequiredException
	 */
    public function getById(int $id) : ?ParkingSpot {
    	$aq = $this->em->find(ParkingSpot::class, $id);

    	if($aq instanceof ParkingSpot) {
    		return $aq;
		}
		return null;
	}

    /**
     * @param array $criteria
     * @param array|null $orderBy
     * @return ParkingSpot
     */
    public function findOneSpotBy(array $criteria = array(), array|null $orderBy = array()): ParkingSpot
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
    public function findParkingSpotsBy(array $criteria = array(), array|null $orderBy = array(), $limit = null, $offset = null): array
    {
        return $this->findBy($criteria, $orderBy, $limit, $offset);
    }

    /**
     * @param array $criteria
     * @return int
     */
    public function count(array $criteria = array()): int
    {
        return $this->count($criteria);
    }


    /**
     * @param int $number
     * @param bool $free
     * @return ParkingSpot
     * @throws ORMException
     * @throws OptimisticLockException
     */
    public function create(int $number, bool $free): ParkingSpot
    {
        $parkingSpot = new ParkingSpot;
        $parkingSpot->setNumber($number);
        $parkingSpot->setFree($free);

        $this->em->persist($parkingSpot);
        $this->em->flush();

        return $parkingSpot;
    }

    /**
     * @param $id
     * @return ParkingSpot
     * @throws ORMException
     * @throws OptimisticLockException
     * @throws \Doctrine\ORM\ORMException
     * @throws TransactionRequiredException
     */
    public function makeUnavailable($id): ParkingSpot
    {
        $parkingSpot = $this->getById($id);
        $parkingSpot->setFree(false);

        $this->em->persist($parkingSpot);
        $this->em->flush();

        return $parkingSpot;
    }

}