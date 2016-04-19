
/*
*  Main application class.
*/

import React from 'react';
import ReactDOM from 'react-dom';
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
	
	constructor(props) {
		super(props);
		this.state = { mounted: false };
	}
	
	render() {
		let mounted = this.state.mounted;
		let classList = "app component " + ( mounted ? 'is-mounted' : '' );
		return (
			<div className={classList} >
				<Login />
			</div>
		);
	}
}


export default App;

