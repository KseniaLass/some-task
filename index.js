class Form {
    constructor($form) {
        this.form = $form;

        this.form.find('#submitButton').on('click', (e) => {
            e.preventDefault();
            this.submit();
        });
    }
    __validate() {
        //=> { isValid: Boolean, errorFields: String[] }
        let data = this.__getData();

        let isValid = true,
            errorFields = [];

        if (!this.__checkFIO(data.fio)) {
            errorFields.push('fio');
        }
        if(!this.__checkPhone(data.phone)) {
            errorFields.push('phone');
        }
        if(!this.__checkEmail(data.email)) {
            errorFields.push('email');
        }
        if(errorFields.length) {
            isValid = false;
        }
        return {
            isValid: isValid,
            errorFields: errorFields
        }
    }
    __getData() {
        //=> Object
        let inputsValue = {};

        this.form.find('input').each(function() {
            let name = $(this).attr('name'),
                type = $(this).attr('type'),
                value = $(this).val();
           if(type !== 'submit') {
               inputsValue[name] = value;
           }
        });
        return inputsValue;
    }
    __setData(Object) {
        //=> undefined
    }
    __checkFIO(value) {
        if(value.split(' ').length === 3) {
            return true
        }
    }
    __checkPhone(value) {
        let replaceAllSpace = value.replace(/\s/g, ''),
            replaceAllExceptNumber = value.replace(/[^\d]/g, ''),
            regexp = /^\+7\(\d{3}\)(\d{3})-(\d{2})-(\d{2})/,
            amount = 0;

        for(var i=0; i < replaceAllExceptNumber.length; i++) {
            let number = parseInt(replaceAllExceptNumber[i]);
            amount = amount + number;
        }

        if(regexp.test(replaceAllSpace) && amount <= 30) {
            return true
        }
    }
    __checkEmail(value) {
        let regexp = /^([a-zA-Z0-9_.+-])+\@(ya(ndex)?\.)+(ru|ua|by|kz|com)/g;
        if(regexp.test(value)) {
            return true
        }
    }
    submit() {
        //=> undefined
        let validate = this.__validate();
        if(validate.isValid) {
            console.log('request')
        } else {

        }
    }
}

var myForm = new Form($('#myForm'));