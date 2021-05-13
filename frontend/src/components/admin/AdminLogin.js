import React, { useReducer, useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Alert from "@material-ui/lab/Alert";
import axios from "axios";
import { withRouter } from "react-router-dom";

import AuthToken from "../../store/AuthToken";
import HomePage from "../../containers/HomePage";
import Footer from "../../containers/Footer";

const useStyles = makeStyles((theme) => ({
	paper: {
		marginTop: theme.spacing(8),
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main,
	},
	form: {
		width: "100%", // Fix IE 11 issue.
		marginTop: theme.spacing(1),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
}));

function AdminLogin(props) {
	const classes = useStyles();
	const [userInput, setUserInput] = useReducer(
		(state, newState) => ({ ...state, ...newState }),
		{
			username: "",
			password: "",
		}
	);

	const [authenticated, setAuthenticated] = useState(true);

	const onSubmit = (e) => {
		e.preventDefault();
		axios
			.post("http://localhost:8000/api/v1/user-login/", {
				username: userInput.username,
				password: userInput.password,
			})
			.then((res) => {
				if (res.data.status === 200) {
					setAuthenticated(true);
					AuthToken.setUserAuth({
						user_id: res.data.id,
						user_token: res.data.token,
						user_name: res.data.username,
					});
					props.history.push("/administrator/dashboard");
					window.location.reload(false);
				} else {
					setAuthenticated(false);
				}
			})
			.catch((error) => console.error(error));
	};

	const handleChange = (e) => {
		const name = e.target.name;
		const newValue = e.target.value;

		setUserInput({
			[name]: newValue,
		});
	};

	return (
		<>
			<HomePage>
				<Container component="main" maxWidth="xs">
					<CssBaseline />
					<div className={classes.paper}>
						{authenticated ? null : (
							<Alert variant="outlined" severity="error">
								Invalid credentials, try again!
							</Alert>
						)}
						<Avatar className={classes.avatar}>
							<LockOutlinedIcon />
						</Avatar>
						<Typography component="h1" variant="h5">
							Authorized Person
						</Typography>
						<form className={classes.form} noValidate>
							<TextField
								variant="outlined"
								margin="normal"
								required
								fullWidth
								id="username"
								label="Username"
								name="username"
								autoComplete="username"
								autoFocus
								value={userInput.username}
								onChange={handleChange}
							/>
							<TextField
								variant="outlined"
								margin="normal"
								required
								fullWidth
								name="password"
								label="Password"
								type="password"
								id="password"
								autoComplete="current-password"
								value={userInput.password}
								onChange={handleChange}
							/>
							<FormControlLabel
								control={<Checkbox value="remember" color="primary" />}
								label="Remember me"
							/>
							<Button
								type="submit"
								fullWidth
								variant="contained"
								color="primary"
								className={classes.submit}
								onClick={onSubmit}
							>
								Sign In
							</Button>
							<Grid container>
								<Grid item xs>
									<Link href="#" variant="body2">
										Forgot password?
									</Link>
								</Grid>
							</Grid>
						</form>
					</div>
				</Container>
			</HomePage>
			<Footer />
		</>
	);
}

export default withRouter(AdminLogin);
