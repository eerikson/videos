import React from 'react';
import Component from './Component.jsx';

class Login extends Component {
	
	emailDidChange(event) {
		console.log(event.target);
	}
	
	constructor(props) {
		super(props);
		this.state = { userEmailInput : null };
	}
	
	render() {
		return (
			<form className="login component">
				<input 
					type="email" 
					placeholder="Your email address" 
					value={this.state.userEmailInput} 
					onChange={this.emailDidChange} 
					/>
				<input type="password" placeholder="Your password" />
			</form>
		)
	}
}


export default Login;