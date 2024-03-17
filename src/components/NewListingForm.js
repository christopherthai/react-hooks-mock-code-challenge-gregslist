import React, { useState} from 'react'

function NewListingForm({ onAddListing }) {

  const [formData, setFormData] = useState({
    description: "",
    image: "",
    location: ""
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    fetch('http://localhost:6001/listings', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(newListing => onAddListing(newListing))
  }

  return (
    <form onSubmit={handleSubmit} className="new-listing-form">
      <h2>New Listing</h2>
      <label>
        Description:
        <input 
          type="text" 
          name="description" 
          value={formData.description} 
          onChange={(e) => setFormData({...formData, description: e.target.value})} 
        />
      </label>
      <label>
        Image URL:
        <input 
          type="text" 
          name="image" 
          value={formData.image} 
          onChange={(e) => setFormData({...formData, image: e.target.value})} 
        />
      </label>
      <label>
        Location:
        <input 
          type="text" 
          name="location" 
          value={formData.location} 
          onChange={(e) => setFormData({...formData, location: e.target.value})} 
        />
      </label>
      <button type="submit">Add Listing</button>
    </form>
  )
}

export default NewListingForm