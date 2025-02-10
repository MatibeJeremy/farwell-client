import type React from "react"
import { Drawer, List, ListItem, ListItemIcon, ListItemText, IconButton, useTheme, styled } from "@mui/material"
import {
    ChevronLeft as ChevronLeftIcon,
    ChevronRight as ChevronRightIcon,
    Dashboard as DashboardIcon,
    Person as PersonIcon,
    Settings as SettingsIcon,
    Help as HelpIcon,
} from "@mui/icons-material"
import {LogOutUser} from "@/store/actions/auth";
import {useAppDispatch} from "@/store";

const drawerWidth = 240

const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
}))

interface SidebarProps {
    open: boolean
    onClose: () => void
}

const Sidebar: React.FC<SidebarProps> = () => {
    const theme = useTheme()
    const dispatch = useAppDispatch()

    const menuItems = [
        { text: "Dashboard", icon: <DashboardIcon />, path: "/dashboard" },
        // { text: "Campaigns", icon: <PersonIcon />, path: "dashboard/campaigns" },
        { text: "Settings", icon: <SettingsIcon />, path: "/dashboard/settings" },
        { text: "Logout", icon: <HelpIcon />, path: "/" },
    ]

    return (
        <Drawer
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                "& .MuiDrawer-paper": {
                    width: drawerWidth,
                    boxSizing: "border-box",
                },
            }}
            variant="persistent"
            anchor="left"
            open={true}
        >
            <DrawerHeader>
                <IconButton>
                    {theme.direction === "ltr" ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                </IconButton>
            </DrawerHeader>
            <List>
                {menuItems.map((item) => (
                    <ListItem key={item.text} component="a" href={item.path}  sx={{
                        pointer: "cursor",
                    }}
                    onClick={() => {
                        if(item.text === "Logout") {
                            LogOutUser(dispatch)
                        }
                    }}
                    >
                        <ListItemIcon>{item.icon}</ListItemIcon>
                        <ListItemText primary={item.text} />
                    </ListItem>
                ))}
            </List>
        </Drawer>
    )
}

export default Sidebar

