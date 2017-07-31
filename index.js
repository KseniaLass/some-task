class Form {
    contstructor($form) {
        this.form = $form;

        this.form.find('#submitButton').on('click', (e) => {
            e.preventDefault();
            return false
           this.submit();
        });
    }
    __validate() {
        //=> { isValid: Boolean, errorFields: String[] }
    }
    __getData() {
        //=> Object
    }
    setData(Object) {
        //=> undefined
    }
    submit() {
        //=> undefined
        console.log('here');
    }
}

var myForm = new Form($('#myForm'));

$('#submitButton').on('click', (e) => {
    e.preventDefault();
    myFormExample.submit();
});
