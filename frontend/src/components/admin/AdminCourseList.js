import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import Tooltip from "@material-ui/core/Tooltip";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import Title from "./Title";
import Footer from "../../containers/Footer";
import AdminDashboard from "../admin/AdminDashboard";
import { getDatas, setSelectedData, setCreating } from "../../store";
import { COURSES } from "../../store/dataTypes";
const useStyles = makeStyles((theme) => ({
	createButton: {
		margin: theme.spacing(2, 0, 4),
	},
}));

const mapStateToProps = (storeData) => ({
	courses: storeData.modelData[COURSES],
});
const mapDispatchToProps = {
	getCourses: getDatas,
	setEditingCourse: setSelectedData,
	createCourse: setCreating,
};

function AdminPurposeList(props) {
	useEffect(() => {
		props.getCourses("api/v1/courses", COURSES);
	}, []);
	const classes = useStyles();
	const [open, setOpen] = useState(false);

	const handleButtonClick = (flag, payload) => {
		props.setEditingCourse(payload);
		props.createCourse(flag);
		props.history.push("/administrator/courses/editor");
	};

	const handleClose = () => {
		setOpen(false);
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
					Create new course
				</Button>
				<Divider />
				<Title>Courses</Title>
				<Table size="small">
					<TableHead>
						<TableRow>
							<TableCell>Course</TableCell>
							<TableCell>Department</TableCell>
							<TableCell>Actions</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{props.courses.map((course) => (
							<TableRow key={course.id}>
								<TableCell>{course.course_title}</TableCell>
								<TableCell>{course.department_title}</TableCell>
								<TableCell>
									<Tooltip title="EDIT">
										<IconButton
											color="primary"
											onClick={() => handleButtonClick(false, course)}
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
	connect(mapStateToProps, mapDispatchToProps)(AdminPurposeList)
);
