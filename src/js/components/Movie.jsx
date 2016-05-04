import React from 'react';
import Component from './Component.jsx';

class Movie extends Component {
	
	render() {
		return (
			<article className='movie component'>
				<h2>{this.state.title}</h2>
				<h3>{this.state.year}</h3>
				<figure>
					<img src={this.state.poster} />
				</figure>
			</article>
		)
	}
	
	constructor(props) {
		super(props)
		this.state = {
			id : props.id,
			title : props.title,
			poster : props.poster,
			year : props.year
		}
	}
}

export default Movie;