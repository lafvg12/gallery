const suma = (a: number, b: number) => {
  return a + b;
};

function sum(a: number, b: number) {
  return a + b;
}

const others = sum(10, 10);
class Person {
  constructor(private age: number, private name: string) {
    this.age = age;
    this.name = name;
  }
  greeting() {
    console.log(
      `Hello, my name is ${this.name} and I am ${this.age} years old`,
    );
  }
}

// const other1 = new Person(32, 'Andres');
// other1.greeting();
// console.log(other1);
console.log(others);

class Company {
  constructor(private name: string, private address: string) {
    this.name = name;
    this.address = address;
  }
}
