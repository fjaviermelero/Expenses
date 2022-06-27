class Gasto extends Dato{

    static contadorGastos = 0;

    constructor(description, value) {
        super(description, value);
        this._id = ++Gasto.contadorGastos;
    }

    get id() {
        return this._id;
    }
}