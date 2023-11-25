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
} from '@chakra-ui/react';
import './loginForm.css';
import { Field, Form, Formik } from 'formik';
import LoginImage from '../../assets/login_logo.svg';

const LoginForm = ({ setLogin }) => {
  const handleSubmit = (values, actions) => {
    setTimeout(() => {
      alert(JSON.stringify(values, null, 2));
      actions.setSubmitting(false);
    }, 1000);
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

  return (
    <>
      <Container className='register-button-container'>
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
            <Formik initialValues={{ email: '', password: '' }} onSubmit={handleSubmit}>
              {(props) => (
                <Form>
                  <Field name='email'>
                    {({ field, form }) => (
                      <FormControl
                        isInvalid={form.errors.name && form.touched.name}
                        className='email-input'
                      >
                        <FormLabel className='form-label'>Personal ID / E-mail Address</FormLabel>
                        <Input {...field} type='email' />
                        <FormErrorMessage>{form.errors.name}</FormErrorMessage>
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
                  <Button
                    mt={4}
                    color='white'
                    bg='#E10075'
                    type='submit'
                    isLoading={props.isSubmitting}
                  >
                    Sign In
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
