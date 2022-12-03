class Vector {
    constructor(vector) {
        this.vector = vector;
    }

    add(anotherVector) {
        let newVector = [];
        for (let i = 0; i < this.vector.length; i++) {
            newVector[i] = this.vector[i] + anotherVector.vector[i];
        }
        if (newVector.includes(NaN)) throw new Error("Not same length!")
        return newVector = new Vector(newVector);
    }

    subtract(anotherVector) {
        let newVector = [];
        for (let i = 0; i < this.vector.length; i++) {
            newVector[i] = this.vector[i] - anotherVector.vector[i];
        }
        if (newVector.includes(NaN)) throw new Error("Not same length!")
        return newVector = new Vector(newVector);
    }

    dot(anotherVector) {
        let dotProduct = 0;
        for (let i = 0; i < this.vector.length; i++) {
            dotProduct += this.vector[i] * anotherVector.vector[i];
        }
        console.log(dotProduct)
        if (!dotProduct) throw new Error("Not same length!")
        return dotProduct;
    }

    norm(){
        let norm = 0;
        for (let i = 0; i < this.vector.length; i++) {
            norm += this.vector[i] ** 2;
        }
        norm = Math.sqrt(norm);
        return norm;
    }

    toString(){
        let values = this.vector.join(',')
        return `(${values})`
    }

    equals(anotherVector){
        let maxLength = Math.max(this.vector.length, anotherVector.vector.length);
        for (let i = 0; i < maxLength; i++) {
            if (this.vector[i] !== anotherVector.vector[i]) return false;
        }
        return true;
    }
