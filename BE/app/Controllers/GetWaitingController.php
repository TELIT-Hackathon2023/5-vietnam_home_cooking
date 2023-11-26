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
 * 	"/api/waiting-count",
 *
 * 	methods={
 * 		"GET"="run"
 * 	},
 *  presenter="GetWaiting"
 * )
 */
final class GetWaitingController extends AbstractController
{

    /** @var ReservationRepository @inject */
    public ReservationRepository $reservationRepository;

	public function run(Request $request): Response
	{
        try {

            $waiting = $this->reservationRepository->count(['spot' => NULL, 'waiting' => true]);

            return new JsonResponse($this->apiResponseFormatter->formatPayload(['waiting' => $waiting]), IResponse::S200_OK);

        } catch (\Exception $e) {
            return new JsonResponse($this->apiResponseFormatter->formatError($e->getCode(), $e->getMessage()), IResponse::S500_InternalServerError);
        }

	}
}
