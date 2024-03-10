import { useEffect } from 'react';
import { userLogIn } from '../../Redux/Actions/UserGet';
import Cookies from "js-cookie";
import { useAppDispatch, useAppSelector } from '../../Redux/Store/hooks';
// import { UserState } from '../../Redux/Actions/UserSlice';
import '../../scss/components/userProfile.scss';

interface UserProfileModel {
  email: string;
  id: string;
}

const UserProfile = () => {
  const userActive: UserProfileModel = useAppSelector((state: any) => state.user).userData;
  // console.log(userActive.accessToken);
  // const user: UserProfileModel = userActive.userData
  const dispatch = useAppDispatch()
  useEffect(() => {
    const token = Cookies.get("data");
    if (token && !userActive.id) {
      dispatch(userLogIn(null, token));
    }

  }, [dispatch]);
  console.log(userActive);

  return (
    <div className='userPContainer'>
      <div className="user-profile">
        <h2>User Profile</h2>
        <div className="profile-info">
          <p><strong>Name:</strong> {userActive.email}</p>
          <hr />
          <p><strong>UsderId:</strong> {userActive.id}</p>
        </div>
      </div>
    </div>

  );
};

export default UserProfile;