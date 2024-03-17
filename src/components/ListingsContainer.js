import React, { useState, useEffect } from "react";
import ListingCard from "./ListingCard";
import NewListingForm from "./NewListingForm";

function ListingsContainer({ onSearch }) {

  const [listings, setListings] = useState([])
  const [sort, setSort] = useState("id")

  useEffect(() => {
    fetch('http://localhost:6001/listings')
      .then(response => response.json())
      .then(listings_data => setListings(listings_data))
  }, [])

  const handleDelete = (id) => {
    const updatedListings = listings.filter(listing => listing.id !== id)
    setListings(updatedListings)
  }

  const handleAddListing = (newListing) => {
    setListings([...listings, newListing])
  } 

  const listingCards = listings.filter(listing => {
    return listing.description.toLowerCase().includes(onSearch.toLowerCase())
  })
    .sort((listingA, listingB) => {
      if (sort === "id") {
        return listingA.id - listingB.id;
      } else {
        return listingA.location.localeCompare(listingB.location);
      }
    })
    .map(listing => {
      return <ListingCard key={listing.id} listing={listing} onDeleteClick={handleDelete} />
    })

  return (
    <main>
      <NewListingForm onAddListing={handleAddListing} />
      <button onClick={() => setSort("id")}>Sort By Default</button>
      <button onClick={() => setSort("location")}>Sort By Location</button>
      <ul className="cards">
        {listingCards}
      </ul>
    </main>
  );
}

export default ListingsContainer;
