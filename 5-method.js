'use strict';

class Person {
	constructor(name) {
		this.name = name;
	}

	static factory(name) {
		return new Person(name);
	}
}

// Usage

const p1 = Person.factory('Ruslan');
console.log({ p1 });
const p2 = Person.factory('Gena');
console.log({ p2 });