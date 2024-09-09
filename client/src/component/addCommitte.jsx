import React, { useState } from "react";
import axios from "axios";
import { createCommitteeRoute } from "../utils/ApiRoutes"; // Updated to import the correct route

const cloudinaryUploadUrl =
  "https://api.cloudinary.com/v1_1/dloh7csm6/image/upload";
const cloudinaryUploadPreset = "aarcodev";

const AddCommitteMember = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [order, setOrder] = useState("");
  const [image, setImage] = useState(null);
  const [contact, setContact] = useState("");
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const [errormsg, setErrormsg] = useState("");

  // Handle image selection
  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];

    if (selectedImage && selectedImage.type.startsWith("image/")) {
      setImage(selectedImage);
      setErrors((prevErrors) => ({ ...prevErrors, image: "" })); // Clear image errors
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        image: "Please select a valid image file.",
      }));
      setImage(null);
    }
  };

  // Validate form fields
  const handleValidation = () => {
    let tempErrors = {};
    let isValid = true;

    if (name.length < 3) {
      tempErrors.name = "Name should be at least 3 characters long.";
      isValid = false;
    }

    if (!email) {
      tempErrors.email = "Email is required.";
      isValid = false;
    }

    if (!order || isNaN(order)) {
      tempErrors.order = "Order must be a valid number.";
      isValid = false;
    }

    if (!contact) {
      tempErrors.contact = "Contact is required.";
      isValid = false;
    }

    setErrors(tempErrors);
    return isValid;
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (handleValidation()) {
      try {
        let imageUrl = "";

        // Handle image upload if an image is selected
        if (image) {
          const formData = new FormData();
          formData.append("file", image);
          formData.append("upload_preset", cloudinaryUploadPreset);

          const cloudinaryResponse = await axios.post(
            cloudinaryUploadUrl,
            formData
          );
          imageUrl = cloudinaryResponse.data.secure_url;
        }

        // Prepare data to send to the backend
        const memberData = {
          name,
          email,
          order: parseInt(order),
          image: imageUrl || "",
          contact,
        };

        // Post the data to the backend
        const response = await axios.post(createCommitteeRoute, memberData, {
          withCredentials: true,
        });

        if (response.data.status === true) {
          setName("");
          setEmail("");
          setOrder("");
          setContact("");
          setImage(null);
          setErrors({});
          setMessage("Committee member added successfully!");
        } else {
          setErrormsg(response.data.message);
        }
      } catch (error) {
        console.error("An error occurred:", error);
        setErrormsg("An error occurred. Please try again.");
      }

    //  Clear messages after 2 seconds
      setTimeout(() => {
        setMessage("");
        setErrormsg("");
      }, 3000);
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-5">Add Committee Member</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
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

        <div>
          <label htmlFor="contact" className="block mb-1">
            Contact
          </label>
          <input
            type="text"
            id="contact"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="Enter contact number"
          />
          {errors.contact && (
            <p className="text-red-500 text-sm mt-1">{errors.contact}</p>
          )}
        </div>

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
            placeholder="Enter order number"
          />
          {errors.order && (
            <p className="text-red-500 text-sm mt-1">{errors.order}</p>
          )}
        </div>

        {message && <p className="text-green-500 text-sm mt-1">{message}</p>}
        {errormsg && <p className="text-red-500 text-sm mt-1">{errormsg}</p>}

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

export default AddCommitteMember;
