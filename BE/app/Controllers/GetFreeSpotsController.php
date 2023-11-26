<?php

declare(strict_types=1);

namespace App\Controllers;

use App\Model\Services\EmployeeCarRepository;
use App\Model\Services\EmployeeRepository;
use App\Model\Services\ParkingSpotRepository;
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
 * 	"/api/free-spots",
 *
 * 	methods={
 * 		"GET"="run"
 * 	},
 *  presenter="GetFreeSpots"
 * )
 */
final class GetFreeSpotsController extends AbstractController
{

    /** @var ParkingSpotRepository @inject */
    public ParkingSpotRepository $parkingSpotRepository;

	public function run(Request $request): Response
	{
        try {

            $formattedFreeSpots = array();
            $freeSpots = $this->parkingSpotRepository->findParkingSpotsBy(['free' => true]);
            foreach ($freeSpots as $freeSpot){
                $formattedFreeSpots[] = $freeSpot->getNumber();
            }

            return new JsonResponse($this->apiResponseFormatter->formatPayload($formattedFreeSpots), IResponse::S200_OK);

        } catch (\Exception $e) {
            return new JsonResponse($this->apiResponseFormatter->formatError($e->getCode(), $e->getMessage()), IResponse::S500_InternalServerError);
        }

	}
}
