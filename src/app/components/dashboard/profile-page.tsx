"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import {
    Box,
    Button,
    Card,
    CardContent,
    CardHeader,
    Container,
    Grid,
    Snackbar,
    Tab,
    Tabs,
    TextField,
} from "@mui/material"
import { Alert } from "@mui/material"
import AvatarUpload from "./avatar-upload"
import {useAppDispatch, useAppSelector} from "@/store";
import { updatePasswordAction, updateProfileAction} from "@/store/actions/auth";

export function ProfilePage() {
    const user = useAppSelector(
        state => state.auth.user
    );
    const [loading, setLoading] = useState(true)
    const [username, setUsername] = useState<string | null>(null)
    const [currentPassword, setCurrentPassword] = useState<string | null>(null)
    const [newPassword, setNewPassword] = useState<string | null>(null)
    const [newPasswordConfirmation, setNewPasswordConfirmation] = useState<string | null>(null)
    const [email, setEmail] = useState<string | null>(null)
    const [setAvatarUrl] = useState<string | null>(null)
    const [tabValue, setTabValue] = useState(0)
    const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: "success" | "error" }>({
        open: false,
        message: "",
        severity: "success",
    })
    const dispatch = useAppDispatch();

    useEffect(() => {
        getProfile()
    }, [])

    async function getProfile() {
        try {
            setLoading(true)
            if (!user) throw new Error("No user")

        } catch (error) {
            showSnackbar("Error loading user data", "error")
        } finally {
            setLoading(false)
        }
    }

     const updateProfile = async (
         username: string | null,
         email: string | null) => {
        try {
            setLoading(true)
            if (!user) throw new Error("No user")
            console.log(username,email);

            const payload = {
                email : email || user.email,
                name: username || user.name
            }
            updateProfileAction(dispatch, payload);
        } catch (error) {
            showSnackbar("Error updating the data!", "error")
        } finally {
            setLoading(false)
        }
    }

    async function updatePassword() {
        try {
            setLoading(true)
            // showSnackbar("Password updated successfully", "success")
            const payload = {
                    current_password: currentPassword,
                    new_password:newPassword,
                    new_password_confirmation: newPasswordConfirmation
            }
            updatePasswordAction( payload);
        } catch (error) {
            showSnackbar("Error updating password", "error")
        } finally {
            setLoading(false)
        }
    }

    const showSnackbar = (message: string, severity: "success" | "error") => {
        setSnackbar({ open: true, message, severity })
    }

    const handleCloseSnackbar = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === "clickaway") {
            return
        }
        setSnackbar({ ...snackbar, open: false })
    }

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setTabValue(newValue)
    }

    return (
        <Container maxWidth="md" sx={{ py: 4 }}>
            <Card>
                <CardHeader title="Profile" subheader="Manage your profile information and settings" />
                <CardContent>
                    <Tabs value={tabValue} onChange={handleTabChange} centered>
                        <Tab label="Profile" />
                        <Tab label="Avatar" />
                        <Tab label="Password" />
                    </Tabs>
                    <Box sx={{ mt: 2 }}>
                        {tabValue === 0 && (
                            <form
                                onSubmit={(e) => {
                                    e.preventDefault()
                                    updateProfile(username, email);
                                }}
                            >
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <TextField
                                            fullWidth
                                            label="Username"
                                            value={username == "" ? user?.name: username}
                                            onChange={(e) => setUsername(e.target.value)}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            fullWidth
                                            label="Email"
                                            value={email == "" ?  user?.email : email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Button type="submit" variant="contained" disabled={loading}>
                                            {loading ? "Saving ..." : "Save profile"}
                                        </Button>
                                    </Grid>
                                </Grid>
                            </form>
                        )}
                        {tabValue === 1 && (
                            <AvatarUpload
                                // @ts-expect-error: Expected type error due to potential undefined value
                                uid={user?.id}
                                // @ts-expect-error: Expected type error due to potential undefined value
                                url={user?.profile_picture}
                                size={150}
                                onUpload={(url) => {
                                    // @ts-expect-error: Expected type error due to potential undefined value
                                    setAvatarUrl(url)
                                }}/>
                        )}
                        {tabValue === 2 && (
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                        value={currentPassword}
                                        onChange={(e) => setCurrentPassword(e.target.value)}
                                        fullWidth
                                        label="Current Password"
                                        type="password"
                                        id="current_password"
                                        required
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                        fullWidth
                                        label="New Password"
                                        type="password"
                                        id="new_password"
                                        required
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        value={newPasswordConfirmation}
                                        onChange={(e) => setNewPasswordConfirmation(e.target.value)}
                                        fullWidth
                                        label="New Password Confirmation"
                                        type="password"
                                        id="new_password_confirmation"
                                        required
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        disabled={loading}
                                        onClick={() => {
                                            updatePassword();
                                        }}
                                    >
                                        {loading ? "Updating ..." : "Update password"}
                                    </Button>
                                </Grid>
                            </Grid>
                        )}
                    </Box>
                </CardContent>
            </Card>
            <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: "100%" }}>
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </Container>
    )
}

