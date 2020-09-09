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
let ID = 0;

class Animal {
	constructor(owner, id) {
		// if no parameters are specified
		if (id === undefined) {
			this._id = ID;
			ID++;
		}
		// if ID is not a number
		else if (isNaN(id)) throw new Error('ID needs to be a number');
		else {
			while (id <= ID) id++;
			this._id = id;
		}

		// If owner is blank show error
		if (owner === undefined)
			throw new Error('Owner for the animal is not specified!');

		// if owner isn't an instance - object show type error
		if (typeof owner !== 'object') throw new Error('Invalid owner type!');
		// else asign value
		else this._owner = owner;

		//initialize empty ilnesses and med cond
		this._illnesses = [];
		this._medicalConditions = [];
	}
	// Setter
	set id(id) {
		this._id = id;
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

	// Adding illness
	addIllness(illness) {
		if (typeof illness === 'string') this._illnesses.push(illness);
		else if (Array.isArray(illness)) this._illnesses.push(...illness);
	}
	// Adding medical condition
	addMedicalCondition(medicalCondition) {
		if (typeof medicalCondition === 'string')
			this._medicalConditions.push(medicalCondition);
		else if (Array.isArray(medicalCondition))
			this._medicalConditions.push(...medicalCondition);
	}
}
class Examination {
	//accepts id of the patient, and illness and medical condition diagnoses after the examination is done
	constructor(id, illness, medicalCondition) {
		// if no paramaeters are specified
		if (id === undefined)
			throw new Error(
				'ID needs to be specified when creating examinations!',
			);

		if (illness === undefined)
			this._illness =
				'Nothing noticed at this examination! All good with the patient here!';

		if (medicalCondition === undefined)
			this._medicalCondition =
				'Nothing noticed at this examination! All good with the patient here!';

		// if type of ID is not a number
		if (typeof id !== 'number') throw new Error('ID needs to be a number');
		// assign if it is
		else this._id = id;

		// if illnesses and medCond are not arrays push parameter to an array

		if (typeof illness === 'string') this._illness = illness;
		// if they are array
		else if (Array.isArray(illness)) this._illness = [...illness];
		// else show type error
		else
			throw new Error(
				'Illness must be either array of strings or string!',
			);

		// same here for medicalCondition
		if (typeof medicalCondition === 'string')
			this._medicalCondition = medicalCondition;
		else if (Array.isArray(medicalCondition))
			this._medicalCondition = [...medicalCondition];
		else
			throw new Error(
				'Medical Condition must be either array of strings or string!',
			);
	}
	// Getters
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

	get animals() {
		return this._animals;
	}
	get examination() {
		return this._examinations;
	}

	// Methods
	addNewAnimal(animal) {
		if (Array.isArray(animal)) this._animals.push(...animal);
		else if (typeof animal === 'object') this._animals.push(animal);
		else if (animals === undefined)
			throw new Error(
				'Animal not specified. You need to create an animal first!',
			);
		else
			throw new Error(
				'Invalid type: Animals need to be an array of objects or object!',
			);
	}

	addNewExamination(examination) {
		// add new examination in list
		this._examinations.push(examination);

		let animal = this.animals.find(item => item.id === examination.id);

		if (animal !== undefined) {
			animal.addIllness(examination.illness);
			animal.addMedicalCondition(examination.medicalCondition);
			return true;
		}

		return false;
	}
	//search methods:

	// search for animal from name, lastname or phone of the owner
	searchAnimalByOwnerOption(value, option) {
		let animal = this.animals.find(item => item.owner[option] === value);
		if (animal !== undefined)
			console.log(`From Search animal by ${option}: `, animal);
		else console.log(`No matching Animals with this ${option}:${value}.`);
	}

	// search for an owner from animal ID
	searchOwnerByAnimalId(id) {
		let animal = this.animals.find(item => item.id === id);
		if (animal === undefined)
			return console.log(`No matching owner with this Animal ID=${id}.`);
		return console.log(
			`From search owner by animal ID, ID=${id} : `,
			animal.owner,
		);
	}
}

//test
let register = new Register();

const owner1 = new Owner('Mladen', 'Terzic', '034432534'),
	owner2 = new Owner('Nemanja', 'Simic', '061232132'),
	owner3 = new Owner('Mihailo', 'Lukic', '0621212132');

// 1. add new animal to the register

let animal1 = new Animal(owner1, 1),
	animal2 = new Animal(owner2, 2),
	animal3 = new Animal(owner3, 3),
	// animal with no ID specified
	animal4 = new Animal(owner1);

register.addNewAnimal(animal1);
// add more than 1 animal at once
register.addNewAnimal([animal2, animal3]);

// 2. add new examination - this also adds illness and med cond to the patient directly after the patient is examined
const examination1 = new Examination(
	1,
	'Illness Name',
	'Medical Condition Name',
);
const examination2 = new Examination(
	2,
	['Illness 2, Illness 3'],
	['Med Cond 2, Med Cond 3'],
);
const examination3 = new Examination(1, 'New Illness 3', 'Med Condition 3');

register.addNewExamination(examination1);
// this adds more than 1 illness and med cond as an array
register.addNewExamination(examination2);
//add to existing patient
register.addNewExamination(examination3);

console.log('Examinations after adding: ', register.examination);

// 3. adding illnesses to the patient directly
animal1.addIllness('New Illness');
// add as array
animal2.addIllness(['New Illness 2', 'New Illness 3']);

// 3. adding medical conditions to the patient directly
animal1.addMedicalCondition('New Medical Condition');
// add as array
animal3.addMedicalCondition([
	'New Medical Condition 2',
	'New Medical Condition 3',
]);

// 4. search for an animal by name, surname or telephone number of the owner
//here we specify the value and option name how it's called in Owner's get methods
register.searchAnimalByOwnerOption('Mladen', 'ownerName'); // returns animal object
register.searchAnimalByOwnerOption('Simic', 'ownerSurname'); // returns animal object
register.searchAnimalByOwnerOption('0621212132', 'ownerPhone'); // returns animal object

// 5. search for the owner by the animal (ID of the animal)
register.searchOwnerByAnimalId(2);
// search for non-existing animal
register.searchOwnerByAnimalId(233423);
