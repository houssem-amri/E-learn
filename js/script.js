// function signup
function userSignup() {
	var userName = document.getElementById('userName').value;
	var verifUserName = userName.length < 8;
	displayError(verifUserName, 'errorUserName', 'your name should have at least 8 characters');
	var userAddressEmail = document.getElementById('userAddressEmail').value;
	var verifUserAddressEmail = validateEmail(userAddressEmail);
	displayError(!verifUserAddressEmail, 'errorUserAddressEmail', 'Invalid Email');
	var userPassword = document.getElementById('userPassword').value;
	var verifUserPassword = userPassword < 8;
	displayError(verifUserPassword, 'errorUserPassword', 'password should have at Most 8 characters');
	var userPhoneNumber = document.getElementById('userPhoneNumber').value;
	var verifUserPhoneNumber = validateNumber(userPhoneNumber);
	displayError(!verifUserPhoneNumber, 'errorUserPhoneNumber', 'phone number should have at least 8 Number');
	var userSchoolName = document.getElementById('userSchoolName').value;
	var verifUserSchoolName = userSchoolName.length < 8;
	displayError(verifUserSchoolName, 'errorUserSchoolName', 'school name should have at least 8 characters');
	if (!verifUserName && verifUserAddressEmail && !verifUserPassword && verifUserPhoneNumber && !verifUserSchoolName) {
		var parentId = JSON.parse(localStorage.getItem('parentId') || '1');
		var parent = {
			id: Number(parentId),
			parentName: userName,
			parentAddressEmail: userAddressEmail,
			parentPassword: userPassword,
			parentPhoneNumber: userPhoneNumber,
			schoolName: userSchoolName
		};
		var T = JSON.parse(localStorage.getItem('parents') || '[]');
		T.push(parent);
		localStorage.setItem('parents', JSON.stringify(T));
		localStorage.setItem('parentId', Number(parentId) + 1);
	}
}
// sign up admin
function AdminSignup() {
	var adminName = document.getElementById('adminName').value;
	var verifAdminName = adminName.length < 8;
	displayError(verifAdminName, 'errorAdminName', 'your name should have at least 8 characters');
	var adminPassword = document.getElementById('adminPassword').value;
	var verifAdminPassword = adminPassword.length < 8;
	displayError(verifAdminPassword, 'errorAdminPassword', 'password should have at Most 8 characters');
	var adminEmail = document.getElementById('adminEmail').value;
	var verifAdminEmail = validateEmail(adminEmail);
	displayError(!verifAdminEmail, 'errorAdminEmail', 'Invalid Email');
	var adminSchoolName = document.getElementById('adminSchoolName').value;
	var verifAdminSchoolName = adminSchoolName.length < 5;
	displayError(verifAdminSchoolName, 'errorAdminSchoolName', 'your school name should have at least 5 characters');
	if (!verifAdminName && !verifAdminPassword && verifAdminEmail && !verifAdminSchoolName) {
		var adminId = JSON.parse(localStorage.getItem('adminId') || '1');
		var admin = {
			id: Number(adminId),
			adminName: adminName,
			adminAddressEmail: adminEmail,
			adminPassword: adminPassword,
			schoolName: adminSchoolName
		};
		var T = JSON.parse(localStorage.getItem('admins') || '[]');
		T.push(admin);
		localStorage.setItem('admins', JSON.stringify(T));
		localStorage.setItem('adminId', Number(adminId) + 1);
	}
}
// function msg error
function displayError(condition, idError, msg) {
	if (condition) {
		document.getElementById(idError).innerHTML = msg;
		document.getElementById(idError).style.color = 'red';
	} else {
		document.getElementById(idError).innerHTML = '';
	}
}
// function validate email
function validateEmail(email) {
	const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(String(email).toLowerCase());
}
// function validate number
function validateNumber(str) {
	if (typeof str != 'string') return false;
	return !isNaN(str) && !isNaN(parseFloat(str));
}

