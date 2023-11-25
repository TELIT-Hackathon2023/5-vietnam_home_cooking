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
  Input,
  InputGroup,
  InputRightElement,
  VStack,
} from '@chakra-ui/react';
import './registerForm.css';
import { Field, Form, Formik } from 'formik';

const RegisterForm = () => {
  const handleSubmit = (values, actions) => {
    setTimeout(() => {
      alert(JSON.stringify(values, null, 2));
      actions.setSubmitting(false);
    }, 1000);
  };

  const handleForgotPw = () => {
    alert('forgot pw click');
  };

  return (
    <HStack h='100%' w='100%'>
      <div className='login-img-container'></div>
      <Container className='form-container' h='100%' w='38rem'>
        <VStack className='form-stack'>
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
                        <Box>
                          <Box
                            as='button'
                            type='button'
                            className='form-label forgot-pw-button'
                            onClick={handleForgotPw}
                          >
                            Forgot password?
                          </Box>
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
        </VStack>
      </Container>
    </HStack>
  );
};

export default RegisterForm;
