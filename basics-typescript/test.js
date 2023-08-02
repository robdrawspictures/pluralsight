var Person = /** @class */ (function () {
    function Person(name, hobby) {
        this.name = name;
        this.hobby = hobby;
    }
    Person.prototype.introduce = function () {
        return "My name is ".concat(this.name, ", and I like to ").concat(this.hobby, ".");
    };
    return Person;
}());
// create new instance and call function
var testPerson = new Person("Sneed", "feed");
var testMessage = testPerson.introduce();
// change web page text
var newText = document.querySelector("h1");
newText.textContent = testMessage;
