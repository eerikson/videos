import React from 'react';
import Component from './Component.jsx';
import Movie from './Movie.jsx';

class MoviesListItem extends Movie {
	
	render() {
		return (
			<article className='movie movies-list-item component'>
				<h2 className="title">{this.state.title}</h2>
				<h3 className="year">{this.state.year}</h3>
				<figure className="poster">
					<img src={this.state.poster} />
				</figure>
			</article>
		)
	}
}

export default MoviesListItem;