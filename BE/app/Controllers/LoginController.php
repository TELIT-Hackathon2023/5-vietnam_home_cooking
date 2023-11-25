<?php

declare(strict_types=1);

namespace App\Controllers;

use App\Model\Services\EmployeeRepository;
use App\Security\Authenticator;
use Contributte\ApiRouter\ApiRoute;
use Nette\Application\Request;
use Nette\Application\Response;
use App\Utils\Responses\ExtendedJsonResponse as JsonResponse;
use Nette\Security\Passwords;

/**
 * API for logging users in
 *
 * @ApiRoute(
 * 	"/api/login",
 * 	methods={
 * 		"POST"="run"
 * 	},
 *  presenter="Login",
 *  format="json"
 * )
 */
final class LoginController extends AbstractController
{
    /** @var EmployeeRepository @inject */
    public EmployeeRepository $employeeRepository;

    /** @var Authenticator */
    private Authenticator $authenticator;


	public function run(Request $request): Response
	{
        $this->authenticator = new Authenticator($this->employeeRepository);
        $data = $this->getRequestData();
        $values = json_decode($data);

        try {
            $user = $this->employeeRepository->findEmployeeBy(['email' => $values->email]);
            if ($user === null) {
                return new JsonResponse($this->apiResponseFormatter->formatError("404", "user is null"));
            } else if ($user->isEnabled() !== true) {
                return new JsonResponse($this->apiResponseFormatter->formatError("404", "user is not enabled"));
            } else {
                if ($values->password != $user->getPassword()) {
                    return new JsonResponse($this->apiResponseFormatter->formatError("404", "bad password"));
                } else {

                    $this->employeeRepository->setLastLogin($user);

                    $userInfo = [
                        'id'         => $user->getId(),
                        'email'   => $user->getEmail(),
                        'first_name' => $user->getName(),
                        'surname'  => $user->getSurname(),
                        'phone'      => $user->getMobileNumber()
                    ];
                    return new JsonResponse($this->apiResponseFormatter->formatPayload($userInfo));
                }
            }
        } catch (\Exception $e) {
            $this->resource->user = null;
            $this->resource->success = false;
            $this->resource->error = [
                'key' => 'server',
                'code' => $e->getMessage()
            ];
        }
		return new JsonResponse($this->apiResponseFormatter->formatMessage('Hello'));
	}
}
