import React from 'react';
import Component from './Component.jsx';

class LoginWindow extends Component {
	
	/*
	*  Sync email input with state.
	*  Let HTML5 take care of the validation.
	*/
	emailDidChange(event) {
		let domEmailValid = event.nativeEvent.target.validity.valid;
		this.setState({ emailValid : domEmailValid, userEmailInput : event.nativeEvent.target.value });	
	}
	
	/*
	*  Sync password input with state.
	*  Let HTML5 take care of the validation.
	*/
	passwordDidChange(event) {
		let domPasswordValid = event.nativeEvent.target.validity.valid;
		this.setState({passwordValid : domPasswordValid, userPasswordInput : event.nativeEvent.target.value });
	}
	
	/*
	*  Dispatch callback to parent component.
	*/
	
	loginSuccess(details) {
		this.props.onLoginSuccess(details);
	}
	
	/*
	*  Intercept default <form /> submission event
	*/
	formWillSubmit(event) {
		event.nativeEvent.preventDefault();	
		let userFound = false;
		
		// ______________________________________________________________________ //
		// EVERYTHING BELOW SHOULD BE THROWN OUT ONCE AN ACTUAL SERVER IS BEING   //
		// USED. Obviously, client-side user logins are a bad idea.               //
		// ______________________________________________________________________ //
		
		// Check against valid user list.
		if( this.state.emailValid && this.state.passwordValid ) {
			// Iterate through valid users.
			this.validUsers.every( user => {
				
				if ( 
					user.email === this.state.userEmailInput &&
					user.password === this.state.userPasswordInput
				) {
					
					this.setState({loginSuccess : true});
					userFound = true;
					this.loginSuccess({ email: user.email });
					
					// Stop when match is found.
					return false;
				} else {
					// Keep going if no match has been found.
					return true;
				}
			});
			
			if (!userFound) {
				this.setState({loginFailure : true});
				
				// After a delay, remove this state and then allow the user to try again.
				window.setTimeout(() => {
					this.reset()
				}, 3000 );
			}
			
		} else {
			console.error("ERROR: Invalid form input.");
		}
		
	}
	
	reset(){
		this.setState({
			userEmailInput : null, 
			userPasswordInput : null,
			emailValid : false, 
			passwordValid : false,
			loginSuccess : false,
			loginFailure : false
		});
		
		this.refs.formEl.reset();
	}
	
	
	constructor(props) {
		super(props);
		this.validUsers = props.users;
		
		this.state = { 
			userEmailInput : null, 
			userPasswordInput : null,
			emailValid : false, 
			passwordValid : false,
			loginSuccess : false,
			loginFailure : false
		};
		
	}
	
	render() {
		
		return (
			<form 
			ref='formEl'
			onSubmit={this.formWillSubmit.bind(this)}
			className={`login component ${this.state.emailValid && this.state.passwordValid ? "fully-valid" : "not-fully-valid"} ${this.state.loginSuccess ? "user-logged-in" : ""} ${this.state.loginFailure ? "user-failed-login" : ""}`}>
				<div className="user-inputs">
					<input 
						type="email" 
						placeholder="Your email address" 
						value={this.state.userEmailInput} 
						onChange={this.emailDidChange.bind(this)} 
						required
						/>
					<input 
						type="password" 
						placeholder="Your password"
						pattern="[A-Za-z0-9]{6,}"
						value={this.state.userPasswordInput} 
						onChange={this.passwordDidChange.bind(this)}
						required
						/>
					<button type="submit">Go</button>
				</div>
				<div className="user-feedback">
					<h4 className="message">{`${this.state.loginSuccess ? 'Login successful!' : 'Did not find an email with that password.'}`}</h4>
				</div>
			</form>
		)
	}
}


export default LoginWindow;