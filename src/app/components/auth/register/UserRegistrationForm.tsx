"use client"

import React, {useEffect} from "react"
import { useState } from "react"
import {
    TextField,
    Button,
    Box,
    Typography,
    Container, Divider, CircularProgress,
} from "@mui/material"
import {useAppDispatch, useAppSelector} from "@/store";
import {Google, LinkedIn} from "@mui/icons-material";
import {RegisterUser} from "@/store/actions/auth";
import {useRouter} from "next/navigation";
import {UserFormData} from "@/app/components/interfaces";
import {toast} from "react-toastify";
import {setRegistrationLoading} from "@/store/reducers/auth";

export const UserRegistrationForm = () => {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const registrationLoading = useAppSelector(
        state => state.auth.registerLoading
    );
    const registrationSuccess = useAppSelector(
        (state) => state.auth.registrationSuccess
    );

    const [formData, setFormData] = useState<UserFormData>({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    });

    const [errors, setErrors] = useState<Partial<UserFormData>>({})

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }))
    }

    const validateForm = (): boolean => {
        const newErrors: Partial<UserFormData> = {}

        if (!formData.name) newErrors.name = "Name is required"
        if (!formData.email) newErrors.email = "Email is required"
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email is invalid"
        if (!formData.password) newErrors.password = "Password is required"
        if (formData.password !== formData.password_confirmation) {
             newErrors.password_confirmation = "Passwords do not match"
        }
        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (validateForm()) {
            RegisterUser(dispatch, formData);
        }
    }

    useEffect(() => {
        if(registrationSuccess){
            router.push('/auth/verify');
            setFormData({
                name: "",
                email: "",
                password: "",
                password_confirmation: "",
            });
        }
    },[registrationSuccess])

    return (
        <Container maxWidth="sm" sx={{
            background: "white",
            borderRadius: "20px",
            width: "40%",
            margin: "auto"
        }}>
            <Box sx={{ margin: "auto", mb: 4, padding: "20px", justifyContent: "center" }}>
                <Typography sx={{
                    color: "black",
                    fontFamily: "Roboto",
                    display: "flex",
                    fontSize: "24px",
                }}>
                    User Registration
                </Typography>
                <Typography sx={{
                    color: "black",
                    fontFamily: "Roboto",
                    display: "flex",
                }}>
                   If you already have an account,
                </Typography>
                <Typography
                    onClick={() => {
                        router.push("/auth/login");
                    }}
                    sx={{
                    color: "blue",
                    fontFamily: "Roboto",
                    display: "flex",
                    cursor: "pointer",
                    width: "15%"
                }}>
                    Log In
                </Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        error={!!errors.name}
                        helperText={errors.name}
                    />
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
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Confirm Password"
                        name="password_confirmation"
                        type="password"
                        value={formData.password_confirmation}
                        onChange={handleChange}
                        error={!!errors.password_confirmation}
                        helperText={errors.password_confirmation}
                    />
                   <Button type="submit" variant="contained" fullWidth sx={{ mt: 3, mb: 2, backgroundColor: "#2c003e", textTransform: "none" }}>
                       {registrationLoading ? <CircularProgress size={24}/> :  "Register"}
                    </Button>
                </form>

                <Divider sx={{ my: 2 }}>OR</Divider>

                <Button
                    fullWidth
                    variant="outlined"
                    startIcon={<Google />}
                    sx={{
                        mb: 2,
                        color: "#4285F4",
                        borderColor: "#4285F4",
                        "&:hover": {
                            backgroundColor: "#4285F410",
                            borderColor: "#4285F4",
                        },
                    }}
                >
                    Continue with Google
                </Button>

                <Button
                    fullWidth
                    variant="outlined"
                    startIcon={<LinkedIn />}
                    sx={{
                        color: "#0077B5",
                        borderColor: "#0077B5",
                        "&:hover": {
                            backgroundColor: "#0077B510",
                            borderColor: "#0077B5",
                        },
                    }}
                >
                    Continue with LinkedIn
                </Button>
            </Box>
        </Container>
    )
}

