"use client"

import type React from "react"
import { useState } from "react"
import { styled } from "@mui/material/styles"
import {AppBar, Toolbar, IconButton, Typography, Box, Avatar} from "@mui/material"
import MenuIcon from "@mui/icons-material/Menu"
import Sidebar from "@/app/components/dashboard/sidebar";
import {useAppSelector} from "@/store";

const drawerWidth = 240

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })<{
    open?: boolean
}>(({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
        transition: theme.transitions.create("margin", {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    }),
}))

interface LayoutProps {
    children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    const [open, setOpen] = useState(true)
    const username = useAppSelector((state) => state.auth.user?.name);

    const handleDrawerOpen = () => {
        setOpen(true)
    }

    const stringAvatar = (name?: string) => {
        if (!name || name.trim().length === 0) {
            return { children: "U" };
        }

        const nameParts = name.trim().split(' ');

        return {
            children: nameParts.length > 1
                ? `${nameParts[0][0]}${nameParts[1][0]}`
                : nameParts[0][0],
        };
    };



    const handleDrawerClose = () => {
        setOpen(false)
    }

    return (
        <Box sx={{ display: "flex" }}>
            <AppBar
                position="fixed"
                sx={{
                    zIndex: (theme) => theme.zIndex.drawer + 1,
                    backgroundColor: "white",
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    paddingX: 2
                }}
            >
                <Toolbar sx={{ flexGrow: 1 }}>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{ mr: 2, ...(open && { display: "none" }) }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div" sx={{ color: "black" }}>
                        FarWell
                    </Typography>
                </Toolbar>

                {/* Push Avatar to the far right */}
                <Box sx={{ marginLeft: "auto", marginRight: 2 }}>
                    <Avatar {...stringAvatar(`${username}`)} />
                </Box>
            </AppBar>

            <Sidebar open={open} onClose={handleDrawerClose} />
            <Main open={open}>
                <Toolbar />
                {children}
            </Main>
        </Box>
    )
}

export default Layout

