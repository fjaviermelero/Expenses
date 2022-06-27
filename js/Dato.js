class Dato{
    constructor(description, value) {
        this._description = description;
        this._value = value;
    }

    get description() {
        return this._description;
    }

    set description(value) {
        this._description = value;
    }

    get value() {
        return this._value;
    }

    set value(value) {
        this._value = value;
    }
}