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
import {useAppSelector} from "@/store";

export function ProfilePage() {
    const user = useAppSelector(
        state => state.auth.user
    );
    const router = useRouter()

    const [loading, setLoading] = useState(true)
    const [username, setUsername] = useState<string | null>(null)
    const [website, setWebsite] = useState<string | null>(null)
    const [avatarUrl, setAvatarUrl] = useState<string | null>(null)
    const [tabValue, setTabValue] = useState(0)
    const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: "success" | "error" }>({
        open: false,
        message: "",
        severity: "success",
    })

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

    async function updateProfile({
                                     username,
                                     website,
                                     avatar_url,
                                 }: {
        username: string | null
        website: string | null
        avatar_url: string | null
    }) {
        try {
            setLoading(true)
            if (!user) throw new Error("No user")

            const updates = {
                // id: user.id,
                username,
                avatar_url,
                updated_at: new Date().toISOString(),
            }

            // const { error } = await supabase.from("profiles").upsert(updates)
            // if (error) throw error
            showSnackbar("Profile updated successfully", "success")
        } catch (error) {
            showSnackbar("Error updating the data!", "error")
        } finally {
            setLoading(false)
        }
    }

    async function updatePassword(newPassword: string) {
        try {
            setLoading(true)
            // const { error } = await supabase.auth.updateUser({ password: newPassword })
            // if (error) throw error
            showSnackbar("Password updated successfully", "success")
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
                                    updateProfile({ username, website, avatar_url: avatarUrl })
                                }}
                            >
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <TextField
                                            fullWidth
                                            label="Username"
                                            value={username || user?.name}
                                            onChange={(e) => setUsername(e.target.value)}
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
                                uid={user?.id}
                                url={user?.profile_picture}
                                size={150}
                                onUpload={(url) => {
                                    setAvatarUrl(url)
                                    updateProfile({ username, website, avatar_url: url })
                                }}/>
                        )}
                        {tabValue === 2 && (
                            <form
                                onSubmit={(e) => {
                                    e.preventDefault()
                                    const form = e.target as HTMLFormElement
                                    const newPassword = form.newPassword.value
                                    updatePassword(newPassword)
                                    form.reset()
                                }}
                            >
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <TextField fullWidth label="New Password" type="password" id="newPassword" required />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Button type="submit" variant="contained" disabled={loading}>
                                            {loading ? "Updating ..." : "Update password"}
                                        </Button>
                                    </Grid>
                                </Grid>
                            </form>
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

