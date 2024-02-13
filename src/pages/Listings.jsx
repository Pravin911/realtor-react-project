import { doc, getDoc } from "firebase/firestore";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Spinner from "../components/Spinner";
import { db } from "../firebase";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Define the Listings component
export default function Listings() {
    // Define state variables
    const params = useParams();
    const [listing, setListing] = useState(null);
    const [loading, setLoading] = useState(true);

    // Fetch listing data from Firestore
    useEffect(() => {
        async function fetchListing() {
            try {
                const docRef = doc(db, "listings", params.listingId);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setListing(docSnap.data());
                }
            } catch (error) {
                console.error("Error fetching listing:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchListing();
    }, [params.listingId]);

    // Render the Spinner component if data is still loading
    if (loading) {
        return <Spinner />;
    }

    // Define the settings for the Slider
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
        // Add any additional settings as needed
    };

    // Render the main component with the Slider component and listing image URLs
    return (
        <main>
            <Slider {...settings}>
                {listing.imgUrls.map((url, index) => (
                    <div key={index}>
                        <img src={url} alt={`Slide ${index + 1}`} />
                    </div>
                ))}
            </Slider>
        </main>
    );
}
