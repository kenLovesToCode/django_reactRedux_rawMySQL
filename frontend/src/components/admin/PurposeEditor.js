import React, { useEffect, useState, useReducer } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Button from "@material-ui/core/Button";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { PURPOSES } from "../../store/dataTypes";
import { insertData, updateData } from "../../store";

const useStyles = makeStyles((theme) => ({
	form: {
		width: "100%",
		marginTop: theme.spacing(1),
	},
	paper: {
		marginTop: theme.spacing(5),
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
	},
	select: {
		margin: theme.spacing(4, 0, 4),
	},
	formControl: {
		margin: theme.spacing(2, 0, 3),
		minWidth: 390,
	},
	button: {
		margin: theme.spacing(1),
		minWidth: 180,
	},
}));

const mapStateToProps = (storeData) => ({
	purposes: storeData.modelData[PURPOSES],
	isCreating: storeData.stateData.isCreating,
	purpose: storeData.stateData.selectedData,
});

const mapDispatchToProps = {
	insertPurpose: insertData,
	updatePurpose: updateData,
};
function PurposeEditor(props) {
	const classes = useStyles();
	const [userInput, setUserInput] = useReducer(
		(state, newState) => ({ ...state, ...newState }),
		{
			id: 1,
			title: props.purpose.title || "",
			description: props.purpose.description || "",
		}
	);

	const handleCancel = () => {
		props.history.push("/administrator/purposes");
	};

	const handleSubmit = () => {
		if (props.isCreating) {
			props.insertPurpose("api/v1/purposes", PURPOSES, userInput);
			props.history.push("/administrator/purposes");
		} else {
			props.updatePurpose(
				`api/v1/purposes/${props.purpose.id}`,
				PURPOSES,
				{ ...userInput, id: props.purpose.id },
				props.purpose.id
			);
			props.history.push("/administrator/purposes");
		}
	};

	const handleChange = (e) => {
		const name = e.target.name;
		const newValue = e.target.value;
		setUserInput({
			[name]: newValue,
		});
	};
	return (
		<Container maxWidth="xs">
			<div className={classes.paper}>
				{props.isCreating ? (
					<Typography variant="h4">Create new purpose</Typography>
				) : (
					<Typography variant="h4">Update purpose details</Typography>
				)}
				<form className={classes.form} noValidate>
					<TextField
						variant="outlined"
						margin="normal"
						required
						fullWidth
						label="Title"
						name="title"
						value={userInput.title}
						onChange={handleChange}
						autoFocus
					/>
					<TextField
						variant="outlined"
						margin="normal"
						required
						fullWidth
						label="Description"
						name="description"
						value={userInput.description}
						onChange={handleChange}
					/>
					<Button
						className={classes.button}
						onClick={handleSubmit}
						variant="outlined"
						color="primary"
					>
						Submit
					</Button>
					<Button
						className={classes.button}
						variant="outlined"
						color="secondary"
						onClick={handleCancel}
					>
						Cancel
					</Button>
				</form>
			</div>
		</Container>
	);
}

export default withRouter(
	connect(mapStateToProps, mapDispatchToProps)(PurposeEditor)
);
