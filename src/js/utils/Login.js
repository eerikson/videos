class Login {
	
	static getLoginState() {
		let lsLoginState = JSON.parse(localStorage.getItem('logged-in'));
		if ( lsLoginState ) {
			return lsLoginState;
		} else {
			return false;
		}
	}
	
	static setLoginState(loginStateToSet) {
		localStorage.setItem('logged-in', loginStateToSet);
		return JSON.parse(localStorage.getItem('logged-in'));
	}
	
	constructor(props) {
		
	}
}

export default Login;