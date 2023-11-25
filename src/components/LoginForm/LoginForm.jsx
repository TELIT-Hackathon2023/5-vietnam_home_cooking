import React, { Component } from 'react';
import {
  Box,
  Button,
  Center,
  Container,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
} from '@chakra-ui/react';
import './loginForm.css';
import { Field, Form, Formik } from 'formik';

const LoginForm = () => {
  const validateName = (value) => {
    let error;

    if (!value) {
      error = 'Name is required';
    } else if (value.toLowerCase() !== 'naruto') {
      error = "Jeez! You're not a fan 😱";
    }
    return error;
  };

  return (
    <Center h='100%'>
      <Box p='2rem' bg='#E10075' borderRadius='lg'>
        <Formik
          initialValues={{ name: 'Sasuke' }}
          onSubmit={(values, actions) => {
            setTimeout(() => {
              alert(JSON.stringify(values, null, 2));
              actions.setSubmitting(false);
            }, 1000);
          }}
        >
          {(props) => (
            <Form>
              <Field name='name' validate={validateName}>
                {({ field, form }) => (
                  <FormControl isInvalid={form.errors.name && form.touched.name}>
                    <FormLabel>First name</FormLabel>
                    <Input {...field} placeholder='name' bg='white' borderColor='#2c2c2c' />
                    <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Button mt={4} colorScheme='teal' isLoading={props.isSubmitting} type='submit'>
                Submit
              </Button>
            </Form>
          )}
        </Formik>
      </Box>
    </Center>
  );
};

export default LoginForm;
