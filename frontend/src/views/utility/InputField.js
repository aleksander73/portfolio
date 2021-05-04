class InputField {
    constructor(id, inputType, icon, placeholder) {
        this.id = id;
        this.inputType = inputType;
        this.icon = icon;
        this.placeholder = placeholder || '';
        this.value = '';
    }

}

export default InputField;
