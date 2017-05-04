import UserClubModel from '../../models/user-club-model';

export default {
    addUserClub(userClub) {
        userClub.save();
    }
}
