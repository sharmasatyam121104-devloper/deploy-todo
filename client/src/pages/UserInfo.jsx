import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserProfile } from '../features/user/userSlice'; // ✅ import karna na bhoolna

const UserInfo = () => {
  const dispatch = useDispatch();
  const { profile, loading } = useSelector((state) => state.user);
  // console.log(profile?.data?.profilePicture);
  // console.log(profile);
  const profileImg = profile?.data?.profilePicture?.replace(/\\/g, "/");
  // console.log("proimg",profileImg);

  useEffect(() => {
    dispatch(getUserProfile());  // ✅ ye zaruri hai
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <div className="flex items-center justify-center gap-4 mb-1">
        <img
  src={`http://localhost:3000/${profileImg}`}
  alt="profile"
  className="w-16 h-16 rounded-full shadow-md"
/>

        <div>
          <h2 className="font-bold text-xl text-gray-800">
            {profile?.data?.username || "Guest"}
          </h2>
          <p className="text-gray-600">{profile?.data?.email || "No email"}</p>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
