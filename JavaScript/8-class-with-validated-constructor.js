'use strict';

const logable = fields => {

	class Logable {

		constructor(...args) {
			this.values = {};
			for (const key in fields) {
				const def = fields[key];
				const elem = args.shift();
				if (typeof elem === def.type &&
					def.validate(elem)) {
					this.values[key] = elem;
				} else console.log('Validation failed:', key, elem);
			}
		}

		toString() {
			let result = this.constructor.name + ': ';
			for (const key in fields) {
				result += `${key} = "` + this.values[key] + '"; ';
			}
			return result;
		}
	}

	for (const key in fields) {
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
