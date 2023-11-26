import React from 'react';
import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  useDisclosure,
  Text,
} from '@chakra-ui/react';
import axios from 'axios';
import { useUserContext } from '../../hooks/UserContext.jsx';
import { Field, Form, Formik } from 'formik';

const BookSpotButton = ({ spotNumber, refreshData }) => {
  const { userData } = useUserContext();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleBookSpot = (values, actions) => {
    console.log(values);

    const body = {
      userId: userData.id,
      plateNumber: values.plateNumber,
      spotNumber: spotNumber,
      from: values.dateFrom.replace('T', ' ') + ':00',
      to: values.dateTo.replace('T', ' ') + ':00',
    };

    console.log(body);

    axios.post('https://telekomparking.website.tuke.sk/api/make-reservation', body).then((res) => {
      console.log(res);
      actions.setSubmitting(false);
      refreshData();
      onClose();
    });
  };

  return (
    <>
      {' '}
      <Button w='100%' bg='#E10075' color='white' _hover={{ bgColor: '#C5006A' }} onClick={onOpen}>
        Book this spot
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} size='md'>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Book spot {spotNumber}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Formik
              initialValues={{ plateNumber: '', dateFrom: '', dateTo: '' }}
              onSubmit={handleBookSpot}
            >
              {(props) => (
                <Form>
                  <Field name='plateNumber'>
                    {({ field, form }) => (
                      <FormControl isInvalid={form.errors.email && form.touched.email}>
                        <FormLabel>Plate Number</FormLabel>
                        <Select {...field} placeholder='Select plate number'>
                          {userData.vehicles.map((vehicle) => (
                            <option value={vehicle.plateNumber}>
                              {vehicle.carBrand} ({vehicle.plateNumber})
                            </option>
                          ))}
                        </Select>
                        <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  <Field name='dateFrom'>
                    {({ field, form }) => (
                      <FormControl isInvalid={form.errors.email && form.touched.email}>
                        <FormLabel>From</FormLabel>
                        <Input {...field} type='datetime-local' />
                        <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  <Field name='dateTo'>
                    {({ field, form }) => (
                      <FormControl isInvalid={form.errors.email && form.touched.email}>
                        <FormLabel>To</FormLabel>
                        <Input {...field} type='datetime-local' />
                        <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  <ButtonGroup isAttached w='100%'>
                    <Button
                      variant='outline'
                      color='#E10075'
                      borderColor='#E10075'
                      onClick={onClose}
                      mt='1rem'
                      w='50%'
                    >
                      Close
                    </Button>
                    <Button
                      mt={4}
                      color='white'
                      bg='#E10075'
                      _hover={{ bgColor: '#C5006A' }}
                      type='submit'
                      isLoading={props.isSubmitting}
                      w='50%'
                    >
                      Submit
                    </Button>
                  </ButtonGroup>
                </Form>
              )}
            </Formik>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default BookSpotButton;
