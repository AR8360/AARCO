import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Add the axios import for API calls
import { addRetrimentRoute } from "../utils/ApiRoutes";
const AddRetirement = () => {
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [date, setDate] = useState("");
  const [order, setOrder] = useState("");
  const [content, setContent] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  // Cloudinary configuration
  const cloudinaryUploadUrl =
    "https://api.cloudinary.com/v1_1/dloh7csm6/image/upload";
  const cloudinaryUploadPreset = "aarcodev";

  const handleValidation = () => {
    let tempErrors = {};
    let isValid = true;

    if (!name) {
      tempErrors.name = "Name is required.";
      isValid = false;
    }

    if (!email) {
      tempErrors.email = "Email is required.";
      isValid = false;
    }

    if (!date) {
      tempErrors.date = "Date is required.";
      isValid = false;
    }

    setErrors(tempErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (handleValidation()) {
      try {
        // Upload image to Cloudinary
        let imageUrl = "";
        if (image.length > 0) {
          const formData = new FormData();
          formData.append("file", image);
          formData.append("upload_preset", cloudinaryUploadPreset);

          const cloudinaryResponse = await axios.post(
            cloudinaryUploadUrl,
            formData
          );
          imageUrl = cloudinaryResponse.data.secure_url;
        }

        // Data to be sent to backend
        const memberData = {
          name,
          image: imageUrl,
          email,
          date,
          contact,
          order,
          content,
        };

        const response = await axios.post(addRetrimentRoute, memberData, {
          withCredentials: true,
        });
        console.log(response.data);

        if (response.data.status === false) {
          console.error("Error:", response.data.msg);
        } else if (response.data.status === true) {
          console.log("Member added successfully!", response.data);
          navigate("/members"); // Redirect to members page
        }
      } catch (error) {
        console.error("Error adding member:", error.message);
      }
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Add Retired Member</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 font-bold mb-2">
            Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="Enter name"
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
        </div>

        <div className="mb-4">
          <label htmlFor="image" className="block text-gray-700 font-bold mb-2">
            Upload Image
          </label>
          <input
            type="file"
            id="image"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full p-2 border rounded"
          />
          {errors.image && (
            <p className="text-red-500 text-sm">{errors.image}</p>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="Enter email"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email}</p>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="order" className="block text-gray-700 font-bold mb-2">
            Contact
          </label>
          <input
            type="number"
            id="contact"
            value={contact}
            onChange={(e) => setOrder(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="Enter Contact number"
          />
          {errors.order && (
            <p className="text-red-500 text-sm">{errors.contact}</p>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="order" className="block text-gray-700 font-bold mb-2">
            Date of Working
          </label>
          <input
            type="number"
            id="date"
            value={date}
            onChange={(e) => setOrder(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="dd/mm/yyyy- dd/mm/yyyy"
          />
          {errors.order && (
            <p className="text-red-500 text-sm">{errors.date}</p>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="order" className="block text-gray-700 font-bold mb-2">
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
            <p className="text-red-500 text-sm">{errors.order}</p>
          )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="content"
            className="block text-gray-700 font-bold mb-2"
          >
            Content
          </label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full p-2 border rounded"
            rows="6"
            placeholder="Enter content"
          />
          {errors.content && (
            <p className="text-red-500 text-sm">{errors.content}</p>
          )}
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddRetirement;
