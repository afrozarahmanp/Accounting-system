import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { FaRegWindowRestore, FaSignOutAlt } from "react-icons/fa";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { FaArrowsAlt } from "react-icons/fa";
import { Link, Outlet, useLocation } from "react-router-dom";
import Footer from "../Footer/Footer";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const Navbar = () => {
  const theme = useTheme();
  const location = useLocation();
  const [open, setOpen] = React.useState(false);
  const [showGroupButton, setShowGroupButton] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
    // Hide the "Group" button when closing the drawer
    setShowGroupButton(false);
  };

  const handleSettingsClick = () => {
    // Toggle the state to show/hide the "Group" button
    setShowGroupButton(!showGroupButton);
  };

  return (
    <div>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar
          position="fixed"
          open={open}
          sx={{
            backgroundImage: "linear-gradient(to right, #D7BDE2, #85C1E9)",
            // Adjust the gradient colors as needed
            zIndex: theme.zIndex.drawer + 1,
            transition: theme.transitions.create(["width", "margin"], {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.leavingScreen,
            }),
            ...(open && {
              marginLeft: drawerWidth,
              width: `calc(100% - ${drawerWidth}px)`,
              transition: theme.transitions.create(["width", "margin"], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
              }),
            }),
          }}
        >
          <Toolbar className="flex justify-between">
            <div>
              <IconButton
                color="black"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                sx={{ mr: 2, ...(open && { display: "none" }) }}
              >
                <MenuIcon />
              </IconButton>
            </div>
            <div>
              
              <Typography
                variant=""
                noWrap
                component="div"
                className="text-left"
              >
                <div className="navbar-end text-black">
                  <button className="btn btn-ghost ">
                    <Link to='/'><h2 className="text-base">Home</h2></Link>
                  </button>
                  <button className="btn btn-ghost ">
                    <h2 className="text-base">Accounts</h2>
                  </button>
                  <button className="btn btn-ghost ">
                    <div className="indicator flex items-center">
                      <FaSignOutAlt className="text-base" />
                      <span className="ml-2">
                        <h2 className="text-base">Logout</h2>
                      </span>
                    </div>
                  </button>
                  <button className="btn btn-ghost ">
                    <div className="indicator flex items-center">
                      <FaRegWindowRestore className="text-base"/>
                      <span className="ml-2 text-base"> Modules</span>
                    </div>
                  </button>
                </div>
              </Typography>
            </div>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <DrawerHeader>
            {open && (
              <div className="flex flex-col m-2">
                <div className="avatar mx-auto m-4">
                  <div className="w-16 rounded-full ">
                    <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                  </div>
                </div>
                <div>
                  <div className="">
                    <h2>OMNI Solutions</h2>
                  </div>
                </div>
              </div>
            )}
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === "rtl" ? (
                <ChevronRightIcon />
              ) : (
                <ChevronLeftIcon />
              )}
            </IconButton>
          </DrawerHeader>
          <Divider />

          <List>
            {["Settings"].map((text, index) => (
              <ListItem key={text} disablePadding sx={{ display: "block" }}>
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                  }}
                  onClick={handleSettingsClick}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                    }}
                  >
                    {index % 2 === 0 ? <FaArrowsAlt /> : <MailIcon />}
                  </ListItemIcon>
                  <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
                </ListItemButton>
              </ListItem>
            ))}
            {showGroupButton && (
              <ListItem disablePadding sx={{ display: "block" }}>
                <ListItemButton
                  component={Link}
                  to="/groupEntry"
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                  }}
                >
                  {/* No icon before the "Group" button */}
                  <ListItemText
                    primary="Group"
                    sx={{ opacity: open ? 1 : 0 }}
                  />
                </ListItemButton>
              </ListItem>
            )}
          </List>

          <Divider />
        </Drawer>
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <DrawerHeader />

          <Typography paragraph>
            {location.pathname === "/" && <img className="w-full" src='https://i.ibb.co/f9Z7r4k/Whats-App-Image-2023-11-29-at-23-00-37-52e90bdd.jpg'/>}
            <Outlet></Outlet>
            <Footer></Footer>
          </Typography>
        </Box>
      </Box>
    </div>
  );
};

export default Navbar;
