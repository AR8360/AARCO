import React, { useState } from "react";
import axios from "axios";
import { addMemberRoute } from "../utils/ApiRoutes";

// Cloudinary configurations for image upload
const cloudinaryUploadUrl =
  "https://api.cloudinary.com/v1_1/dloh7csm6/image/upload";
const cloudinaryUploadPreset = "aarcodev";

const AddMembers = () => {
  // State variables to manage form data and error messages
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [order, setOrder] = useState("");
  const [image, setImage] = useState(null); // Image file to upload
  const [errors, setErrors] = useState({}); // For storing validation errors
  const [message, setMessage] = useState(""); // Success message after submission
  const [errormsg, setErrormsg] = useState(""); // Error message from the server

  // Function to handle image file selection
  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];

    // Check if the selected file is an image
    if (selectedImage && selectedImage.type.startsWith("image/")) {
      setImage(selectedImage); // Set the selected image file
      setErrors({ ...errors, image: "" }); // Clear previous errors if the file is valid
    } else {
      setErrors({ ...errors, image: "Please select a valid image file." });
      setImage(null); // Reset the image if it's invalid
    }
  };

  // Function to validate the input fields
  const handleValidation = () => {
    let tempErrors = {};
    let isValid = true;

    // Name validation: must be at least 3 characters long
    if (name.length < 3) {
      tempErrors.name = "Name should be at least 3 characters long.";
      isValid = false;
    }

    // Email validation: must be provided
    if (!email) {
      tempErrors.email = "Email is required.";
      isValid = false;
    }

    setErrors(tempErrors); // Update the error messages
    return isValid; // Return whether the form is valid
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission

    // If the form passes validation, proceed
    if (handleValidation()) {
      try {
        let imageUrl = ""; // To store the uploaded image URL

        // If an image is selected, upload it to Cloudinary
        if (image) {
          const formData = new FormData();
          formData.append("file", image); // Append the image file to the form data
          formData.append("upload_preset", cloudinaryUploadPreset);

          // Send the image to Cloudinary and get the image URL
          const cloudinaryResponse = await axios.post(
            cloudinaryUploadUrl,
            formData
          );
          imageUrl = cloudinaryResponse.data.secure_url;
        }

        // Prepare the member data object to send to the server
        const memberData = {
          name,
          email,
          order: order,
          image: imageUrl || "", // Use the image URL if available
        };

        // Send a POST request to add the new member (replace 'addMemberRoute' with your actual API route)
        const response = await axios.post(addMemberRoute, memberData, {
          withCredentials: true, // Send cookies with the request if needed
        });

        // Check if the server responded with a success status
        if (response.data.status === true) {
          // Clear form fields on successful submission
          setName("");
          setEmail("");
          setOrder("");
          setImage(null);
          setErrors({});
          setMessage("Committee member added successfully!"); // Show success message
          
          // Clear success message after 2 seconds
          setTimeout(() => {
            setMessage("");
          }, 2000);
        } else {
          // If there's an error message from the server, show it
          setErrormsg(response.data.message);
          
          // Clear error message after 2 seconds
          setTimeout(() => {
            setErrormsg("");
          }, 2000);
        }
      } catch (error) {
        console.error("An error occurred:", error);
        setErrormsg("An error occurred. Please try again."); // Show general error message
        setTimeout(() => {
          setErrormsg("");
        }, 2000);
      }
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-5">Add Member</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name input field */}
        <div>
          <label htmlFor="name" className="block mb-1">
            Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="Enter member's name"
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name}</p>
          )}
        </div>

        {/* Image upload field */}
        <div>
          <label htmlFor="image" className="block mb-1">
            Upload Image
          </label>
          <input
            type="file"
            id="image"
            onChange={handleImageChange}
            className="w-full p-2 border rounded"
            accept="image/*"
          />
          {errors.image && (
            <p className="text-red-500 text-sm mt-1">{errors.image}</p>
          )}
        </div>

        {/* Email input field */}
        <div>
          <label htmlFor="email" className="block mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="Enter member's email"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}
        </div>

        {/* Order input field */}
        <div>
          <label htmlFor="order" className="block mb-1">
            Order
          </label>
          <input
            type="number"
            id="order"
            value={order}
            onChange={(e) => setOrder(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="Enter order number default 10."
          />
          {errors.order && (
            <p className="text-red-500 text-sm mt-1">{errors.order}</p>
          )}
        </div>

        {/* Success and error messages */}
        {message && <p className="text-green-500 text-sm mt-1">{message}</p>}
        {errormsg && <p className="text-red-500 text-sm mt-1">{errormsg}</p>}

        {/* Submit button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddMembers;
