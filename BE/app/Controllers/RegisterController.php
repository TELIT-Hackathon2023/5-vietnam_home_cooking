<?php

declare(strict_types=1);

namespace App\Controllers;

use App\Model\Entity\Employee;
use App\Model\Services\EmployeeRepository;
use App\Security\Authenticator;
use Contributte\ApiRouter\ApiRoute;
use Nette\Application\Request;
use Nette\Application\Response;
use App\Utils\Responses\ExtendedJsonResponse as JsonResponse;
use Nette\Http\IResponse;
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;


/**
 * API for logging users in
 *
 * @ApiRoute(
 * 	"/api/register",
 * 	methods={
 * 		"POST"="run"
 * 	},
 *  presenter="Register",
 *  format="json"
 * )
 */
final class RegisterController extends AbstractController
{
    /** @var EmployeeRepository @inject */
    public EmployeeRepository $employeeRepository;

    /** @var Authenticator */
    private Authenticator $authenticator;


	public function run(Request $request): Response
	{
        try {
            $this->authenticator = new Authenticator($this->employeeRepository);
            $data = $this->getRequestData($request);
            $values = json_decode($data);
            if (!filter_var($values->email, FILTER_VALIDATE_EMAIL)) {
                return new JsonResponse($this->apiResponseFormatter->formatError("404", "bad email format"), IResponse::S401_Unauthorized, null);
            } else {

                $customerExist = $this->employeeRepository->countOfEmployees(['email' => $values->email]);

                if ($customerExist >= 1) {
                    return new JsonResponse($this->apiResponseFormatter->formatError("404", "already exists"));
                } else {

                    $password = $this->generateRandomString();

                    $employee = $this->employeeRepository->create(
                        $values->name,
                        $values->surname,
                        $values->mobileNumber,
                        $values->email,
                        $values->companyId,
                        $values->plateNumber,
                        md5($password)
                    );

                    $this->sendConfirmRegistrationEmail($employee, $password);
                    $this->employeeRepository->setLastLogin($employee);

                    return new JsonResponse($this->apiResponseFormatter->formatMessage("registration Email sent"));
                }
            }
        } catch (\Exception $e) {
            return new JsonResponse($this->apiResponseFormatter->formatError("500", $e->getMessage()));
        }
	}


    private function generateRandomString($length = 10): string
    {
        $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        $randomString = '';

        for ($i = 0; $i < $length; $i++) {
            $randomString .= $characters[rand(0, strlen($characters) - 1)];
        }

        return $randomString;
    }

    private function sendConfirmRegistrationEmail(Employee $employee, string $unhashedPassword): void
    {
        $mail = new PHPMailer(true);

        try {
            //Server settings
            $mail->SMTPDebug = 0;
            $mail->isSMTP();
            $mail->Host       = 'smtp.m1.websupport.sk';
            $mail->SMTPAuth   = true;
            $mail->Username   = 'slavo.svigar@swigsolutions.sk';
            $mail->Password   = 'Bj90hQ:r|H';
            $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
            $mail->Port       = 465;

            //Recipients
            $mail->setFrom('slavo.svigar@swigsolutions.sk', 'Telekom Parking system');
            $mail->addAddress($employee->getEmail());

            //Content
            $mail->isHTML(true);                                  //Set email format to HTML
            $mail->Subject = 'Ďakuejem za registráciu';
            $mail->Body    = 'This is the HTML message body <b>in bold!</b>' . $unhashedPassword;
            $mail->send();
        } catch (Exception $e) {
            echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
        }
    }
}
