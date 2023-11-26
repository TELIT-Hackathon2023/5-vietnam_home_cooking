<?php

namespace App\Command;

use App\Model\Services\EmployeeCarRepository;
use Doctrine\ORM\Exception\ORMException;
use Doctrine\ORM\OptimisticLockException;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;

class ScrapPlateBrand extends Command
{

    protected static $defaultName = 'app:scrap:plate:brand';
    private EmployeeCarRepository $employeeCarRepository;

    /**
     * Pass dependencies with constructor injection
     */
    public function __construct(EmployeeCarRepository $employeeCarRepository)
    {
        parent::__construct();
        $this->employeeCarRepository = $employeeCarRepository;
    }

    /**
     * @throws OptimisticLockException
     * @throws ORMException
     */
    protected function execute(InputInterface $input, OutputInterface $output)
    {

        $cars = $this->employeeCarRepository->findEmployeeCarsBy(['carBrand' => NULL]);
        $countOfCars = $this->employeeCarRepository->countCarsByPlate(['carBrand' => NULL]);
        $dataFileContent = "[" ;

        $i = 1;
        foreach ($cars as $car) {

            $dataFileContent .= '"';
            $dataFileContent .= $car->getCarPlateNumber();
            if($i != $countOfCars) {
                $dataFileContent .= '", ';
            } else {
                $dataFileContent .= '"';
                break;
            }
            $i++;
        }

        $dataFileContent .= "]";
        $file = 'data.json';
        file_put_contents($file, $dataFileContent);
        $pythonScript = 'scrap.py';
        shell_exec("python3 $pythonScript '$file'");
        $jsonContent = file_get_contents($file);
        $data = json_decode($jsonContent, true);

        foreach ($data as $key => $value) {
            $car = $this->employeeCarRepository->findOneCarBy(['carPlateNumber' => $key]);
            $this->employeeCarRepository->updateBrand($car->getId(), $value);
        }
        unlink($file);

        return 0;
    }

}
