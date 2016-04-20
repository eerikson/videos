
/*
*  Main application class.
*/

import React from 'react';
import ReactDOM from 'react-dom';
import {VALID_USERS} from './utils/constants';
import Login from './components/Login.jsx';

class App extends React.Component {
	
	componentDidMount() {
		console.info("componentDidMount");
		// Run after done painting
		window.requestAnimationFrame(() => {
			this.setState({
				mounted: true
			});
		});
	}
	
	userDidLogin(data){
		this.setState({userIsLoggedIn : true });
	}
	
	constructor(props) {
		super(props);
		this.state = { mounted: false, userIsLoggedIn: false };
	}
	
	render() {
		let classList = "app component " + ( this.state.mounted ? 'is-mounted' : '' );
		return (
			<div className={classList} >
				<Login users={VALID_USERS} onLoginSuccess={this.userDidLogin.bind(this)}/>
			</div>
		);
	}
}


export default App;

