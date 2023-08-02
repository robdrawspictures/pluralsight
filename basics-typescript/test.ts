class Person {
	name: string;
	hobby: string;

	constructor(name: string, hobby: string) {
		this.name = name;
		this.hobby = hobby;
	}

	introduce() {
		return `My name is ${this.name}, and I like to ${this.hobby}.`;
	}
}

// create new instance and call function
let testPerson = new Person("Sneed", "feed");
let testMessage = testPerson.introduce();

// change web page text
let newText = document.querySelector("h1");
newText!.textContent = testMessage;
