import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import React from "react";
export const Navbar:React.FC<{}>=()=>{

    return <AppBar position="static">
        <Toolbar variant="dense" >
            <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
                <MenuIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" component="div">
            Advanced Todo List
            </Typography>
        </Toolbar>
    </AppBar>;
}
// appbar.tsx
export {};

// Your existing code for the appbar component goes her
