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


/**
 * API for logging users in
 *
 * @ApiRoute(
 * 	"/api/delete-car",
 * 	methods={
 * 		"POST"="run"
 * 	},
 *  presenter="DeleteEmployeeCar",
 *  format="json"
 * )
 */
final class DeleteEmployeeCarController extends AbstractController
{
    /** @var EmployeeRepository @inject */
    public EmployeeRepository $employeeRepository;

    /** @var EmployeeCarRepository @inject */
    public EmployeeCarRepository $employeeCarRepository;

	public function run(Request $request): Response
	{
        $data = $this->getRequestData();
        $values = json_decode($data);

        try {
            $user = $this->employeeRepository->getById($values->userId);
            if ($user === null) {
                return new JsonResponse($this->apiResponseFormatter->formatError("404", "user is null"), IResponse::S404_NotFound);
            } else if ($user->isEnabled() !== true) {
                return new JsonResponse($this->apiResponseFormatter->formatError("404", "user is not enabled"), IResponse::S404_NotFound);
            } else {

                $alreadyExists = $this->employeeCarRepository->countCarsByPlate(['employee' => $user, 'carPlateNumber' => $values->plateNumber]);

                if ($alreadyExists == 0) {
                    return new JsonResponse($this->apiResponseFormatter->formatError("403", "this car is not assigned to selected user"), IResponse::S403_Forbidden);
                } else {

                    $car = $this->employeeCarRepository->findOneCarBy(['employee' => $user, 'carPlateNumber' => $values->plateNumber]);
                    $this->employeeCarRepository->deleteCar($car->getId());

                    return new JsonResponse($this->apiResponseFormatter->formatMessage("successfully deleted "), IResponse::S200_OK);
                }
            }
        } catch (\Exception $e) {
            return new JsonResponse($this->apiResponseFormatter->formatError($e->getCode(), $e->getMessage()), IResponse::S500_InternalServerError);
        }

	}
}
