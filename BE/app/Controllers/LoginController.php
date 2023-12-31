<?php

declare(strict_types=1);

namespace App\Controllers;

use App\Model\Services\EmployeeRepository;
use App\Security\Authenticator;
use Contributte\ApiRouter\ApiRoute;
use Nette\Application\Request;
use Nette\Application\Response;
use App\Utils\Responses\ExtendedJsonResponse as JsonResponse;
use Nette\Http\IResponse;

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
                return new JsonResponse($this->apiResponseFormatter->formatError("404", "user is null"), IResponse::S404_NotFound);
            } else if ($user->isEnabled() !== true) {
                return new JsonResponse($this->apiResponseFormatter->formatError("404", "user is not enabled"), IResponse::S404_NotFound);
            } else {
                if ($values->password != $user->getPassword()) {
                    return new JsonResponse($this->apiResponseFormatter->formatError("401", "bad password"), IResponse::S401_Unauthorized);
                } else {

                    $this->employeeRepository->setLastLogin($user);

                    $userInfo = [
                        'id'         => $user->getId(),
                        'email'   => $user->getEmail(),
                        'first_name' => $user->getName(),
                        'surname'  => $user->getSurname(),
                        'phone'      => $user->getMobileNumber()
                    ];
                    return new JsonResponse($this->apiResponseFormatter->formatPayload($userInfo), IResponse::S200_OK);
                }
            }
        } catch (\Exception $e) {
            return new JsonResponse($this->apiResponseFormatter->formatError($e->getCode(), $e->getMessage()), IResponse::S500_InternalServerError);
        }
	}
}
