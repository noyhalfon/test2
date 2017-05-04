const runManagerValidations = (ManagerSchema) => {

    ManagerSchema.path('id')
    .unique(true);

    ManagerSchema.path('firstName')
    .required(true, 'First name is required');
    
    ManagerSchema.path('lastName')
    .required(true, 'Last name is required');

    ManagerSchema.path('password')
    .required(true, 'Password is required')
    .validate(pswdValue => pswdValue.length > 6, 'Minimum six characters');

    ManagerSchema.path('email')
    .required(true, 'Email is required')
    .unique(true)
    .validate(emailValue => {
        return /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/.test(emailValue);
    }, 'Email is invalid');
}

export default {
    runManagerValidations : runManagerValidations
}