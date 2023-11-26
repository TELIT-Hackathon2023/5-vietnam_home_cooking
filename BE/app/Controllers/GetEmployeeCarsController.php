<?php

declare(strict_types=1);

namespace App\Controllers;

use App\Model\Services\EmployeeCarRepository;
use App\Model\Services\EmployeeRepository;
use Contributte\ApiRouter\ApiRoute;
use Nette\Application\Request;
use Nette\Application\Response;
use App\Utils\Responses\ExtendedJsonResponse as JsonResponse;
use Nette\Http\IResponse;
use Tracy\Debugger;


/**
 * API for logging users in
 *
 * @ApiRoute(
 * 	"/api/employee-cars/<id>",
 * 	parameters={
 * 		"id"={
 * 			"requirement": "\d+"
 * 		}
 *  },
 * 	methods={
 * 		"GET"="run"
 * 	},
 *  presenter="GetEmployeeCars"
 * )
 */
final class GetEmployeeCarsController extends AbstractController
{

    /** @var EmployeeCarRepository @inject */
    public EmployeeCarRepository $employeeCarRepository;

    /** @var EmployeeRepository @inject */
    public EmployeeRepository $employeeRepository;

	public function run(Request $request): Response
	{
        $userId = $request->getParameters()['id'];

        try {
            $user = $this->employeeRepository->getById((int)$userId);
            if ($user === null) {
                return new JsonResponse($this->apiResponseFormatter->formatError("404", "user is null"), IResponse::S404_NotFound);
            } else if ($user->isEnabled() !== true) {
                return new JsonResponse($this->apiResponseFormatter->formatError("404", "user is not enabled"), IResponse::S404_NotFound);
            } else {

                $formattedUserCars = array();
                $userCars = $this->employeeCarRepository->findEmployeeCarsBy(['employee' => $user]);
                foreach ($userCars as $userCar){
                    $formattedUserCarsSingle = array();
                    $formattedUserCarsSingle['plateNumber'] = $userCar->getCarPlateNumber();
                    $formattedUserCarsSingle['carBrand'] = $userCar->getCarBrand();
                    $formattedUserCars[] = $formattedUserCarsSingle;
                }

                return new JsonResponse($this->apiResponseFormatter->formatPayload($formattedUserCars), IResponse::S200_OK);

            }
        } catch (\Exception $e) {
            return new JsonResponse($this->apiResponseFormatter->formatError($e->getCode(), $e->getMessage()), IResponse::S500_InternalServerError);
        }

	}
}
