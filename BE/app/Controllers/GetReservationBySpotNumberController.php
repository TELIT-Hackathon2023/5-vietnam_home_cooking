<?php

declare(strict_types=1);

namespace App\Controllers;

use App\Model\Services\EmployeeCarRepository;
use App\Model\Services\EmployeeRepository;
use App\Model\Services\ParkingSpotRepository;
use App\Model\Services\ReservationRepository;
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
 * 	"/api/reservation-by-spot-number/<id>",
 * 	parameters={
 * 		"id"={
 * 			"requirement": "\d+"
 * 		}
 *  },
 * 	methods={
 * 		"GET"="run"
 * 	},
 *  presenter="GetReservationBySpotNumber"
 * )
 */
final class GetReservationBySpotNumberController extends AbstractController
{

    /** @var ReservationRepository @inject */
    public ReservationRepository $reservationRepository;

    /** @var ParkingSpotRepository @inject */
    public ParkingSpotRepository $parkingSpotRepository;

	public function run(Request $request): Response
	{
        $spotId = $request->getParameters()['id'];

        try {
            $spot = $this->parkingSpotRepository->findOneSpotBy(['number' => (int)$spotId]);
            if ($spot === null) {
                return new JsonResponse($this->apiResponseFormatter->formatError("404", "spot is null"), IResponse::S404_NotFound);
            } else if ($spot->isFree()) {
                return new JsonResponse($this->apiResponseFormatter->formatError("403", "spot is free"), IResponse::S403_Forbidden);
            } else {

                $reservation = $this->reservationRepository->findOneReservationBy(['spot' => $spot]);

                $reservationInfo = [
                    'id'         => $reservation->getId(),
                    'licensePlate'   => $reservation->getEmployeeCar()->getCarPlateNumber(),
                    'from' => $reservation->getDateFrom()->format('Y-m-d H:i:s'),
                    'surname'  => $reservation->getDateTo()->format('Y-m-d H:i:s')
                ];
                return new JsonResponse($this->apiResponseFormatter->formatPayload($reservationInfo), IResponse::S200_OK);

            }
        } catch (\Exception $e) {
            return new JsonResponse($this->apiResponseFormatter->formatError($e->getCode(), $e->getMessage()), IResponse::S500_InternalServerError);
        }

	}
}
