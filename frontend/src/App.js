import React, { useEffect } from "react";
import HomePage from "./containers/HomePage";
import {
	BrowserRouter as Router,
	Route,
	Switch,
	Redirect,
} from "react-router-dom";
import { Provider } from "react-redux";

import AdminDashboardContent from "./components/admin/AdminDashboardContent";
import AdminLogin from "./components/admin/AdminLogin";
import StudentLogin from "./components/student/StudentLogin";
import StudentPurpose from "./components/student/StudentPurpose";
import AdminAttendanceList from "./components/admin/AdminAttendanceList";
import AdminStudentList from "./components/admin/AdminStudentList";
import AdminPurposeList from "./components/admin/AdminPurposeList";
import AdminCourseList from "./components/admin/AdminCourseList";
import AdminDepartmentList from "./components/admin/AdminDepartmentList";
import StudentEditor from "./components/admin/StudentEditor";
import PurposeEditor from "./components/admin/PurposeEditor";
import CourseEditor from "./components/admin/CourseEditor";
import DepartmentEditor from "./components/admin/DepartmentEditor";
import Home from "./components/home/Home";

import AuthToken from "./store/AuthToken";
import dataStore from "./store";

function App() {
	return (
		<Provider store={dataStore}>
			<Router>
				<Switch>
					{AuthToken.getToken() !== undefined ? "" : <AdminLogin />}
					<Route exact path="/" render={() => <Home />} />
					<Route exact path="/administrator" render={() => <AdminLogin />} />
					<Route
						path="/administrator/dashboard"
						render={() => <AdminDashboardContent />}
					/>
					<Route
						path="/administrator/attendances"
						render={() => <AdminAttendanceList />}
					/>
					<Route
						exact
						path="/administrator/students"
						render={() => <AdminStudentList />}
					/>
					<Route
						path="/administrator/students/editor"
						render={() => <StudentEditor />}
					/>
					<Route
						exact
						path="/administrator/courses"
						render={() => <AdminCourseList />}
					/>
					<Route
						path="/administrator/courses/editor"
						render={() => <CourseEditor />}
					/>
					<Route
						exact
						path="/administrator/departments"
						render={() => <AdminDepartmentList />}
					/>
					<Route
						path="/administrator/departments/editor"
						render={() => <DepartmentEditor />}
					/>
					<Route
						exact
						path="/administrator/purposes"
						render={() => <AdminPurposeList />}
					/>
					<Route
						path="/administrator/purposes/editor"
						render={() => <PurposeEditor />}
					/>
					<Route exact path="/student" render={() => <StudentLogin />} />
					<Route path="/student/purpose" render={() => <StudentPurpose />} />
				</Switch>
			</Router>
		</Provider>
	);
}

export default App;
