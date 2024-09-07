import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
const addRetirment = () => {
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const [email, setEmail] = useState("");
  const [order, setOrder] = useState("");
  const [content, setContent] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  // Cloudinary configuration
  const cloudinaryUploadUrl =
    "https://api.cloudinary.com/v1_1/dloh7csm6/image/upload";
  const cloudinaryUploadPreset = "aarcodev";

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    const validationErrors = {};
    if (!name) validationErrors.name = "Name is required.";
    // if (!image) validationErrors.image = "Image is required.";
    if (!email) validationErrors.email = "Email is required.";
    // if (!order) validationErrors.order = "Order number is reqsuired.";
    // if (!content) validationErrors.content = "Content is required.";

    // Check if there are any validation errors
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      // Upload image to Cloudinary
      let imageUrl = null;
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

      // Member data to be sent to the backend
      const memberData = {
        name,
        imageUrl, // Use the Cloudinary image URL
        email,
        order,
      };
      const response = await axios.post(addMemberRoute, memberData, {
        withCredentials: true,
      });

      if (response.data.status === false) {
        console.log(response.data);
      } else if (response.data.status === true) {
        console.log(" gaya tel lene ", response.data);
        navigate("/members");
      }
    } catch (error) {
      console.log("error :", error.messages);
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
            Order
          </label>
          <input
            type="number"
            id="order"
            value={order}
            onChange={(e) => setOrder(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="Enter order number"
            step="0.01" // Allows decimal numbers
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
            rows="6" // Keeps the textarea size constant
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

export default addRetirment;
