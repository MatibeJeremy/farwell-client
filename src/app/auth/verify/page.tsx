"use client"

import React, {useEffect} from "react"
import { Box, Container, Typography, TextField, Button, Paper, CircularProgress } from "@mui/material"
import { styled } from "@mui/system"
import {useAppDispatch, useAppSelector} from "@/store";
import {activateAccount} from "@/store/actions/auth";
import {useRouter} from "next/navigation";
import {setRegistrationSuccess} from "@/store/reducers/auth";

const StyledPaper = styled(Paper)(({ theme }) => ({
    marginTop: theme.spacing(8),
    padding: theme.spacing(4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
}))

export default function AccountVerification() {
    const isLoading = useAppSelector(
        state => state.auth.profileLoading
    );
    const router = useRouter();
    const dispatch = useAppDispatch();
    const token = useAppSelector(
        state => state.auth.verificationToken
    );

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        activateAccount(dispatch, token);
    }

    useEffect(() => {
        dispatch(setRegistrationSuccess(false));
    }, [dispatch]);


    return (
        <Container component="main" maxWidth="xs">
            <StyledPaper elevation={3}>
                <Typography component="h1" variant="h5">
                    Verify Your Account
                </Typography>
                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        disabled
                        fullWidth
                        id="verificationCode"
                        name="verificationCode"
                        autoFocus
                        value={token}
                    />
                    <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} disabled={isLoading}>
                        {isLoading ? <CircularProgress size={24} /> : "Verify Account"}
                    </Button>
                    <Typography
                        onClick={() => {
                            router.push("/auth/login")
                        }}
                        sx={{
                        cursor: "pointer",
                        color: "blue"
                    }}>
                        Log In
                    </Typography>
                </Box>
            </StyledPaper>
        </Container>
    )
}

