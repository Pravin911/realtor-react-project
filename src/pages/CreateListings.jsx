import { useState } from "react"

export default function CreateListings() {

    const [formData, setFormData] = useState({
        type: "rent",
        name: "",
        bedrooms: 1,
        bathrooms: 1,
        parking: false,
        furnished: false,
        address: "",
        description: "",
        offer: false,
        regularPrice: 0,
        discountedPrice: 0
    })

    const { type, name, bedrooms, bathrooms, parking, furnished, address, description, offer, regularPrice, discountedPrice } = formData;

  function onChange() {

  }

  return (
    <main className="max-w-md px-2 mx-auto">
        <h1 className="text-3xl text-center mt-6 font-bold ">Create Listings</h1>
        <form >
            <p className="text-lg mt-6 font-semibold">Sell / Rent</p>
            <div className="flex">
                <button 
                    type="button" id="type" value="sale"
                    onClick={onChange}
                    className={`mr-3 px-7 py-3 font-medium text-sm uppercase shadow-sm rounded
                    hover:shadow-md focus:shadow-lg active:shadow-lg transition duration-150
                    ease-in-out w-full ${type === "sale" ? "bg-white text-black" : "bg-slate-600 text-white"} `}
                >
                    Sell
                </button>
                <button 
                    type="button" id="type" value="rent"
                    onClick={onChange}
                    className={`px-7 py-3 font-medium text-sm uppercase shadow-sm rounded
                    hover:shadow-md focus:shadow-lg active:shadow-lg transition duration-150
                    ease-in-out w-full ${type === "rent" ? "bg-white text-black" : "bg-slate-600 text-white"} `}
                >
                    Rent
                </button>
            </div>
            <p className="text-lg mt-6 font-semibold">Name</p>
            <input type="text" id="name" placeholder="Name" value={name} maxLength={32} minLength={10} required
            onChange={onChange} className="w-full px-4 py-2 text-xl text-gray-700 bg-white border-[1px] border-gray-300 rounded transition ease-in-out
             focus:text-gray-700 focus:bg-white mb-6"
            />

            <div className="flex space-x-6 mb-6">
                <div>
                    <p className="w-full text-lg font-semibold">Beds</p>
                    <input 
                    type="number" id="bedrooms" value={bedrooms} min="1" max="50" required
                    onChange={onChange} minLength={1} 
                    className="px-4 py-2 text-xl text-gray-700 bg-white border-[1px] border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 text-center"/>
                </div>
                <div>
                    <p className="w-full text-lg font-semibold">Baths</p>
                    <input 
                    type="number" id="bathrooms" value={bathrooms} min="1" max="50" required
                    onChange={onChange} minLength={1} 
                    className="px-4 py-2 text-xl text-gray-700 bg-white border-[1px] border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 text-center"/>
                </div>
            </div>

            <p className="text-lg mt-6 font-semibold">Parking Spot</p>
            <div className="flex">
                <button 
                    type="button" id="parking" value={true}
                    onClick={onChange}
                    className={`mr-3 px-7 py-3 font-medium text-sm uppercase shadow-sm rounded
                    hover:shadow-md focus:shadow-lg active:shadow-lg transition duration-150
                    ease-in-out w-full ${!parking ? "bg-white text-black" : "bg-slate-600 text-white"} `}
                >
                    Yes
                </button>
                <button 
                    type="button" id="parking" value={false}
                    onClick={onChange}
                    className={`px-7 py-3 font-medium text-sm uppercase shadow-sm rounded
                    hover:shadow-md focus:shadow-lg active:shadow-lg transition duration-150
                    ease-in-out w-full ${parking ? "bg-white text-black" : "bg-slate-600 text-white"} `}
                >
                    No
                </button>
            </div>

            <p className="text-lg mt-6 font-semibold">Furnished</p>
            <div className="flex">
                <button 
                    type="button" id="furnished" value={true}
                    onClick={onChange}
                    className={`mr-3 px-7 py-3 font-medium text-sm uppercase shadow-sm rounded
                    hover:shadow-md focus:shadow-lg active:shadow-lg transition duration-150
                    ease-in-out w-full ${!furnished ? "bg-white text-black" : "bg-slate-600 text-white"} `}
                >
                    Yes
                </button>
                <button 
                    type="button" id="furnished" value={false}
                    onClick={onChange}
                    className={`px-7 py-3 font-medium text-sm uppercase shadow-sm rounded
                    hover:shadow-md focus:shadow-lg active:shadow-lg transition duration-150
                    ease-in-out w-full ${furnished ? "bg-white text-black" : "bg-slate-600 text-white"} `}
                >
                    No
                </button>
            </div>

            <p className="text-lg mt-6 font-semibold">Address</p>
            <input type="text" id="address" placeholder="Address" value={address} required
            onChange={onChange} className="w-full px-4 py-2 text-xl text-gray-700 bg-white border-[1px] border-gray-300 rounded transition ease-in-out
             focus:text-gray-700 focus:bg-white mb-6"
            />

            <p className="text-lg font-semibold">Description</p>
            <input type="text" id="description" placeholder="Description" value={description} required
            onChange={onChange} className="w-full px-4 py-2 text-xl text-gray-700 bg-white border-[1px] border-gray-300 rounded transition ease-in-out
             focus:text-gray-700 focus:bg-white mb-6"
            />

            <p className="text-lg font-semibold">Offer</p>
            <div className="flex mb-6">
                <button 
                    type="button" id="offer" value={true}
                    onClick={onChange}
                    className={`mr-3 px-7 py-3 font-medium text-sm uppercase shadow-sm rounded
                    hover:shadow-md focus:shadow-lg active:shadow-lg transition duration-150
                    ease-in-out w-full ${!offer ? "bg-white text-black" : "bg-slate-600 text-white"} `}
                >
                    Yes
                </button>
                <button 
                    type="button" id="offer" value={false}
                    onClick={onChange}
                    className={`px-7 py-3 font-medium text-sm uppercase shadow-sm rounded
                    hover:shadow-md focus:shadow-lg active:shadow-lg transition duration-150
                    ease-in-out w-full ${offer ? "bg-white text-black" : "bg-slate-600 text-white"} `}
                >
                    No
                </button>
            </div>

            <div className="flex items-center mb-6">
                <div className="flex flex-col">
                    <p className="text-lg font-semibold">Regular Price</p>
                    <div className="flex w-full justify-center items-center space-x-6">
                        <input
                            type="number"
                            id="regularPrice"
                            value={regularPrice}
                            onChange={onChange}
                            min={50}
                            max={400000000}
                            required
                            className="w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600"
                        />
                        {type === "rent" && (
                            <div className="text-red w-full whitespace-nowrap">
                                <p>$ / Month</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            
            {offer && (
                <div className="flex items-center mb-6">
                <div className="flex flex-col">
                    <p className="text-lg font-semibold">Discounted Price</p>
                    <div className="flex w-full justify-center items-center space-x-6">
                        <input
                            type="number"
                            id="discountedPrice"
                            value={discountedPrice}
                            onChange={onChange}
                            min={50}
                            max={400000000}
                            required={offer}
                            className="w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600"
                        />
                        {type === "rent" && (
                            <div className="text-red w-full whitespace-nowrap">
                                <p>$ / Month</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            )}

            <div className="mb-6">
                <p className="text-lg font-semibold">Images</p>
                <p className="text-gray-600">The first image will be the cover (max 6)</p>
                <input type="file" id="images" onChange={onChange} accept=".jpg, .png, .jpeg"
                multiple required className="w-full px-3 py-1.5 text-gray-700 bg-white border border-gray-300 rounded transition ease-in-out
                focus:bg-white focus:border-slate-600
                "/>
            </div>

            <button type="submit" className="mb-6 w-full px-7 py-3 bg-blue-600 text-white font-medium
                text-sm uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg
                focus:bg-blue-700 focus:shadow-lg active:bg-blue-800 active:shadow-lg
                transition duration-150 ease-in-out">
                    Create Listing
            </button>

        </form>
    </main>
  )
}
