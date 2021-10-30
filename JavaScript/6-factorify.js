'use strict';

class Person {
	constructor(name) {
		this.name = name;
	}
}

const factorify = Category => (...args) => new Category(...args);

// Usage

const p1 = new Person('Ruslan');
console.log({ p1 });

const personFactory = factorify(Person);
const p2 = personFactory('Gena');
console.log({ p2 });
