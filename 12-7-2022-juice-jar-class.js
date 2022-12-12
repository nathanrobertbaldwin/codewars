class Jar {
  constructor (volume = 0, ingredients = {}) {
    this.volume = volume;
    this.ingredients = ingredients;
  }

  add (amount, type) {
    this.volume += amount;
    if (type in this.ingredients) this.ingredients[type] += amount;
    else this.ingredients[type] = amount;
  }

  pourOut (amount) {

    if (amount === this.volume) this.ingredients = {};

    let factor = (this.volume - amount) / this.volume;

    for (let type in this.ingredients) {
      this.ingredients[type] *= factor;
    }

    this.volume -= amount;
  }

  //   let numJuices = Object.keys(this.ingredients).length;
  //   let toDecrease = amount / numJuices;
  //   for(let key in this.ingredients){
  //     this.ingredients[key] -= toDecrease;
  //   }

  //   this.volume -= amount;
  // };

  getTotalAmount () {
    return this.volume;
  }

  getConcentration(type){
    if (this.volume === 0) return 0;
    if (!(type in this.ingredients)) return 0;
    return this.ingredients[type] / this.volume;
  }
}


let jar = new Jar();
jar.add(200, "apple juice")
jar.add(100, "orange juice")
jar.pourOut(50);
console.log(jar)
