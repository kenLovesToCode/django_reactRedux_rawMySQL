import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import DashboardIcon from '@material-ui/icons/Dashboard';
import AssignmentIcon from '@material-ui/icons/Assignment';
import AssignmentRoundedIcon from '@material-ui/icons/AssignmentRounded';
import AccountCircleRoundedIcon from '@material-ui/icons/AccountCircleRounded';
import DvrRoundedIcon from '@material-ui/icons/DvrRounded';
import HomeWorkRoundedIcon from '@material-ui/icons/HomeWorkRounded';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import { NavLink } from "react-router-dom";

export const mainListItems = (
  <div>
    <ListItem button component={NavLink} to="/administrator/dashboard">
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItem >
    <ListItem button component={NavLink} to="/administrator/attendances">
      <ListItemIcon>
        <AssignmentRoundedIcon />
      </ListItemIcon>
      <ListItemText primary="Attendances" />
    </ListItem>
    <ListItem button component={NavLink} to="/administrator/students">
      <ListItemIcon>
        <AccountCircleRoundedIcon />
      </ListItemIcon>
      <ListItemText primary="Students" />
    </ListItem>
    <ListItem button component={NavLink} to="/administrator/purposes">
      <ListItemIcon>
        <DvrRoundedIcon />
      </ListItemIcon>
      <ListItemText primary="Purposes" />
    </ListItem>
    <ListItem button component={NavLink} to="/administrator/courses">
      <ListItemIcon>
        <MenuBookIcon />
      </ListItemIcon>
      <ListItemText primary="Courses" />
    </ListItem>
    <ListItem button component={NavLink} to="/administrator/departments">
      <ListItemIcon>
        <HomeWorkRoundedIcon />
      </ListItemIcon>
      <ListItemText primary="Departments" />
    </ListItem>
  </div>
);

export const secondaryListItems = (
  <div>
    <ListSubheader inset>Saved reports</ListSubheader>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Current month" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Last quarter" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Year-end sale" />
    </ListItem>
  </div>
);