function searchParentByEmailAndPwd(email, pwd) {
	var users = JSON.parse(localStorage.getItem('parents') || []);
	var findedUser;
	for (let i = 0; i < users.length; i++) {
		if (users[i].parentAddressEmail == email && users[i].parentPassword == pwd) {
			findedUser = users[i];
		}
	}
	return findedUser;
}
function searchAdminByEmailAndPwd(email, pwd) {
	var admins = JSON.parse(localStorage.getItem('admins') || []);
	var findedUser;
	for (let i = 0; i < admins.length; i++) {
		if (admins[i].adminAddressEmail == email && admins[i].adminPassword == pwd) {
			findedUser = admins[i];
		}
	}
	return findedUser;
}
function searchStudentAndTeacherByEmailAndPwd(email, pwd, id) {
	var students = JSON.parse(localStorage.getItem(id) || []);
	var findedUser;
	for (let i = 0; i < students.length; i++) {
		if (students[i].matricul == email && students[i].password == pwd) {
			findedUser = students[i];
		}
	}
	return findedUser;
}
function validateLogin() {
	var email = document.getElementById('loginEmail').value;
	var verifEmail = validateEmail(email);
	displayError(!verifEmail, 'errorInvalidEmail', 'Invalid Email');
	var pwd = document.getElementById('loginPassword').value;
	var parent = searchParentByEmailAndPwd(email, pwd);
	var admin = searchAdminByEmailAndPwd(email, pwd);
	var student = searchStudentAndTeacherByEmailAndPwd(email, pwd, 'students');
	var teacher = searchStudentAndTeacherByEmailAndPwd(email, pwd, 'teachers');
	if (parent) {
		localStorage.setItem('connectedParentId', parent.id);
		location.replace('parent-space.html');
	}
	if (student) {
		localStorage.setItem('connectedStudentId', student.id);
		location.replace('study-space.html');
	}
	if (teacher) {
		localStorage.setItem('connectedteacherId', teacher.id);
		location.replace('teacher-space.html');
	}
	if (admin) {
		localStorage.setItem('connectedAdminId', admin.id);
		location.replace('admin-space.html');
	} else {
		document.getElementById('errorLogin').innerHTML =
			'email address and password you entered do not match those in our files. Please check and try again';
		document.getElementById('errorLogin').style.color = 'red';
	}
}

function payment() {
	var numberCard = document.getElementById('numberCard').value;
	var verifNumberCard = validateNumber(numberCard);
	displayError(!verifNumberCard, 'errorNumberCard', 'your card Number should have equal 12 number');
	var codeCard = document.getElementById('codeCard').value;
	var verifCodeCardNumber = validateNumber(codeCard);
	displayError(!verifCodeCardNumber, 'errorCodeCard', 'your code card  should be a Number');
	var expiredCardMonth = document.getElementById('expiredCardMonth').value;
	var verifExpiredMonth = validateSelect('expiredCardMonth');
	displayError(verifExpiredMonth, 'errorExpiredCardMonth', 'select your Expired Card Month ');
	var expiredCardYear = document.getElementById('expiredCardYear').value;
	var verifExpiredYear = validateSelect('expiredCardYear');
	displayError(verifExpiredYear, 'errorExpiredCardYear', 'select your Expired Card year');
	if (verifNumberCard && verifCodeCardNumber && !verifExpiredMonth && !verifExpiredYear) {
		location.replace('child-form.html');
	}
}
function addStudent() {
	var childFirstName = document.getElementById('childFirstName').value;
	var verifChildFirstName = childFirstName.length < 4;
	displayError(verifChildFirstName, 'errorChildFirstName', 'your child first name should have at least 4 characters');
	var childLastName = document.getElementById('childLastName').value;
	var verifChildLastName = childLastName < 4;
	displayError(verifChildLastName, 'errorChildLastName', 'your child last name should have at least 4 characters');
	var childAge = document.getElementById('childAge').value;
	var verifChildAgeNumber = validateNumber(childAge);
	displayError(!verifChildAgeNumber, 'errorChildAge', 'your child age  should be a number');
	var childSchoolName = document.getElementById('childSchoolName').value;
	var verifChildSchoolName = childSchoolName.length < 5;
	displayError(verifChildSchoolName, 'errorChildSchoolName', 'your school name should have at least 5 characters');
	var childModules = document.getElementById('childModules').value;
	var verifChildModules = validateSelect('childModules');
	displayError(verifChildModules, 'errorChildModules', 'select your Module');
	var childClass = document.getElementById('childClass').value;
	var verifChildClass = validateSelect('childClass');
	displayError(verifChildClass, 'errorChildClass', 'select your Class');
	if (
		!verifChildFirstName &&
		!verifChildLastName &&
		verifChildAgeNumber &&
		!verifChildSchoolName &&
		!verifChildModules &&
		!verifChildClass
	) {
		var studentId = JSON.parse(localStorage.getItem('studentId') || '1');
		var studentMatricul = JSON.parse(localStorage.getItem('studentMatricul') || '100');
		var student = {
			matricul: Number(studentMatricul),
			id: Number(studentId),
			studentFirstName: childFirstName,
			studentLastName: childLastName,
			studentAge: childAge,
			schoolName: childSchoolName,
			studentModule: childModules,
			studentClass: childClass,
			password: childFirstName + Number(studentMatricul)
		};
		var T = JSON.parse(localStorage.getItem('students') || '[]');
		T.push(student);
		localStorage.setItem('students', JSON.stringify(T));
		localStorage.setItem('studentId', Number(studentId) + 1);
		localStorage.setItem('studentMatricul', Number(studentMatricul) + 1);
	}
}
function addTeacher() {
	var teacherFirstName = document.getElementById('teacherFirstName').value;
	var verifTeacherFirstName = teacherFirstName.length < 4;
	displayError(
		verifTeacherFirstName,
		'errorTeacherFirstName',
		'teacher first name should have at least 4 characters'
	);
	var teacherLastName = document.getElementById('teacherLastName').value;
	var verifTeacherLastName = teacherLastName < 4;
	displayError(verifTeacherLastName, 'errorTeacherLastName', 'teacher last name should have at least 4 characters');
	var teacherSchoolName = document.getElementById('teacherSchoolName').value;
	var verifTeacherSchoolName = teacherSchoolName.length < 5;
	displayError(
		verifTeacherSchoolName,
		'errorTeacherSchoolName',
		'your school name should have at least 5 characters'
	);
	var teacherModules = document.getElementById('teacherModules').value;
	var verifTeacherModules = validateSelect('teacherModules');
	displayError(verifTeacherModules, 'errorTeacherModules', 'select teacher Module');
	var teacherClass = document.getElementById('teacherClass').value;
	var verifTeacherClass = validateSelect('teacherClass');
	displayError(verifTeacherClass, 'errorTeacherClass', 'select teacher Class');
	if (
		!verifTeacherFirstName &&
		!verifTeacherLastName &&
		!verifTeacherSchoolName &&
		!verifTeacherModules &&
		!verifTeacherClass
	) {
		var teacherId = JSON.parse(localStorage.getItem('teacherId') || '1');
		var teacherMatricul = JSON.parse(localStorage.getItem('teacherMatricul') || '1000');
		var teacher = {
			matricul: Number(teacherMatricul),
			id: Number(teacherId),
			teacherFirstName: teacherFirstName,
			teacherLastName: teacherLastName,
			schoolName: teacherSchoolName,
			teacherModule: teacherModules,
			teacherClass: teacherClass,
			password: teacherSchoolName + Number(teacherMatricul)
		};
		var T = JSON.parse(localStorage.getItem('teachers') || '[]');
		T.push(teacher);
		localStorage.setItem('teachers', JSON.stringify(T));
		localStorage.setItem('teacherId', Number(teacherId) + 1);
		localStorage.setItem('teacherMatricul', Number(teacherMatricul) + 1);
	}
}
function validateSelect(id) {
	var e = document.getElementById(id);
	var strUser = e.options[e.selectedIndex].value;
	var strUser1 = e.options[e.selectedIndex].text;
	if (strUser == 0) {
		return true + strUser1;
	}
}
function getObjectsFromLS(key) {
	return JSON.parse(localStorage.getItem(key) || '[]');
}
function searchById(key, id) {
	var objects = getObjectsFromLS(key);
	var findedObject;
	for (let i = 0; i < objects.length; i++) {
		if (objects[i].id == id) {
			findedObject = objects[i];
		}
	}
	return findedObject;
}
function searchByNameSchool(key, schoolName) {
	var objects = getObjectsFromLS(key);
	var findedObject;
	for (let i = 0; i < objects.length; i++) {
		if (objects[i].schoolName == schoolName) {
			findedObject = objects[i];
		}
	}
	return findedObject;
}

