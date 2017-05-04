
const runClubModelValidations = (ClubModelSchema) => {

    ClubModelSchema.path('id')
    .unique(true);

    ClubModelSchema.path('name')
    .required(true, 'Name is required');

    ClubModelSchema.path('address')
    .required(true, 'Address is required');

    ClubModelSchema.path('phoneNumber')
    .required(true, 'Phone number is required');

}


export default {
    runClubModelValidations : runClubModelValidations
}