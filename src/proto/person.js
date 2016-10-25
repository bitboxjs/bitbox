export default class User {
	constructor(bit) {
		this.id = bit.id,
		this.profile = bit.profile
	}
	fullName() {
		return this.profile.firstName + ' ' + this.profile.lastName
	}
}

// result === person
