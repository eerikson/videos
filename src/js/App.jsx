
/*
*  Main application class.
*/

import React from 'react';
import ReactDOM from 'react-dom';
import {VALID_USERS, FLICKS} from './utils/constants';
import Login from './utils/Login'; // Login state manager

// Components 
import LoginWindow from './components/Login.jsx';   // Login UI
import MovieList from './components/MovieList.jsx';  // Movie Browser 

class App extends React.Component {
	
	componentDidMount() {
		
		// Run after done painting
		// (Hey, it's better than setTimeout)
		window.requestAnimationFrame(() => {
			this.setState({
				mounted: true
			});
		});
	}
	
	userDidLogin(data){
		this.loginState = true;
	}
	
	/*
	* These exist to sync login state with React state.
	*/
	
	set loginState(state) {
		Login.setLoginState(state);
		this.setState({userIsLoggedIn: state});
	}
	
	
	doLoginCheck() {
		return Login.getLoginState();
	}
	
	loadTypekit() {
		(function(d) {
	    var config = {
	      kitId: 'xjs5fjc',
	      scriptTimeout: 3000,
	      async: true
	    },
	    h=d.documentElement,t=setTimeout(function(){h.className=h.className.replace(/\bwf-loading\b/g,"")+" wf-inactive";},config.scriptTimeout),tk=d.createElement("script"),f=false,s=d.getElementsByTagName("script")[0],a;h.className+=" wf-loading";tk.src='https://use.typekit.net/'+config.kitId+'.js';tk.async=true;tk.onload=tk.onreadystatechange=function(){a=this.readyState;if(f||a&&a!="complete"&&a!="loaded")return;f=true;clearTimeout(t);try{Typekit.load(config)}catch(e){}};s.parentNode.insertBefore(tk,s)
	  })(document);
	}
	
	constructor(props) {
		super(props);
		this.loadTypekit();
		this.state = { mounted: false, userIsLoggedIn: this.doLoginCheck(), movies : FLICKS };
	}
	
	render() {
		let classList = 'app component';
		classList += (this.state.mounted ? ' is-mounted' : ' not-yet-mounted');
		classList += (this.state.userIsLoggedIn && this.state.mounted ? ' user-logged-in' : ' not-logged-in');
		return (
			<div className={classList} >
				{ !this.state.userIsLoggedIn ? <LoginWindow users={VALID_USERS} onLoginSuccess={this.userDidLogin.bind(this)} /> : null}
				{ this.state.userIsLoggedIn ? <MovieList movies={this.state.movies} /> : null }
			
			</div>
		);
	}
}


export default App;

