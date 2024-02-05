import { getAuth, updateProfile } from "firebase/auth";
import { useState } from "react";
import { useNavigate } from "react-router";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

export default function Profile() {
  const auth = getAuth();
  const navigate = useNavigate();
  const storage = getStorage();

  const [formData, setFormData] = useState({
    username: auth.currentUser.displayName,
    email: auth.currentUser.email,
  });

  const { username, email } = formData;
  const [profilePicture, setProfilePicture] = useState(auth.currentUser.photoURL);

  function onLogOut() {
    auth.signOut();
    navigate("/");
  }

  async function onProfilePictureChange(e) {
    const file = e.target.files[0];

    if (file) {
      try {
        // Upload the file to Firebase Storage
        const storageRef = ref(storage, `profilePictures/${auth.currentUser.uid}`);
        await uploadBytes(storageRef, file);

        // Get the download URL of the uploaded file
        const downloadURL = await getDownloadURL(storageRef);

        // Update the user's profile with the new photo URL
        await updateProfile(auth.currentUser, {
          photoURL: downloadURL,
        });

        // Update the local state to reflect the changes
        setProfilePicture(downloadURL);
      } catch (error) {
        console.error("Error uploading profile picture:", error.message);
      }
    }
  }

  return (
    <>
      <section className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-3xl text-center mt-6 font-bold text-white">My Profile</h1>
        <div className="w-full md:w-[50%] mt-6 px-3">
          <div className="flex items-center flex-col mb-6">
            {profilePicture && (
              <img
                src={profilePicture}
                alt="Profile"
                className="rounded-full h-32 w-32 mb-2 border-4 border-white"
              />
            )}
            <label className="text-white block mb-2 cursor-pointer">
              Change Profile Picture
              <input
                type="file"
                accept="image/*"
                onChange={onProfilePictureChange}
                className="hidden"
              />
            </label>
          </div>

          <form className="">
            <input
              type="text"
              id="name"
              placeholder="Name"
              value={username}
              disabled
              className="w-full px-4 py-2 text-xl text-gray-700 bg-white border-[1px] border-gray-300 rounded transition ease-in-out mb-6"
            />

            <input
              type="email"
              id="email"
              placeholder="Email"
              value={email}
              disabled
              className="w-full px-4 py-2 text-xl text-gray-700 bg-white border-[1px] border-gray-300 rounded transition ease-in-out mb-6"
            />

            <div className="flex justify-between whitespace-nowrap text-sm sm:text-lg mb-6">
              <p className="text-white flex items-center">
                Do you want to change your name?
                <span className="text-red-600 hover:text-red-800 transition ease-in-out duration-200 ml-1 cursor-pointer">
                  Edit
                </span>
              </p>
              <p
                onClick={onLogOut}
                className="text-white hover:text-blue-800 transition ease-in-out duration-200 cursor-pointer"
              >
                Sign Out
              </p>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}
