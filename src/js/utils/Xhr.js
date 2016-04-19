/*
*  XHR
*
*  This class exists to make XMLHttpRequest a bit less crap to interface with.
*/



class Xhr {
	
	/*
	*  Simple GET request, not unlike jQuery's $.get()
	*  Return promise based on readystate, etc of XHR.
	*/
	constructor( url, method ) {
		
		this.nativeXhr = new XMLHttpRequest();
		
		return new Promise( (resolve, reject) => {
			
			this.nativeXhr.onreadystatechange = () => {
				
				// If done
				if ( this.nativeXhr.readyState === this.nativeXhr.DONE ) {
					// HTTP status code of 200 is what we're assuming a success is.
					if ( this.nativeXhr.status === 200 ) {
						resolve(JSON.parse( this.nativeXhr.responseText));
					} else {
						// If done & we didn't get a 200 status, 
						// something pretty bad happened.
						console.error("Something went wrong!");
						
						reject(this.nativeXhr.responseText);
					}
				} else {
					// Error
					
				}
				
			}
		
			this.nativeXhr.open(method, url, true);
			this.nativeXhr.send();
		});
	}
}

export default Xhr;