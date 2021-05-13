import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import EditIcon from "@material-ui/icons/Edit";
import Tooltip from "@material-ui/core/Tooltip";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import Title from "./Title";
import Footer from "../../containers/Footer";
import AdminDashboard from "../admin/AdminDashboard";
import { getDatas, setCreating, setSelectedData } from "../../store";
import { STUDENTS } from "../../store/dataTypes";

const useStyles = makeStyles((theme) => ({
	createButton: {
		margin: theme.spacing(2, 0, 4),
	},
}));

const mapStateToProps = (storeData) => ({
	students: storeData.modelData[STUDENTS],
});
const mapDispatchToProps = {
	getStudents: getDatas,
	createStudent: setCreating,
	setEditingData: setSelectedData,
};

function AdminStudentList(props) {
	useEffect(() => {
		props.getStudents("api/v1/students", STUDENTS);
	}, []);
	const classes = useStyles();

	const handleButtonClick = (flag, payload) => {
		props.setEditingData(payload);
		props.createStudent(flag);
		props.history.push("/administrator/students/editor");
	};
	return (
		<React.Fragment>
			<AdminDashboard>
				<Button
					variant="outlined"
					color="primary"
					className={classes.createButton}
					onClick={() => handleButtonClick(true, {})}
				>
					Create new student
				</Button>
				<Divider />
				<Title>Students</Title>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell>ID Number</TableCell>
							<TableCell>First Name</TableCell>
							<TableCell>Last Name</TableCell>
							<TableCell>Course</TableCell>
							<TableCell>Actions</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{props.students.map((student) => (
							<TableRow key={student.id}>
								<TableCell>{student.id}</TableCell>
								<TableCell>{student.first_name}</TableCell>
								<TableCell>{student.last_name}</TableCell>
								<TableCell>{student.course}</TableCell>
								<TableCell>
									<Tooltip title="EDIT">
										<IconButton
											color="primary"
											onClick={() => handleButtonClick(false, student)}
										>
											<EditIcon />
										</IconButton>
									</Tooltip>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</AdminDashboard>
			<Footer />
		</React.Fragment>
	);
}

export default withRouter(
	connect(mapStateToProps, mapDispatchToProps)(AdminStudentList)
);
