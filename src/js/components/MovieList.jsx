import React from 'react';
import Component from './Component.jsx';
import MoviesListItem from './MoviesListItem.jsx';

class MovieList extends Component {
	
	constructor(props) {
		super(props);
		
		this.state = {
			movies : props.movies
		}
		
		
	}
	
	render(){
		
		let movies = this.state.movies.map( (flick, i) => {
			return <li className="movies-list-element" key={i}><MoviesListItem  {...flick} /></li>
		});
		
		return (
			<section className='movie-list component'>
				<ul className="movies">
					{movies}
				</ul>
			</section>
		);
	}
	
}

export default MovieList;