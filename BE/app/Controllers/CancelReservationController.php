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
 * API for logging reservations in
 *
 * @ApiRoute(
 * 	"/api/reservation-cancel/<id>",
 * 	parameters={
 * 		"id"={
 * 			"requirement": "\d+"
 * 		}
 *  },
 * 	methods={
 * 		"GET"="run"
 * 	},
 *  presenter="CancelReservation"
 * )
 */
final class CancelReservationController extends AbstractController
{

    /** @var ReservationRepository @inject */
    public ReservationRepository $reservationRepository;

    /** @var ParkingSpotRepository @inject */
    public ParkingSpotRepository $parkingSpotRepository;

	public function run(Request $request): Response
	{
        $reservationId = $request->getParameters()['id'];

        try {
            $reservation = $this->reservationRepository->getById((int)$reservationId);
            if ($reservation === null) {
                return new JsonResponse($this->apiResponseFormatter->formatError("404", "reservation is null"), IResponse::S404_NotFound);
            } else {

                $this->parkingSpotRepository->makeAvailable($reservation->getId());
                $this->reservationRepository->deleteReservation($reservation->getId());

                return new JsonResponse($this->apiResponseFormatter->formatMessage('deleted successfully'), IResponse::S200_OK);

            }
        } catch (\Exception $e) {
            return new JsonResponse($this->apiResponseFormatter->formatError($e->getCode(), $e->getMessage()), IResponse::S500_InternalServerError);
        }

	}
}
