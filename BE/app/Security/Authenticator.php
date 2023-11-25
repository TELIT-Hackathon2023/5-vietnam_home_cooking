<?php
/**
 * This file is part of the rozlomity
 *
 * Copyright (c) 2017 Aleš Jandera <ales.jandera@gmail.com>
 *
 * For the full copyright and license information, please view
 * the file license.txt that was distributed with this source code.
 */ 

namespace App\Security;

use App\Model\Services\EmployeeRepository;
use Doctrine\ORM\OptimisticLockException;
use Doctrine\ORM\ORMException;
use Doctrine\ORM\TransactionRequiredException;
use Nette\Security\AuthenticationException;
use Nette\Security\Identity;
use Nette\Security\IIdentity;
use Nette\Security\Passwords;

class Authenticator implements \Nette\Security\Authenticator
{


    /** @var  EmployeeRepository */
    private $employeeRepository;

    public function __construct(EmployeeRepository $employeeRepository)
    {
        $this->employeeRepository = $employeeRepository;
    }

    /**
     * Performs an authentication against e.g. database.
     * and returns IIdentity on success or throws AuthenticationException
     * @param string $user
     * @param string $password
     * @return IIdentity
     * @throws AuthenticationException
     * @throws ORMException
     * @throws OptimisticLockException
     * @throws TransactionRequiredException
     */
    function authenticate(string $user, string $password): IIdentity
    {
        if (isset($fakeLogin) && $fakeLogin === true) {
            $user = $this->employeeRepository->findEmployeeBy(['email' => $user, 'enabled' => true]);

            if (!isset($user) || $user === false) {
                throw new AuthenticationException("The username is incorrect.", self::IDENTITY_NOT_FOUND);
            }
        } else {
            $user = $this->employeeRepository->findEmployeeBy(['email' => $user, 'enabled' => true]);
            if (!isset($user) || $user === false) {
                throw new AuthenticationException("The username is incorrect.", self::IDENTITY_NOT_FOUND);
            }

            if (!Passwords::verify($password, $user->getPassword())) {
                if (md5($password) !== $user->getPassword()) {
                    throw new AuthenticationException("The password is incorrect.", self::INVALID_CREDENTIAL);
                }
            }
        }

        $this->employeeRepository->setLastLogin($user);
        $data = [
            'id' => $user->getId(),
            'name' => $user->getName() . ' ' . $user->getSurname(),
            'email' => $user->getEmail()
        ];

        return new Identity($user->getId(), ['Customer'], $data);
    }
}
 