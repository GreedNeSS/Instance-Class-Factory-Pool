'use strict';

const logable = fields => {
	let hash = {};

	class Logable {

		constructor(name, born) {
			this.values = {};
			const obj = { name, born };
			for (const key in obj) {
				const def = hash[key];
				if (typeof obj[key] === def.type &&
					def.validate(obj[key])) {
					this.values[key] = obj[key];
				} else console.log('Validation failed:', key, obj[key]);
			}
		}

		toString() {
			let result = this.constructor.name + ': ';
			for (const key in fields) {
				result += this.values[key] + ' ';
			}
			return result;
		}
	}

	for (const key in fields) {
		hash[key] = fields[key];
		Object.defineProperty(Logable.prototype, key, {
			get() {
				console.log('Reading key:', key);
				return this.values[key];
			},
			set(value) {
				console.log('Writing key:', key, value);
				const def = fields[key];
				const valid = (
					typeof value === def.type &&
					def.validate(value)
				);

				console.log({ value });
				if (valid) this.values[key] = value;
				else console.log('Validation failed:', key, value);
			}
		});
	}

	return Logable;
};

// Usage

const Person = logable({
	name: { type: 'string', validate: name => name.length > 0 },
	born: { type: 'number', validate: born => !(born % 1) },
});

const p1 = new Person('Ruslan', '1991');
console.log(p1.toString());
console.log(p1);
p1.born = 1923;
console.log(p1.born);
console.log(p1);

p1.born = 100.5;
p1.name = 'Victor Glushkov';
console.log(p1.toString());