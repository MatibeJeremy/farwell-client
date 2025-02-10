'use client';

import React, { useState, useEffect } from 'react';
import {
  TextField,
  Button,
  Box,
  Typography,
  Container,
  Divider,
  CircularProgress,
} from '@mui/material';
import { useAppDispatch, useAppSelector } from '@/store';
import { Google, LinkedIn } from '@mui/icons-material';
import { useRouter } from 'next/navigation';
import { LoginUser } from '@/store/actions/auth';
import {clearAuth, setLoginLoading} from '@/store/reducers/auth';

export const UserLoginForm = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const loginLoading = useAppSelector((state) => state.auth.loginLoading);
  const loginSuccess = useAppSelector((state) => state.auth.loginSuccess);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState<Partial<typeof formData>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<typeof formData> = {};

    if (!formData.email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email';

    if (!formData.password) newErrors.password = 'Password is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      LoginUser(dispatch, formData);
    }
  };

  useEffect(() => {
    if (loginSuccess) {
      router.push('/dashboard');
    }
  }, [loginSuccess]);

  useEffect(() => {
    dispatch(setLoginLoading(false));
  }, []);

  return (
    <Container
      maxWidth="sm"
      sx={{
        background: 'white',
        borderRadius: '20px',
        width: '40%',
      }}
    >
      <Box sx={{ mt: '15%', mb: 4, padding: '20px', textAlign: 'center' }}>
        <Typography sx={{ color: 'black', fontSize: '24px', fontWeight: 'bold' }}>Login</Typography>
        <Typography>
          <Typography>Don&#39;t have an account? </Typography>
          <Typography
            component="span"
            onClick={() => {
              router.push('/');
              dispatch(clearAuth())
            }}
            sx={{
              color: 'blue',
              cursor: 'pointer',
            }}
          >
            Register
          </Typography>
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            margin="normal"
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            error={!!errors.email}
            helperText={errors.email}
            required
          />
          <TextField
            fullWidth
            margin="normal"
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            error={!!errors.password}
            helperText={errors.password}
            required
          />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ mt: 3, mb: 2, backgroundColor: '#2c003e', textTransform: 'none' }}
          >
            {loginLoading ? <CircularProgress size={24} /> : 'Login'}
          </Button>
        </form>

        <Divider sx={{ my: 2 }}>OR</Divider>

        <Button
          fullWidth
          variant="outlined"
          startIcon={<Google />}
          sx={{
            mb: 2,
            color: '#4285F4',
            borderColor: '#4285F4',
            '&:hover': {
              backgroundColor: '#4285F410',
            },
          }}
        >
          Sign in with Google
        </Button>

        <Button
          fullWidth
          variant="outlined"
          startIcon={<LinkedIn />}
          sx={{
            color: '#0077B5',
            borderColor: '#0077B5',
            '&:hover': {
              backgroundColor: '#0077B510',
            },
          }}
        >
          Sign in with LinkedIn
        </Button>
      </Box>
    </Container>
  );
};
