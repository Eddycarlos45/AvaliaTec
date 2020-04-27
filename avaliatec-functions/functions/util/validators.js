const isEmail = (email) => {
	const regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	if (email.match(regEx)) return true;
	else return false;
};
const isEmpty = (string) => {
	if (string === '' ) return true;
	else return false;
};

exports.validateSignupData = (data) => {
	let errors = {};

	if (isEmpty(data.email.trim())) {
		errors.email = 'Must not be empty'
	} else if (!isEmail(data.email)) {
		errors.email = 'Must be a valid email address'
	}

	if (isEmpty(data.password.trim())) errors.password = 'Must not be empty'
	if (data.password !== data.confirmPassword) errors.confirmPassword = 'Passwords must match';
	if (isEmpty(data.userLogin.trim())) errors.userLogin = 'Must not be empty';
	if (isEmpty(data.userName.trim())) errors.userName = 'Must not be empty';
	if (isEmpty(data.course.trim())) errors.course = 'Must not be empty';


	return {
		errors,
		valid: Object.keys(errors).length === 0 ? true : false
	};
};

exports.validateLogin = (data) => {
	let errorsLogin = {};
	if (isEmpty(data.email.trim())) errorsLogin.email = 'Must not be empty';
	if (isEmpty(data.password.trim())) errorsLogin.password = 'Must not be empty';

	return {
		errorsLogin,
		valid: Object.keys(errorsLogin).length === 0 ? true : false
	};
};

exports.validateTheme = (data) => {
	let errorsTheme = {};
	if (isEmpty(data.theme.trim())) errorsTheme.theme = 'Must not be empty';
	if (isEmpty(data.course.trim())) errorsTheme.course = 'Must not be empty';
	if (isEmpty(data.members[0].trim())) errorsTheme.members = 'Must not be empty';

	return {
		errorsTheme,
		valid: Object.keys(errorsTheme).length === 0 ? true : false
	};
};

exports.validateForm = (data) => {
	let errosForm = {};
	if (isEmpty(data.course.trim())) errosForm.course = 'Must not be empty';
	if (isEmpty(data.teachers[0].trim())) errosForm.teachers = 'Must not be empty';
	if (isEmpty(data.theme.trim())) errosForm.theme = 'Must not be empty';

	return {
		errosForm,
		valid: Object.keys(errosForm).length === 0 ? true : false
	};
};