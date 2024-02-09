import { getAuth, updateProfile } from "firebase/auth";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { toast } from "react-toastify";
import { collection, doc, getDocs, orderBy, query, updateDoc, where } from "firebase/firestore";
import { db } from "../firebase";
import { FcHome } from "react-icons/fc";
import { Link } from "react-router-dom";
import ListingItem from "../components/ListingItem";

export default function Profile() {
  const auth = getAuth();
  const navigate = useNavigate();
  const storage = getStorage();

  const [changeDetails, setChangeDetails] = useState(false);
  const [listings, setListings] = useState(null);
  const [loading, setLoading] = useState(true);

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

  async function onProfilePictureChange(e) {
    const file = e.target.files[0];

    if (file) {
      try {
        const storageRef = ref(storage, `profilePictures/${auth.currentUser.uid}`);
        await uploadBytes(storageRef, file);

        const downloadURL = await getDownloadURL(storageRef);

        await updateProfile(auth.currentUser, {
          photoURL: downloadURL,
        });

        setProfilePicture(downloadURL);
      } catch (error) {
        console.error("Error uploading profile picture:", error.message);
      }
    }
  }

  useEffect(() => {
    async function fetchUserListings() {
      setLoading(true);
      const listingRef = collection(db, "listings");
      const q = query(
        listingRef,
        where("userRef", "==", auth.currentUser.uid),
        orderBy("timestamp", "desc"),
      );

      const querySnap = await getDocs(q);
      let listings = [];
      querySnap.forEach((doc) => {
        return listings.push({
          id: doc.id,
          data: doc.data(),
        });
      });
      setListings(listings);
      setLoading(false);
    }
    fetchUserListings();
  }, [auth.currentUser.uid]);

  return (
    <>
      <section className="flex flex-col items-center justify-center">
        <h1 className="text-3xl text-center mt-6 font-bold">My Profile</h1>
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
              <p className= "flex items-center">
                Do you want to change your name?
                <span
                onClick={(e) => {
                    changeDetails && onSubmit(e);
                    setChangeDetails((prevState) => !prevState);
                }}
                className="text-red-600 hover:text-red-800 transition ease-in-out duration-200 ml-1 cursor-pointer"
                >
                {changeDetails ? "Apply Change" : "Edit"}
                </span>

              </p>
              <p
                onClick={onLogOut}
                className="text-blue-600 hover:text-blue-800 transition ease-in-out duration-200 cursor-pointer"
              >
                Sign Out
              </p>
            </div>
          </form>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white uppercase px-7 py-3 text-sm font-medium rounded shadow-md hover:bg-blue-700 transition ease-in-out duration-200 active:bg-blue-800"
            >
            <Link to="/create-listing" className="flex justify-center items-center">
              <FcHome className="mr-2 text-3xl bg-red-200 rounded-full p-1 border-2" />
              <div className="flex items-center">Sell or Rent Property</div>
            </Link>
          </button>
          </div>
      </section>
      <div className="max-w-6xl px-3 mt-6 mx-auto">
              {!loading && listings.length > 0 && (
                <>
                  <h2 className="text-2xl font-semibold mb-4 text-center">My Listings</h2>
                  <ul>
                  {listings.map((listing) => {
                      return (
                        <ListingItem 
                          key={listing.id} 
                          id={listing.id}  
                          listing={listing.data} 
                        />
                      )
                    })}
                  </ul>
                </>
              )}
          </div>
    </>
  );
}