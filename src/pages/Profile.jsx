import { getAuth, updateProfile } from "firebase/auth";
import { useState } from "react";
import { useNavigate } from "react-router";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
<<<<<<<<< Temporary merge branch 1
=========
import { toast } from "react-toastify";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
>>>>>>>>> Temporary merge branch 2

export default function Profile() {
  const auth = getAuth();
  const navigate = useNavigate();
  const storage = getStorage();

<<<<<<<<< Temporary merge branch 1
=========
  const [changeDetails, setChangeDetails] = useState(false);

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

<<<<<<<<< Temporary merge branch 1
=========
  function onChange(e) {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  }

  async function onSubmit(e) {
    e.preventDefault();

    try {
      if (auth.currentUser) {
        if (auth.currentUser.displayName !== formData.username) {
          await updateProfile(auth.currentUser, {
            displayName: formData.username,
          });
        }
        const docRef = doc(db, "users", auth.currentUser.uid);
        await updateDoc(docRef, {
          username: formData.username,
        });
        toast.success("Profile updated");
      }
    } catch (error) {
      toast.error("Could not update profile");
    }
  }

>>>>>>>>> Temporary merge branch 2
  async function onProfilePictureChange(e) {
    const file = e.target.files[0];

    if (file) {
      try {
<<<<<<<<< Temporary merge branch 1
        // Upload the file to Firebase Storage
        const storageRef = ref(storage, `profilePictures/${auth.currentUser.uid}`);
        await uploadBytes(storageRef, file);

        // Get the download URL of the uploaded file
        const downloadURL = await getDownloadURL(storageRef);

        // Update the user's profile with the new photo URL
=========
        const storageRef = ref(storage, `profilePictures/${auth.currentUser.uid}`);
        await uploadBytes(storageRef, file);

        const downloadURL = await getDownloadURL(storageRef);

>>>>>>>>> Temporary merge branch 2
        await updateProfile(auth.currentUser, {
          photoURL: downloadURL,
        });

<<<<<<<<< Temporary merge branch 1
        // Update the local state to reflect the changes
=========
>>>>>>>>> Temporary merge branch 2
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

<<<<<<<<< Temporary merge branch 1
          <form className="">
            <input
              type="text"
              id="name"
              placeholder="Name"
              value={username}
              disabled
              className="w-full px-4 py-2 text-xl text-gray-700 bg-white border-[1px] border-gray-300 rounded transition ease-in-out mb-6"
=========
          <form onSubmit={onSubmit}>
            <input
              type="text"
              id="username"
              placeholder="Name"
              value={username}
              disabled={!changeDetails}
              onChange={onChange}
              className={`w-full px-4 py-2 text-xl text-gray-700 bg-white border-[1px] border-gray-300 rounded transition ease-in-out mb-6 ${
                changeDetails && "bg-red-200 focus:bg-red-200"
              }`}
>>>>>>>>> Temporary merge branch 2
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
<<<<<<<<< Temporary merge branch 1
                <span className="text-red-600 hover:text-red-800 transition ease-in-out duration-200 ml-1 cursor-pointer">
                  Edit
                </span>
=========
                <span
                  onClick={(e) => {
                    changeDetails && onSubmit(e);
                    setChangeDetails((prevState) => !prevState);
                  }}
                  className="text-red-600 hover:text-red-800 transition ease-in-out duration-200 ml-1 cursor-pointer"
                >
                  {changeDetails ? "Apply Change" : "Edit"}
                </span>


>>>>>>>>> Temporary merge branch 2
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
<<<<<<<<< Temporary merge branch 1
}
=========
}
>>>>>>>>> Temporary merge branch 2
