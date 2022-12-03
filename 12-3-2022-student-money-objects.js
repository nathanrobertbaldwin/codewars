class Student {
    constructor(name, fives, tens, twenties) {
      this.name = name;
      this.fives = fives;
      this.tens = tens;
      this.twenties = twenties;
    }
  }

function _sumMoney (student) {
    let sum = student.fives * 5 + student.tens * 10 + student.twenties * 20;
    return sum;
}

function _findMostMoneyIndex (moneyArray) {

    let mostMoney = -Infinity;
    let mostMoneyIndex = -1;

    moneyArray.forEach((element, index) => {
        if (element > mostMoney) {
            mostMoney = element;
            mostMoneyIndex = index;
        }
    })

    return mostMoneyIndex;
}

function mostMoney(students) {

    if (students.length === 0) return null;
    if (students.length === 1) return students[0].name;

    let totalMoneyPerStudent = [];

    students.forEach((student, index) => {
        totalMoneyPerStudent.push(_sumMoney(student));
    });

    mostMoneyIndex = (_findMostMoneyIndex(totalMoneyPerStudent))
    return students[mostMoneyIndex].name;

}

const andy = new Student("Andy", 0, 0, 2);
const stephen = new Student("Stephen", 0, 4, 0);
const eric = new Student("Eric", 8, 1, 0);
const david = new Student("David", 2, 0, 1);
const phil = new Student("Phil", 0, 2, 1);
const cam = new Student("Cameron", 2, 2, 0);
const geoff = new Student("Geoff", 0, 3, 0);

console.log(mostMoney([cam, geoff]))
