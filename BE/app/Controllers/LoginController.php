<?php

declare(strict_types=1);

namespace App\Controllers;

use App\Model\Services\EmployeeRepository;
use App\Security\Authenticator;
use Contributte\ApiRouter\ApiRoute;
use Nette\Application\Request;
use Nette\Application\Response;
use Nette\Application\Responses\JsonResponse;

/**
 * API for logging users in
 *
 * @ApiRoute(
 * 	"/api/login",
 * 	methods={
 * 		"POST"="run"
 * 	},
 *  presenter="Sign",
 *  format="json"
 * )
 */
final class LoginController extends AbstractController
{
    /** @var EmployeeRepository @inject */
    public EmployeeRepository $employeeRepository;

    /** @var Authenticator */
    private Authenticator $authenticator;


	public function run(Request $request): Response
	{
		return new JsonResponse($this->apiResponseFormatter->formatMessage('Hello'));
	}

    public function up(Request $request): Response
    {
        try {
            $this->authenticator = new Authenticator($this->employeeRepository);
            $data = $this->getHttpRequest()->getRawBody();
            $values = json_decode($data);
            $error = [];
            if (!filter_var($values->email, FILTER_VALIDATE_EMAIL)) {
                $error[] = [
                    'key' => 'email',
                    'code' => 'messages.validation.email.invalid'
                ];
                $this->resource->error = $error;
                $this->resource->success = false;
            } else {
                $language = $this->grammarian->getDefaultLanguage();
                $customerExist = $this->employeeRepository->countOfCustomers(['email' => $values->email, 'weakCustomer' => false]);
                $error = [];
                if ($customerExist == 1) {
                    $error[] = [
                        'key' => 'email',
                        'code' => 'messages.validation.email.exists'
                    ];
                    $this->resource->error = $error;
                    $this->resource->success = false;
                } else {
                    $error = $this->employeeRepository->validateNewPassword($values->password, true);
                    if ($error !== null) {
                        $this->resource->error = [$error];
                        $this->resource->success = false;
                    } else {
                        $validate = Validate::require($values, [
                            'email',
                            'password',
                            'name',
                            'surname',
                            'phone',
                            'newsletter',
                            'street',
                            'zip',
                            'city',
                            'state',
                        ]);
                        if ($validate['success'] === false) {
                            $this->resource->success = false;
                            $this->resource->error = $validate['error'];
                        } else {
                            $checkWeekCustomer = $this->employeeRepository->findCustomerBy(['email' => $values->email, 'weakCustomer' => true]);

                            // priradenie do skupiny "fleX"
                            $customerGroupsIds = [];
                            $enabledAfterRegistration = true;
                            if (isset($values->industry)) {
                                $customerGroupsIds[] = CustomerGroupProvider::GROUP_ID_FLEX;
                                $enabledAfterRegistration = false; // po zaregistrovani do fleX, je ucet neaktivny, kym nie je aktivovany obchodakom
                            } else {
                                $customerGroupsIds[] = CustomerGroupProvider::GROUP_ID_B2B;
                            }


                            if (isset($checkWeekCustomer)) {
                                $customer = $this->employeeRepository->changeCustomer(
                                    $checkWeekCustomer->getId(),
                                    isset($values->companyName) ? $values->companyName : "",
                                    $values->name,
                                    $values->surname,
                                    $values->phone,
                                    $values->email,
                                    $values->password,
                                    $values->newsletter,
                                    null,
                                    null,
                                    $language->getId(),
                                    false,
                                    $enabledAfterRegistration,
                                    $customerGroupsIds,
                                    false,
                                    isset($values->companyId) ? $values->companyId : null,
                                    isset($values->vatRegistrationId) ? $values->vatRegistrationId : null,
                                    isset($values->extVatRegistrationId) ? $values->extVatRegistrationId : null,
                                    isset($values->industry) ? $values->industry : null,
                                    false,
                                    '',
                                    true
                                );
                            } else {
                                $customer = $this->employeeRepository->createCustomer(
                                    isset($values->companyName) ? $values->companyName : "",
                                    $values->name,
                                    $values->surname,
                                    $values->phone,
                                    $values->email,
                                    $values->password,
                                    $values->newsletter,
                                    $language->getId(),
                                    false,
                                    $enabledAfterRegistration,
                                    $customerGroupsIds,
                                    false,
                                    isset($values->companyId) ? $values->companyId : null,
                                    isset($values->vatRegistrationId) ? $values->vatRegistrationId : null,
                                    isset($values->extVatRegistrationId) ? $values->extVatRegistrationId : null,
                                    isset($values->industry) ? $values->industry : null,
                                    false,
                                    null
                                );
                            }

                            $this->customerAddressProvider->createCustomerAddress(
                                null, //array_key_exists("companyName", $values) ? $values->companyName : null,
                                $values->name,
                                $values->surname,
                                $values->street,
                                $values->zip,
                                $values->city,
                                $values->state,
                                CustomerAddress::INVOICE_ADDRESS,
                                $values->phone,
                                null,
                                null,
                                $customer
                            );

                            $this->customerAddressProvider->createCustomerAddress(
                                null,
                                $values->name,
                                $values->surname,
                                $values->street,
                                $values->zip,
                                $values->city,
                                $values->state,
                                CustomerAddress::DELIVERY_ADDRESS,
                                $values->phone,
                                null,
                                null,
                                $customer
                            );

                            $this->employeeRepository->sendConfirmRegistrationEmail($customer, $language);

                            $user = null;
                            if ($enabledAfterRegistration) {
                                //login after successful registration

                                $this->getUser()->setAuthenticator($this->authenticator);
                                $this->getUser()->login($customer->getEmail(), $values->password, false);
                                $this->getUser()->setExpiration('24 hours', false);


                                $authCheck = (new DateTime())->getTimestamp();
                                $this->employeeRepository->setLastLogin($customer);
                                $this->employeeRepository->setAuthCheck($customer, $authCheck);
                                $userId = $customer->getId();

                                $user = [
                                    'id'         => Utils::encrypt($userId),
                                    'username'   => $customer->getEmail(),
                                    'first_name' => $customer->getFirstName(),
                                    'last_name'  => $customer->getLastName(),
                                    'flex_group' => $this->employeeRepository->isInFlexGroup($userId),
                                    "auth_check" => $authCheck
                                ];
                            }

                            $this->resource->success = true;
                            $this->resource->user = $user;
                        }
                    }
                }
            }
        } catch (\Exception $e) {
            $this->resource->success = false;
            $this->resource->error = [
                'key' => 'server',
                'code' => $e->getMessage()
            ];
        }

        return new JsonResponse($this->apiResponseFormatter->formatMessage('Hello'));
    }
}
