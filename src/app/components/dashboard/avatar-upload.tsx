"use client"

import type React from "react"
import { useCallback, useEffect, useState } from "react"
import { useDropzone } from "react-dropzone"
import { Avatar, Box, Button, Typography } from "@mui/material"
import { Snackbar, Alert } from "@mui/material"

export default function AvatarUpload({
                                         uid,
                                         url,
                                         size,
                                         onUpload,
                                     }: {
    uid: string
    url: string | null
    size: number
    onUpload: (url: string) => void
}) {
    // const supabase = useSupabaseClient()
    const [avatarUrl, setAvatarUrl] = useState<string | null>(null)
    const [uploading, setUploading] = useState(false)
    const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: "success" | "error" }>({
        open: false,
        message: "",
        severity: "success",
    })

    useEffect(() => {
        if (url) downloadImage(url)
    }, [url])

    async function downloadImage(url: string) {
        try {
            setAvatarUrl(url)
        } catch (error) {
            console.log("Error downloading image: ", error)
        }
    }

    const uploadAvatar = useCallback(
        async (file: File) => {
            try {
                setUploading(true)

                const fileExt = file.name.split(".").pop()
                const fileName = `${uid}.${fileExt}`
                const filePath = `${fileName}`

                onUpload(filePath)
                showSnackbar("Avatar updated successfully", "success")
            } catch (error) {
                showSnackbar("Error uploading avatar", "error")
                console.log(error);
            } finally {
                setUploading(false)
            }
        },
        [uid, onUpload],
    )

    const onDrop = useCallback(
        (acceptedFiles: File[]) => {
            if (acceptedFiles.length > 0) {
                uploadAvatar(acceptedFiles[0])
            }
        },
        [uploadAvatar],
    )

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: { "image/*": [] },
        multiple: false,
    })

    const showSnackbar = (message: string, severity: "success" | "error") => {
        setSnackbar({ open: true, message, severity })
    }

    const handleCloseSnackbar = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === "clickaway") {
            return
        }
        setSnackbar({ ...snackbar, open: false })
    }

    return (
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <Box {...getRootProps()} sx={{ cursor: "pointer" }}>
                <Avatar
                    src={avatarUrl ? avatarUrl : `https://ui-avatars.com/api/?name=${uid}&background=random`}
                    sx={{ width: size, height: size }}
                />
                <input {...getInputProps()} />
            </Box>
            <Box sx={{ mt: 2 }}>
                <Button variant="contained" disabled={uploading} {...getRootProps()}>
                    {uploading ? "Uploading ..." : "Upload new avatar"}
                </Button>
            </Box>
            {isDragActive && <Typography sx={{ mt: 2 }}>Drop the files here ...</Typography>}
            <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: "100%" }}>
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </Box>
    )
}

