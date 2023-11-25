import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  ButtonGroup,
  Container,
  Flex,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  HStack,
  IconButton,
  Image,
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
import RegisterImage from '../../assets/register_logo.svg';

const LoginForm = ({ setLogin }) => {
  const handleSubmit = async (values, actions) => {
    const body = {
      name: 'Eduard',
      surname: 'Ridilla',
      mobileNumber: '+421917184448',
      email: 'ridilla.eduard@gmail.com',
      companyId: 69,
      plateNumber: 'SW00000',
    };

    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('Cookie', '_nss=1');
    myHeaders.append('Access-Control-Allow-Origin', '*');
    myHeaders.append('Access-Control-Allow-Methods', '*');
    myHeaders.append('Access-Control-Allow-Headers', '*');

    const raw = JSON.stringify({
      name: 'Eduard',
      surname: 'Ridilla',
      mobileNumber: '+421917184448',
      email: 'ridilla.eduard@gmail.com',
      companyId: 69,
      plateNumber: 'SW00000',
    });

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };

    fetch('https://telekomparking.website.tuke.sk/api/register', requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log('error', error));

    // setTimeout(() => {
    //   alert(JSON.stringify(values, null, 2));
    //   actions.setSubmitting(false);
    // }, 1000);
  };

  const handleBackClick = () => {
    setLogin(1);
  };

  const [stackDirection, setStackDirection] = useState('row');

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1200) {
        setStackDirection('column');
      } else {
        setStackDirection('row');
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
      <Container
        className='back-button-container'
        display={stackDirection === 'row' ? 'block' : 'none'}
      >
        <IconButton
          bg='white'
          aria-label='Back button'
          icon={<CloseIcon />}
          onClick={handleBackClick}
        />
      </Container>

      <Stack direction={stackDirection} h='100%' w='100%'>
        <div className='register-img-container'>
          <Image src={RegisterImage} />
        </div>
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
                  <ButtonGroup isAttached w='100%'>
                    {stackDirection === 'column' ? (
                      <Button
                        variant='outline'
                        color='#E10075'
                        borderColor='#E10075'
                        onClick={handleBackClick}
                        mt='1rem'
                        w='50%'
                      >
                        Cancel
                      </Button>
                    ) : (
                      ''
                    )}
                    <Button
                      mt={4}
                      color='white'
                      bg='#E10075'
                      type='submit'
                      isLoading={props.isSubmitting}
                      w={stackDirection === 'column' ? '50%' : ''}
                    >
                      Confirm
                    </Button>
                  </ButtonGroup>
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
