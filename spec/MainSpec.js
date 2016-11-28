let RingBuffer = require( "../index" );

function verify( buffer, elements ) {
	let iteratorResult = buffer[Symbol.iterator]().next();
	for( let element of elements ) {
		expect( iteratorResult.value ).toBe( element );
		expect( iteratorResult.done ).toBe( false );
		iteratorResult = iteratorResult.next();
	}
	expect( iteratorResult.done ).toBe( true );
}

describe( "RingBuffer", () => {
	it( "initializes", () => {
		let buffer = new RingBuffer( 1 );
		
		expect( buffer.size ).toBe( 1 );
		expect( buffer.length ).toBe( 0 );
	} );
	
	it( "addLast and peekLast one element", () => {
		let buffer = new RingBuffer( 1 );
		
		buffer.addLast( 1 );
		
		expect( buffer.length ).toBe( 1 );
		expect( buffer.peekLast() ).toBe( 1 );
		expect( buffer.length ).toBe( 1 );
	} );
	
	it( "addLast two elements and peekLast", () => {
		let buffer = new RingBuffer( 2 );
		
		buffer.addLast( 1 );
		buffer.addLast( 2 );
		
		expect( buffer.length ).toBe( 2 );
		expect( buffer.peekLast() ).toBe( 2 );
		expect( buffer.length ).toBe( 2 );
	} );
	
	it( "addLast one element and removeLast one element", () => {
		let buffer = new RingBuffer( 1 );
		
		buffer.addLast( 1 );
		
		expect( buffer.removeLast() ).toBe( 1 );
		expect( buffer.length ).toBe( 0 );
	} );
	
	it( "addLast two elements and removeLast two elements", () => {
		let buffer = new RingBuffer( 2 );
		
		buffer.addLast( 1 );
		buffer.addLast( 2 );
		
		expect( buffer.removeLast() ).toBe( 2 );
		expect( buffer.length ).toBe( 1 );
		expect( buffer.removeLast() ).toBe( 1 );
		expect( buffer.length ).toBe( 0 );
	} );
	
	it( "does not overflow via addLast", () => {
		let buffer = new RingBuffer( 1 );
		
		buffer.addLast( 1 );
		buffer.addLast( 2 );
		
		expect( buffer.peekLast() ).toBe( 1 );
		expect( buffer.length ).toBe( 1 );
	} );
	
	it( "does not underflow via removeLast", () => {
		let buffer = new RingBuffer( 1 );
		
		expect( buffer.removeLast() ).toBe( undefined );
		expect( buffer.length ).toBe( 0 );
	} );
	
	it( "returns undefined when peeking the last element of an empty buffer", () => {
		let buffer = new RingBuffer( 1 );
		
		expect( buffer.peekLast() ).toBe( undefined );
		expect( buffer.length ).toBe( 0 );
	} );
	
	it( "addFirst one element and peekFirst", () => {
		let buffer = new RingBuffer( 1 );
		
		buffer.addFirst( 1 );
		
		expect( buffer.length ).toBe( 1 );
		expect( buffer.peekFirst() ).toBe( 1 );
		expect( buffer.length ).toBe( 1 );
	} );
	
	it( "addFirst two elements and peekFirst", () => {
		let buffer = new RingBuffer( 2 );
		
		buffer.addFirst( 1 );
		buffer.addFirst( 2 );
		
		expect( buffer.length ).toBe( 2 );
		expect( buffer.peekFirst() ).toBe( 2 );
		expect( buffer.length ).toBe( 2 );
	} );
	
	it( "addFirst one element and removeFirst one element", () => {
		let buffer = new RingBuffer( 1 );
		
		buffer.addFirst( 1 );
		
		expect( buffer.removeFirst() ).toBe( 1 );
		expect( buffer.length ).toBe( 0 );
	} );
	
	it( "addFirst two elements and removeFirst two elements", () => {
		let buffer = new RingBuffer( 2 );
		
		buffer.addFirst( 1 );
		buffer.addFirst( 2 );
		
		expect( buffer.removeFirst() ).toBe( 2 );
		expect( buffer.length ).toBe( 1 );
		expect( buffer.removeFirst() ).toBe( 1 );
		expect( buffer.length ).toBe( 0 );
	} );
	
	it( "addLast two elements and peekFirst", () => {
		let buffer = new RingBuffer( 2 );
		
		buffer.addLast( 1 );
		buffer.addLast( 2 );
		
		expect( buffer.peekFirst() ).toBe( 1 );
		expect( buffer.length ).toBe( 2 );
	} );
	
	it( "does not overflow via addFirst", () => {
		let buffer = new RingBuffer( 1 );
		
		buffer.addFirst( 1 );
		buffer.addFirst( 2 );
		
		expect( buffer.peekFirst() ).toBe( 1 );
		expect( buffer.length ).toBe( 1 );
	} );
	
	it( "does not underflow via removeFirst", () => {
		let buffer = new RingBuffer( 1 );
		
		expect( buffer.removeFirst() ).toBe( undefined );
		expect( buffer.length ).toBe( 0 );
	} );
	
	it( "returns undefined when peeking the first element of an empty buffer", () => {
		let buffer = new RingBuffer( 1 );
		
		expect( buffer.peekFirst() ).toBe( undefined );
		expect( buffer.length ).toBe( 0 );
	} );
	
	it( "addLast and peekFirst one element", () => {
		let buffer = new RingBuffer( 1 );
		
		buffer.addLast( 1 );
		
		expect( buffer.peekFirst() ).toBe( 1 );
		expect( buffer.length ).toBe( 1 );
	} );
	
	it( "addFirst and peekLast one element", () => {
		let buffer = new RingBuffer( 1 );
		
		buffer.addFirst( 1 );
		
		expect( buffer.peekLast() ).toBe( 1 );
		expect( buffer.length ).toBe( 1 );
	} );
	
	it( "wraps around via addLast and removeFirst", () => {
		let buffer = new RingBuffer( 2 );
		
		buffer.addLast( 1 );
		buffer.addLast( 2 );
		buffer.removeFirst();
		buffer.addLast( 3 );
		
		expect( buffer.removeFirst() ).toBe( 2 );
		expect( buffer.removeFirst() ).toBe( 3 );
	} );
	
	it( "wraps around via addFirst and removeLast", () => {
		let buffer = new RingBuffer( 2 );
		
		buffer.addFirst( 1 );
		buffer.addFirst( 2 );
		buffer.removeLast();
		buffer.addFirst( 3 );
		
		expect( buffer.removeLast() ).toBe( 2 );
		expect( buffer.removeLast() ).toBe( 3 );
	} );
	
	it( "implements iterator method", () => {
		expect( RingBuffer.prototype[Symbol.iterator] instanceof Function ).toBe( true );
	} );
	
	it( "enumerates empty list", () => {
		let buffer = new RingBuffer( 1 );
		
		verify( buffer, [] );
	} );
	
	it( "enumerates list of one", () => {
		let buffer = new RingBuffer( 1 );
		
		buffer.addLast( 1 );
		
		verify( buffer, [ 1 ] );
	} );
	
	it( "enumerates list of two", () => {
		let buffer = new RingBuffer( 2 );
		
		buffer.addLast( 1 );
		buffer.addLast( 2 );
		
		verify( buffer, [ 1, 2 ] );
	} );
	
	it( "enumerates list of two not starting at 0", () => {
		let buffer = new RingBuffer( 3 );
		
		buffer.addLast( 1 );
		buffer.addLast( 2 );
		buffer.addLast( 3 );
		buffer.removeFirst();
		
		verify( buffer, [ 2, 3 ] );
	} );
	
	it( "enumerates wrapped list of two", () => {
		let buffer = new RingBuffer( 2 );
		
		buffer.addLast( 1 );
		buffer.addLast( 2 );
		buffer.removeFirst();
		buffer.addLast( 3 );
		
		verify( buffer, [ 2, 3 ] );
	} );
} );