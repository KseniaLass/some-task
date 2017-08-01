class Form {
    constructor($form) {
        this.form = $form;
        this.formData = this.__getData();
        this.urlRequest = ['data/success.json', 'data/error.json', 'data/progress.json'];

        this.form.find('#submitButton').on('click', (e) => {
            e.preventDefault();
            this.submit();
        });
    }
    __validate() {
        //=> { isValid: Boolean, errorFields: String[] }
        let data = this.formData;

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
    __setData(formData, validationData) {
        let fioInput = this.form.find('input[name="fio"]'),
            emailInput = this.form.find('input[name="email"]'),
            phoneInput = this.form.find('input[name="phone"]');

        fioInput.val(formData.fio);
        emailInput.val(formData.email);
        phoneInput.val(formData.phone);

        if(validationData.errorFields.indexOf('fio') >= 0) {
            fioInput.addClass('error');
        }
        if(validationData.errorFields.indexOf('email') >= 0) {
            emailInput.addClass('error');
        }
        if(validationData.errorFields.indexOf('phone') >= 0) {
            phoneInput.addClass('error');
        }
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
        console.log(this)
        let validate = this.__validate();
        let randomUrl = this.urlRequest[Math.floor(Math.random() * this.urlRequest.length)];
        if(!validate.isValid) {
            this.__setData(this.formData, validate);
            return false
        } else {

            $.ajax({
                type: 'POST',
                url: randomUrl,
                contentType: 'application/json; charset=utf-8',
                success: (data) => {
                    if(data.status === 'success') {
                        $('#resultContainer').removeClass().addClass('success').text('Success');
                    } else if (data.status === 'error') {
                        $('#resultContainer').removeClass().addClass('error').text(data.reason);
                    } else if (data.status === 'progress') {
                        $('#resultContainer').removeClass().addClass('progress').text('Progress...');
                        setTimeout(() => {this.submit();}, data.timeout);
                    }
                }, error: (data) => {
                    console.log(this)
                }
            })
        }

    }
}

var myForm = new Form($('#myForm'));