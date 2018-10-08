class RingBufferIterator {
	constructor( buffer, start, end ) {
		this.buffer = buffer;
		this.index = ( buffer.head + start ) % buffer.size;
		this.length = 0;
		this.start = start;
		this.size = end - start;
	}
	
	next() {
		const isDone = this.isDone();
		return {
			value: isDone ? undefined : this.getNext(),
			done: isDone
		};
	}
	
	getNext() {
		const value = this.buffer.buffer[ this.index ];
		
		if( this.index === this.buffer.size - 1 ) {
			this.index = 0;
		}
		else {
			this.index++;
		}
		
		this.length++;
		
		return value;
	}
	
	isDone() {
		return this.length >= this.size;
	}
	
	[ Symbol.iterator ]() {
		return this;
	}
}

function indexOfLastElement( tail, size ) {
	if( tail === 0 ) {
		return size - 1;
	}
	else {
		return tail - 1;
	}
}

class RingBuffer {
	constructor( size ) {
		this.size = size;
		this.length = 0;
		this.head = 0;
		this.tail = 0;
		this.buffer = new Array( size );
	}
	
	addLast( element ) {
		if( this.length === this.size ) {
			return;
		}
		
		this.buffer[ this.tail ] = element;
		
		if( this.tail === this.size - 1 ) {
			this.tail = 0;
		}
		else {
			this.tail++;
		}
		
		this.length++;
	}
	
	removeLast() {
		if( this.length === 0 ) {
			return undefined;
		}
		
		this.tail = indexOfLastElement( this.tail, this.size );
		
		this.length--;
		
		return this.buffer[ this.tail ];
	}
	
	peekLast() {
		if( this.length === 0 ) {
			return undefined;
		}
		else {
			return this.buffer[ indexOfLastElement( this.tail, this.size ) ];
		}
	}
	
	addFirst( element ) {
		if( this.length === this.size ) {
			return;
		}
		
		if( this.head === 0 ) {
			this.head = this.size - 1;
		}
		else {
			this.head--;
		}
		
		this.length++;
		
		this.buffer[ this.head ] = element;
	}
	
	removeFirst() {
		if( this.length === 0 ) {
			return undefined;
		}
		
		const element = this.buffer[ this.head ];
		
		if( this.head === this.size - 1 ) {
			this.head = 0;
		}
		else {
			this.head++;
		}
		
		this.length--;
		
		return element;
	}
	
	peekFirst() {
		if( this.length === 0 ) {
			return undefined;
		}
		else {
			return this.buffer[ this.head ];
		}
	}
	
	[ Symbol.iterator ]() {
		return new RingBufferIterator( this, 0, this.length );
	}
	
	slice( start, end ) {
		return new RingBufferIterator( this, start, end );
	}
}

module.exports = RingBuffer;