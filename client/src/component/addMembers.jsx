import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import {addMemberRoute} from '../utils/ApiRoutes'

const cloudinaryUploadUrl = "https://api.cloudinary.com/v1_1/dloh7csm6/image/upload";
const cloudinaryUploadPreset = "aarcodev";

const AddMembers = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [order, setOrder] = useState('');
  const [image, setImage] = useState(null);
  const [errors, setErrors] = useState({});

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

    if (!order) {
      tempErrors.order = "Order is required.";
      isValid = false;
    } else if (isNaN(order)) {
      tempErrors.order = "Order must be a number.";
      isValid = false;
    }

    if (!image) {
      tempErrors.image = "Image is required.";
      isValid = false;
    }

    setErrors(tempErrors);
    return isValid;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (handleValidation()) {
      try {
        let imageUrl = null;
        if (image) {
          const formData = new FormData();
          formData.append("file", image);
          formData.append("upload_preset", cloudinaryUploadPreset);
          const cloudinaryResponse = await axios.post(cloudinaryUploadUrl, formData);
          console.log("respose111",cloudinaryResponse.data)
          imageUrl = cloudinaryResponse.data.secure_url;
          console.log("this is url::",imageUrl)
        }

        const memberData = {
          name,
          email,
          order: parseInt(order),
          image: imageUrl || "",
        };

        // Replace 'addMemberRoute' with your actual API endpoint
        const response = await axios.post(addMemberRoute, memberData);

        if (response.data.status === true) {
          toast.success("Committee member added successfully!", {
            position: "bottom-right",
            autoClose: 5000,
          });
          navigate("/members"); // Adjust this route as needed
        } else {
          toast.error(response.data.msg || "Failed to add member", {
            position: "bottom-right",
            autoClose: 5000,
          });
        }
      } catch (error) {
        toast.error("An error occurred. Please try again.", {
          position: "bottom-right",
          autoClose: 5000,
        });
      }
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-5">Add Committee Member</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block mb-1">Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="Enter member's name"
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
        </div>

        <div>
          <label htmlFor="image" className="block mb-1">Upload Image</label>
          <input
            type="file"
            id="image"
            onChange={(e) => setImage(e.target.files[0])}
            className="w-full p-2 border rounded"
            accept="image/*"
          />
          {errors.image && <p className="text-red-500 text-sm mt-1">{errors.image}</p>}
        </div>

        <div>
          <label htmlFor="email" className="block mb-1">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="Enter member's email"
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        </div>

        <div>
          <label htmlFor="order" className="block mb-1">Order</label>
          <input
            type="number"
            id="order"
            value={order}
            onChange={(e) => setOrder(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="Enter order number"
          />
          {errors.order && <p className="text-red-500 text-sm mt-1">{errors.order}</p>}
        </div>

        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddMembers;