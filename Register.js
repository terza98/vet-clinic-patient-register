'use strict';

class Owner {
	constructor(name, surname, phone) {
		//if no parameters are present show errors
		if (name === undefined) throw new Error('Name cannot be blank!');

		if (surname === undefined) throw new Error('Surname cannot be blank!');

		if (phone === undefined) throw new Error('Phone cannot be blank!');

		//check type of parameters
		if (typeof name !== 'string') throw new Error('Name must be string!');
		else this._name = name;

		if (typeof surname !== 'string')
			throw new Error('Surname must be string!');
		else this._surname = surname;

		if (isNaN(phone)) throw new Error('Phone must be number!');
		else this._phone = phone;
	}
	get ownerName() {
		return this._name;
	}
	get ownerSurname() {
		return this._surname;
	}
	get ownerPhone() {
		return this._phone;
	}
}
class Animal {
	constructor(owner, id) {
		// if no parameters are specified
		if (id === undefined) throw new Error('ID is not specified!');
		if (owner === undefined)
			throw new Error('Owner for the animal is not specified!');
		//if type of ID is not a number
		// if (typeof id !== 'number') throw new Error('ID needs to be a number');
		else this._id = id;

		if (typeof owner !== 'object') throw new Error('Invalid owner type!');
		else this._owner = owner;

		//initialize empty ilnesses and med cond
		this._illnesses = [];
		this._medicalConditions = [];
	}
	// Getters
	get id() {
		return this._id;
	}
	get owner() {
		return this._owner;
	}
	get ilnesses() {
		return this._ilnesses;
	}
	get medicalCondition() {
		return this._medicalCondition;
	}

	// Methods
	addIllness(illness) {
		if (typeof illness === 'string') this._illnesses.push(illness);
		else if (Array.isArray(illness))
			illness.forEach(item => {
				this._illnesses.push(item);
			});
	}
	addMedicalCondition(medicalCondition) {
		if (typeof medicalCondition === 'string')
			this._medicalConditions.push(medicalCondition);
		else if (Array.isArray(medicalCondition))
			medicalCondition.forEach(item => {
				this._medicalConditions.push(item);
			});
	}
}
class Examination {
	constructor(id, illness, medicalCondition) {
		// if no paramaeters are specified
		if (id === undefined)
			throw new Error(
				'ID needs to be specified when creating examinations!',
			);

		if (illness === undefined)
			throw new Error(
				'Illness needs to be specified when creating examinations!',
			);

		if (medicalCondition === undefined)
			throw new Error(
				'Medical Condition needs to be specified when creating examinations!',
			);

		//if type of ID is not a number
		if (typeof id !== 'number') throw new Error('ID needs to be a number');
		else this._id = id;

		// if illnesses and medCond are not arrays push parameter to an array

		if (typeof illness === 'string') this._illness = illness;
		else if (Array.isArray(illness)) this._illness = [...illness];
		else
			throw new Error(
				'Illness must be either array of strings or string!',
			);

		if (typeof medicalCondition === 'string')
			this._medicalCondition = medicalCondition;
		else if (Array.isArray(medicalCondition))
			this._medicalCondition = [...medicalCondition];
		else
			throw new Error(
				'Medical Condition must be either array of strings or string!',
			);
	}
	get id() {
		return this._id;
	}
	get illness() {
		return this._illness;
	}
	get medicalCondition() {
		return this._medicalCondition;
	}
}

class Register {
	constructor(animals, examinations) {
		if (animals === undefined) this._animals = [];
		else if (Array.isArray(animals) && typeof animals !== 'object')
			throw new Error('Animals type needs to be an array!');
		else this._animals = animals;

		if (examinations === undefined) this._examinations = [];
		else if (Array.isArray(examinations))
			throw new Error('Examinations type needs to be an array!');
		else this._examinations = [...examinations];
	}

	static get animalCount() {
		return this._animals.length;
	}
	get animals() {
		return this._animals;
	}
	get examination() {
		return this._examinations;
	}

	// Methods
	addNewAnimal(animal) {
		if (Array.isArray(animal))
			animal.forEach(item => {
				this._animals.push(item);
			});
		else if (typeof animal === 'object') this._animals.push(animal);
		else if (animals === undefined)
			throw new Error(
				'Animal not specified. You need to create an animal first!',
			);
		else throw new Error('Invalid type: Animals needs to be an object!');
	}

	addNewExamination(examination) {
		// add new examination in list
		this._examinations.push(examination);

		// update medical condition and illness of a patient
		this._animals.forEach(item => {
			if (item.id === examination.id) {
				item.addIllness(examination.illness);
				item.addMedicalCondition(examination.medicalCondition);
				return true;
			}
		});
	}
	//search methods:

	// search for animal from name, lastname or phone of the owner
	searchAnimalByOwnerOption(value, option) {
		return this.animals.forEach(item => {
			item.owner[option] === value
				? console.log(`From Search animal by ${option}: `, item)
				: `No matching Animals with this ${option}.`;
		});
	}

	// search for an owner from animal ID
	searchOwnerByAnimalId(id) {
		return this.animals.forEach(item => {
			item.id === id
				? console.log('From search owner by animal ID : ', item.owner)
				: 'No matching owner with this Animal ID.';
		});
	}
}

//test
let register = new Register();

let owner1 = new Owner('Mladen', 'Terzic', '034432534');
let owner2 = new Owner('Nemanja', 'Simic', '061232132');
let owner3 = new Owner('Mihailo', 'Lukic', '0621212132');

let animal1 = new Animal(owner1, 1);
let animal2 = new Animal(owner2, 2);
let animal3 = new Animal(owner3, 3);

// 1. add new animal to the register
register.addNewAnimal(animal1);
// add more than 1 animal at once
register.addNewAnimal([animal2, animal3]);

let examination1 = new Examination(1, 'Illness Name', 'Medical Condition Name');
let examination2 = new Examination(
	2,
	['Illness 2, Illness 3'],
	['Med Cond 2, Med Cond 3'],
);
// 2. add new examination - this also adds illness and med cond to the patient directly after the patient is examined
register.addNewExamination(examination1);
// this adds more than 1 illness and med cond as an array
register.addNewExamination(examination2);

// 3. adding illnesses to the patient directly
animal1.addIllness('New Illness');
//add as array
animal2.addIllness(['New Illness 2', 'New Illness 3']);

// 3. adding medical conditions to the patient directly
animal1.addMedicalCondition('New Medical Condition');
//add as array
animal3.addMedicalCondition([
	'New Medical Condition 2',
	'New Medical Condition 3',
]);

// 4. search for an animal by name, surname or telephone number of the owner
register.searchAnimalByOwnerOption('Mladen', 'ownerName'); // returns animal object
register.searchAnimalByOwnerOption('Simic', 'ownerSurname'); // returns animal object
register.searchAnimalByOwnerOption('0621212132', 'ownerPhone'); // returns animal object

// 5. search for the owner by the animal (ID of the animal)
register.searchOwnerByAnimalId(2);

// console.log test output
console.log(register);
