const runCustomerValidations = (CustomerSchema) => {

    CustomerSchema.path('id')
    .unique(true);

    CustomerSchema.path('firstName')
    .required(true, 'First name is required');

    CustomerSchema.path('lastName')
    .required(true, 'Last name is required');

    CustomerSchema.path('password')
    .required(true, 'Password is required')
    .validate(pswdValue => pswdValue.length > 6, 'Minimum six characters');

    CustomerSchema.path('email')
    .validate(emailValue => {
        return /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/.test(emailValue);
    }, 'Email is invalid')
    .required(true, 'Email is required')
    .unique(true);

    CustomerSchema.path('phoneNumber')
    .required(true, 'Last name is required');

    CustomerSchema.path('birthday')
    .required(true, 'Birthday is required');
}

export default {
    runCustomerValidations: runCustomerValidations
}