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
  useToast,
  VStack,
} from '@chakra-ui/react';
import './registerForm.css';
import { Field, Form, Formik } from 'formik';
import { CloseIcon } from '@chakra-ui/icons';
import axios from 'axios';
import RegisterImage from '../../assets/register_logo.svg';
import { telekomEmailRegex } from '../../assets/regex.js';

const LoginForm = ({ setLogin }) => {
  const toast = useToast();

  const handleSubmit = async (values, actions) => {
    axios
      .post('https://telekomparking.website.tuke.sk/api/register', values, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': '*',
          'Access-Control-Allow-Headers': '*',
        },
      })
      .then((res) => {
        console.log(res);
        actions.setSubmitting(false);

        toast({
          title: 'Account created.',
          description: 'Redirecting to login...',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });

        setTimeout(() => {
          setLogin(1);
        }, 3000);
      });
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

  const validateEmail = (email) => {
    const found = email.match(telekomEmailRegex);

    console.log(found);

    if (!found) {
      return 'Invalid email';
    }
  };

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
            <Formik
              initialValues={{
                name: '',
                surname: '',
                mobileNumber: '',
                email: '',
                companyId: '',
              }}
              onSubmit={handleSubmit}
            >
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
                  <Field name='email'>
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
                  <Field name='companyId'>
                    {({ field, form }) => (
                      <FormControl
                        className='register-input'
                        isInvalid={form.errors.password && form.touched.password}
                      >
                        <Input {...field} placeholder='Personal ID' type='number' />
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
                      _hover={{ bgColor: '#C5006A' }}
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
