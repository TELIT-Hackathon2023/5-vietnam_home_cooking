import React, { useEffect, useState } from 'react';
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
  Input,
  InputGroup,
  InputRightElement,
  Image,
  Stack,
  VStack,
  ButtonGroup,
  useToast,
} from '@chakra-ui/react';
import './loginForm.css';
import { Field, Form, Formik } from 'formik';
import LoginImage from '../../assets/login_logo.svg';
import { md5 } from 'js-md5';
import axios from 'axios';
import { telekomEmailRegex } from '../../assets/regex.js';
import { useUserContext } from '../../hooks/UserContext.jsx';

const LoginForm = ({ setLogin, setLoggedIn }) => {
  const { userData, setUserData } = useUserContext();
  const toast = useToast();

  const handleSubmit = (values, actions) => {
    const payload = {
      email: values.email,
      password: md5(values.password),
    };

    axios
      .post('https://telekomparking.website.tuke.sk/api/login', payload, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': '*',
          'Access-Control-Allow-Headers': '*',
        },
      })
      .then(async (res) => {
        actions.setSubmitting(false);

        const vehicles = await axios
          .get('https://telekomparking.website.tuke.sk/api/employee-cars/' + res.data.payload.id)
          .then((res) => res.data.payload);

        setUserData({ ...res.data.payload, vehicles });
        console.log({ ...res.data.payload, vehicles });

        let toastTitle = 'Welcome ' + res.data.payload.first_name;
        let toastStatus = 'success';

        toast({
          title: toastTitle,
          description: 'Logging in...',
          status: toastStatus,
          duration: 3000,
          isClosable: false,
        });

        setTimeout(() => {
          setLoggedIn(true);
        }, 3000);
      })
      .catch((res) => {
        actions.setSubmitting(false);

        let toastTitle;

        if (res.response.data.code === '401') toastTitle = 'Incorrect password. Please try again.';
        if (res.response.data.code === 0) toastTitle = 'Incorrect e-mail. Please try again.';

        toast({
          title: toastTitle,
          status: 'error',
          duration: 9000,
          isClosable: true,
        });
      });
  };

  const handleForgotPw = () => {
    alert('forgot pw click');
  };

  const handleRegisterClick = () => {
    setLogin(0);
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

  const validateEmail = (email) => {
    // const found = email.match(telekomEmailRegex);
    //
    // console.log(found);
    //
    // if (!found) {
    //   return 'Invalid email';
    // }
  };

  return (
    <>
      <Container
        className='register-button-container'
        display={stackDirection === 'row' ? 'block' : 'none'}
      >
        <HStack>
          <p className='register-label'>Don't have an account?</p>
          <Button
            variant='outline'
            color='#E10075'
            borderColor='#E10075'
            onClick={handleRegisterClick}
          >
            Request access
          </Button>
        </HStack>
      </Container>

      <Stack direction={stackDirection} h='100%' w='100%'>
        <div className='login-img-container'>
          <Image src={LoginImage} />
        </div>
        <Container className='form-container' h='100%' w='38rem'>
          <Stack direction='column' className='form-stack'>
            <p className='form-heading'>Sign in to Parking</p>
            <p className='form-subtext'>Please enter your detail below to sign in</p>
            <Formik
              initialValues={{ email: 'ridilla.eduard@gmail.com', password: '6rlsYCezu1' }}
              onSubmit={handleSubmit}
            >
              {(props) => (
                <Form>
                  <Field name='email' validate={validateEmail}>
                    {({ field, form }) => (
                      <FormControl
                        isInvalid={form.errors.email && form.touched.email}
                        className='email-input'
                      >
                        <FormLabel className='form-label'>Personal ID / E-mail Address</FormLabel>
                        <Input {...field} type='email' />
                        <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  <Field name='password'>
                    {({ field, form }) => (
                      <FormControl isInvalid={form.errors.password && form.touched.password}>
                        <Flex justify='space-between'>
                          <Box>
                            <FormLabel className='form-label'>Your password</FormLabel>
                          </Box>
                          <Box
                            as='button'
                            type='button'
                            className='form-label forgot-pw-button'
                            onClick={handleForgotPw}
                          >
                            Forgot password?
                          </Box>
                        </Flex>
                        <Input {...field} type='password' />
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
                        onClick={handleRegisterClick}
                        mt='1rem'
                        w='50%'
                      >
                        Request access
                      </Button>
                    ) : (
                      ''
                    )}
                    <Button
                      mt={4}
                      color='white'
                      bg='#E10075'
                      _hover={{ bgColor: '#C5006A' }}
                      type='submit'
                      isLoading={props.isSubmitting}
                      w={stackDirection === 'column' ? '50%' : ''}
                    >
                      Sign In
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