function displayListStudent() {
	var connectedAdminId = localStorage.getItem('connectedAdminId');
	var admins = searchById('admins', connectedAdminId);
	var myStudent = [];
	var students = getObjectsFromLS('students');
	for (let i = 0; i < students.length; i++) {
		if (students[i].schoolName == admins.schoolName) {
			myStudent.push(students[i]);
		}
	}
	var studentTable = `
	<table class="table">
	<thead>
		<tr>
			<th scope="col">Id</th>
			<th scope="col"> First Name</th>
			<th scope="col"> last Name</th>
			<th scope="col">Matricul</th>
			<th scope="col">password</th>
			<th scope="col">section</th>
			<th scope="col">class</th>
			<th scope="col">school name</th>
			<th scope="col">action</th>
		</tr>
	</thead>
  <tbody>`;

	for (let i = 0; i < myStudent.length; i++) {
		studentTable =
			studentTable +
			`
			<tr>
			<th scope="row">${myStudent[i].id}</th>
			<td>${myStudent[i].studentFirstName}</td>
			<td>${myStudent[i].studentLastName}</td>
			<td>${myStudent[i].matricul}</td>
			<td>${myStudent[i].password}</td>
			<td>${myStudent[i].studentModule}</td>
			<td>${myStudent[i].studentClass}</td>
			<td>${myStudent[i].schoolName}</td>
			
			<td><button class="icon_close btn btn-danger" onclick="deleteObject(${i}, 'students')">delete</button></td>
		</tr>`;
	}
	studentTable =
		studentTable +
		`</tbody>
  </table>`;

	document.getElementById('listStudent').innerHTML = studentTable;
}
function displayListTeacher() {
	var connectedAdminId = localStorage.getItem('connectedAdminId');
	var admins = searchById('admins', connectedAdminId);
	var teachers = getObjectsFromLS('teachers');
	var myTeacher = [];
	for (let i = 0; i < teachers.length; i++) {
		if (teachers[i].schoolName == admins.schoolName) {
			myTeacher.push(teachers[i]);
		}
	}
	var teacherTable = `
	<table class="table">
	<thead>
		<tr>
			<th scope="col">Id</th>
			<th scope="col"> First Name</th>
			<th scope="col"> last Name</th>
			<th scope="col">Matricul</th>
			<th scope="col">password</th>
			<th scope="col">section</th>
			<th scope="col">class</th>
			<th scope="col">school name</th>
			<th scope="col">action</th>
		</tr>
	</thead>
      <tbody>`;

	for (let i = 0; i < myTeacher.length; i++) {
		teacherTable =
			teacherTable +
			`
		<tr>
		<th scope="row">${myTeacher[i].id}</th>
		<td>${myTeacher[i].teacherFirstName}</td>
		<td>${myTeacher[i].teacherLastName}</td>
		<td>${myTeacher[i].matricul}</td>
		<td>${myTeacher[i].password}</td>
		<td>${myTeacher[i].teacherModule}</td>
		<td>${myTeacher[i].teacherClass}</td>
		<td>${myTeacher[i].schoolName}</td>
		<td><button class="icon_close btn btn-danger" onclick="deleteObject(${i}, 'teachers')">delete</button></td>
	</tr>`;
	}
	teacherTable =
		teacherTable +
		`</tbody>
  </table>`;

	document.getElementById('listTeacher').innerHTML = teacherTable;
}
function displayListParent() {
	var connectedAdminId = localStorage.getItem('connectedAdminId');
	var admin = searchById('admins', connectedAdminId);
	var parents = getObjectsFromLS('parents');
	var myParents = [];
	for (let i = 0; i < parents.length; i++) {
		if (parents[i].schoolName == admin.schoolName) {
			myParents.push(parents[i]);
		}
	}
	var parentTable = `
	<table class="table">
	<thead>
		<tr>
			<th scope="col">Id</th>
			<th scope="col"> First Name</th>
			<th scope="col"> last Name</th>
			<th scope="col">Matricul</th>
			<th scope="col">password</th>
			<th scope="col">section</th>
			<th scope="col">class</th>
			<th scope="col">school name</th>
			<th scope="col">action</th>
		</tr>
	</thead>
      <tbody>`;

	for (let i = 0; i < myParents.length; i++) {
		parentTable =
			parentTable +
			`
		<tr>
		<th scope="row">${myParents[i].id}</th>
		<td>${myParents[i].teacherFirstName}</td>
		<td>${myParents[i].teacherLastName}</td>
		<td>${myParents[i].matricul}</td>
		<td>${myParents[i].password}</td>
		<td>${myParents[i].teacherModule}</td>
		<td>${myParents[i].teacherClass}</td>
		<td>${myParents[i].schoolName}</td>
		<td><button class="icon_close btn btn-danger" onclick="deleteObject(${i}, 'teachers')">delete</button></td>
	</tr>`;
	}
	parentTable =
		parentTable +
		`</tbody>
  </table>`;

	document.getElementById('listParent').innerHTML = parentTable;
}

