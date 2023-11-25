import React, { useState } from 'react';
import {
  Box,
  Button,
  Container,
  Flex,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  HStack,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react';
import './registerForm.css';
import { Field, Form, Formik } from 'formik';
import { CloseIcon } from '@chakra-ui/icons';
import axios from 'axios';

const LoginForm = ({ setLogin }) => {
  const handleSubmit = (values, actions) => {
    const body = {
      name: 'Eduard',
      surname: 'Ridilla',
      mobileNumber: '+421917184448',
      email: 'ridilla.eduard@gmail.com',
      companyId: 69,
      plateNumber: 'SW00000',
    };

    axios.post('https://telekomparking.website.tuke.sk/api/register', body).then((res) => {
      actions.setSubmitting(false);
      console.log(res);
    });

    // setTimeout(() => {
    //   alert(JSON.stringify(values, null, 2));
    //   actions.setSubmitting(false);
    // }, 1000);
  };

  const handleBackClick = () => {
    setLogin(1);
  };

  return (
    <>
      <Container className='back-button-container'>
        <IconButton
          bg='white'
          aria-label='Back button'
          icon={<CloseIcon />}
          onClick={handleBackClick}
        />
      </Container>

      <Stack direction='row' h='100%' w='100%'>
        <div className='register-img-container'></div>
        <Container className='form-container' h='100%' w='38rem'>
          <Stack direction='column' className='form-stack'>
            <Text mb='2.5rem' className='form-heading'>
              Claim Your Spot - Register below
            </Text>
            <Formik initialValues={{ email: '', password: '' }} onSubmit={handleSubmit}>
              {(props) => (
                <Form>
                  <Field name='name'>
                    {({ field, form }) => (
                      <FormControl
                        className='register-input'
                        isInvalid={form.errors.name && form.touched.name}
                      >
                        <Input {...field} placeholder='Name' />
                        <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  <Field name='surname'>
                    {({ field, form }) => (
                      <FormControl
                        className='register-input'
                        isInvalid={form.errors.password && form.touched.password}
                      >
                        <Input {...field} placeholder='Surname' />
                        <FormErrorMessage>{form.errors.password}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  <Field name='mobileNumber'>
                    {({ field, form }) => (
                      <FormControl
                        className='register-input'
                        isInvalid={form.errors.password && form.touched.password}
                      >
                        <Input {...field} placeholder='Mobile number' />
                        <FormErrorMessage>{form.errors.password}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  <Field name='companyEmail'>
                    {({ field, form }) => (
                      <FormControl
                        className='register-input'
                        isInvalid={form.errors.password && form.touched.password}
                      >
                        <Input {...field} placeholder='Company email' />
                        <FormErrorMessage>{form.errors.password}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  <Field name='personalId'>
                    {({ field, form }) => (
                      <FormControl
                        className='register-input'
                        isInvalid={form.errors.password && form.touched.password}
                      >
                        <Input {...field} placeholder='Personal ID' />
                        <FormErrorMessage>{form.errors.password}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  <Field name='licencePlateNumber'>
                    {({ field, form }) => (
                      <FormControl
                        className='register-input'
                        isInvalid={form.errors.password && form.touched.password}
                      >
                        <Input {...field} placeholder='License plate number' />
                        <FormErrorMessage>{form.errors.password}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  <Button
                    mt={4}
                    color='white'
                    bg='#E10075'
                    type='submit'
                    isLoading={props.isSubmitting}
                  >
                    Confirm
                  </Button>
                </Form>
              )}
            </Formik>
          </Stack>
        </Container>
      </Stack>
    </>
  );
};

export default LoginForm;
