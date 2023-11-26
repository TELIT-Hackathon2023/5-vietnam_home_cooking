<?php

declare(strict_types=1);

namespace App\Controllers;

use App\Model\Entity\Reservation;
use App\Model\Services\EmployeeCarRepository;
use App\Model\Services\EmployeeRepository;
use App\Model\Services\ParkingSpotRepository;
use App\Model\Services\ReservationRepository;
use Contributte\ApiRouter\ApiRoute;
use Nette\Application\Request;
use Nette\Application\Response;
use App\Utils\Responses\ExtendedJsonResponse as JsonResponse;
use Nette\Http\IResponse;
use Nette\Utils\DateTime;
use Tracy\Debugger;


/**
 * API for logging users in
 *
 * @ApiRoute(
 * 	"/api/make-reservation",
 * 	methods={
 * 		"POST"="run"
 * 	},
 *  presenter="MakeReservation",
 *  format="json"
 * )
 */
final class MakeReservationController extends AbstractController
{
    /** @var ParkingSpotRepository @inject */
    public ParkingSpotRepository $parkingSpotRepository;

    /** @var EmployeeRepository @inject */
    public EmployeeRepository $employeeRepository;

    /** @var EmployeeCarRepository @inject */
    public EmployeeCarRepository $employeeCarRepository;

    /** @var ReservationRepository @inject */
    public ReservationRepository $reservationRepository;


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

                //return new JsonResponse($this->apiResponseFormatter->formatMessage($data), IResponse::S200_OK);
                $employeeCar = $this->employeeCarRepository->findOneCarBy(['carPlateNumber' => $values->plateNumber]);

                if (!$employeeCar) {
                    return new JsonResponse($this->apiResponseFormatter->formatError("404", "plateNumber doesnt exists"), IResponse::S404_NotFound);
                } else {

                    $parkingSpot = $this->parkingSpotRepository->findOneSpotBy(['number' => $values->spotNumber]);
                    if ($parkingSpot === null || !$parkingSpot->isFree()) {
                        return new JsonResponse($this->apiResponseFormatter->formatError("404", "spot with number " . $values->spotNumber . " doesnt exists or is not free"), IResponse::S404_NotFound);
                    } else {
                        $from = DateTime::createFromFormat('Y-m-d H:i:s', $values->from);
                        $to = DateTime::createFromFormat('Y-m-d H:i:s', $values->to);

                        $this->reservationRepository->create($user, $parkingSpot, $employeeCar, $from, $to);
                        $this->parkingSpotRepository->makeUnavailable($parkingSpot->getId());

                        return new JsonResponse($this->apiResponseFormatter->formatMessage('reservation created successful'), IResponse::S200_OK);
                    }

                }
            }
        } catch (\Exception $e) {
            return new JsonResponse($this->apiResponseFormatter->formatError($e->getCode(), $e->getMessage()), IResponse::S500_InternalServerError);
        }

	}
}
