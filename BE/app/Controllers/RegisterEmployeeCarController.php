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
 * 	"/api/register-car",
 * 	methods={
 * 		"POST"="run"
 * 	},
 *  presenter="RegisterEmployeeCar",
 *  format="json"
 * )
 */
final class RegisterEmployeeCarController extends AbstractController
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

                if ($alreadyExists >= 1) {
                    return new JsonResponse($this->apiResponseFormatter->formatError("403", "this plate is already registered"), IResponse::S403_Forbidden);
                } else {

                    $car = $this->employeeCarRepository->create($user, $values->plateNumber, null);

                    $plateVar = "[" . '"' .  $car->getCarPlateNumber() . '"' . "]";
                    $file = '../data.json';
                    file_put_contents($file, $plateVar);
                    $pythonScript = '../scrap.py';
                    shell_exec("python3 $pythonScript '$file'");
                    $jsonContent = file_get_contents($file);
                    $data = json_decode($jsonContent, true);
                    $this->employeeCarRepository->updateBrand($car->getId(), $data[$car->getCarPlateNumber()]);
                    unlink($file);

                    return new JsonResponse($this->apiResponseFormatter->formatMessage("registered successfully and scraped brand "), IResponse::S200_OK);
                }
            }
        } catch (\Exception $e) {
            return new JsonResponse($this->apiResponseFormatter->formatError($e->getCode(), $e->getMessage()), IResponse::S500_InternalServerError);
        }

	}
}
