import React, { useState, useEffect } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import SupervisorAccountRoundedIcon from "@material-ui/icons/SupervisorAccountRounded";
import AssignmentIndIcon from "@material-ui/icons/AssignmentInd";
import ExitToAppRoundedIcon from "@material-ui/icons/ExitToAppRounded";
import HomeRoundedIcon from "@material-ui/icons/HomeRounded";
import { NavLink, withRouter } from "react-router-dom";

import Footer from "./Footer";
import AuthToken from "../store/AuthToken";

const useStyles = makeStyles((theme) => ({
	root: {
		position: "fixed",
		bottom: theme.spacing(2),
		right: theme.spacing(2),
	},
	centerSpace: {
		flexGrow: 1,
	},
	button: {
		margin: theme.spacing(1),
	},
	paper: {
		paddingBottom: theme.spacing(5),
	},
}));

function HomePage(props) {
	const classes = useStyles();
	const [isAuth, setIsAuth] = useState(false);
	useEffect(() => {
		AuthToken.getToken() === undefined ? setIsAuth(false) : setIsAuth(true);
	}, [isAuth]);
	const logout = () => {
		AuthToken.logout();
		props.history.push("/administrator");
		window.location.reload(false);
	};

	return (
		<React.Fragment>
			<AppBar>
				<Toolbar>
					<Button component={NavLink} color="inherit" to="/" variant="h6">
						Student Logsheet
					</Button>
					<div className={classes.centerSpace}></div>
					<div>
						<Button
							component={NavLink}
							to="/"
							className={classes.button}
							color="inherit"
							startIcon={<HomeRoundedIcon />}
						>
							Home
						</Button>
						<Button
							component={NavLink}
							to="/student"
							className={classes.button}
							color="inherit"
							startIcon={<AssignmentIndIcon />}
						>
							Student Login
						</Button>
						{isAuth ? (
							<>
								<Button
									className={classes.button}
									component={NavLink}
									to="/administrator/dashboard"
									color="inherit"
									startIcon={<SupervisorAccountRoundedIcon />}
								>
									Admin
								</Button>
								<Button
									className={classes.button}
									color="inherit"
									startIcon={<ExitToAppRoundedIcon />}
									onClick={logout}
								>
									Logout
								</Button>
							</>
						) : (
							<Button
								className={classes.button}
								color="inherit"
								startIcon={<SupervisorAccountRoundedIcon />}
							>
								Admin Login
							</Button>
						)}
					</div>
				</Toolbar>
			</AppBar>
			<Toolbar id="back-to-top-anchor" />
			{props.children}
			<Footer />
		</React.Fragment>
	);
}

export default withRouter(HomePage);
