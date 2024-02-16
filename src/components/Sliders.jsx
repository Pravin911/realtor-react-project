import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import { useState, useEffect } from "react";
import Spinner from "../components/Spinner";
import { db } from "../firebase";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { useNavigate } from "react-router-dom";
import "../styles/slider.css"; // Import custom CSS for slider

export default function Slider() {
  const [listings, setListings] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchListings() {
      const listingsRef = collection(db, "listings");
      const q = query(listingsRef, orderBy("timestamp", "desc"), limit(5));
      const querySnap = await getDocs(q);
      const fetchedListings = querySnap.docs.map(doc => ({
        id: doc.id,
        data: doc.data()
      }));
      setListings(fetchedListings);
      setLoading(false);
    }
    fetchListings();
  }, []);

  if (loading) {
    return <Spinner />;
  }

  if (!listings || listings.length === 0) {
    return null;
  }

  return (
    <AliceCarousel
      autoPlay
      autoPlayInterval={3000}
      disableButtonsControls
      infinite
      mouseTracking
    >
      {listings.map(({ data, id }) => (
        <div
          key={id}
          onClick={() => navigate(`/category/${data.type}/${id}`)}
          className="item rounded-image" // Apply rounded corners to the image
          style={{
            backgroundImage: `url(${data.imgUrls[0]})`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundSize: "cover",
            height: "330px", // Increase the image height
          }}
        >
          <p className="text-[#f1faee] absolute left-1 top-3 font-medium max-w-[90%] bg-[#457b9d] shadow-lg opacity-90 p-2 rounded-br-3xl">
            {data.name}
          </p>
          <p className="text-[#f1faee] absolute left-1 bottom-1 font-semibold max-w-[90%] bg-[#e63946] shadow-lg opacity-90 p-2 rounded-tr-3xl">
            ${data.discountedPrice ?? data.regularPrice}
            {data.type === "rent" && " / month"}
          </p>
        </div>
      ))}
    </AliceCarousel>
  );
}