function deleteObject(pos, key) {
	var objects = JSON.parse(localStorage.getItem(key) || '[]');
	objects.splice(pos, 1);
	localStorage.setItem(key, JSON.stringify(objects));
	location.reload();
}

function displayAddParent() {
	var parents = getObjectsFromLS('parents');
	var parentTables = `<table class="table">
	<thead>
		<tr>
			<th scope="col">Id</th>
			<th scope="col">student First Name</th>
			<th scope="col">student last Name</th>
			<th scope="col">student age</th>
			<th scope="col">input class</th>
			<th scope="col">input section</th>
			<th scope="col">action</th>

		</tr>
	</thead>
  <tbody>`;
	for (let i = 0; i < parents.length; i++) {
		parentTables =
			parentTables +
			`<tr>
		<th scope="row">${parents[i].id}</th>
		<td>${parents[i].parentAddressEmail}</td>
		<td>${parents[i].parentName}</td>
		<td>${parents[i].parentPhoneNumber}</td>
		<td>aaa</td>
		<td>aaa</td>
		<td><button class="icon_close btn btn-danger" onclick="">approuve</button></td>
  
       </tr>`;
	}
	parentTables =
		parentTables +
		`</tbody>
	</table>`;
	document.getElementById('addParents').innerHTML = parentTables;
}
