import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { gallery } from "../utils/ApiRoutes";

const cloudinaryUploadUrl =
  "https://api.cloudinary.com/v1_1/dloh7csm6/image/upload";
const cloudinaryUploadPreset = "aarcodev";

const AddGalary = () => {
  const [image, setImage] = useState("");
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const [errormsg, setErrormsg] = useState("");

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];

    // Check if the file is an image
    if (selectedImage && selectedImage.type.startsWith("image/")) {
      setImage(selectedImage);
      setErrors({ ...errors, image: "" }); // Clear previous errors
    } else {
      setErrors({ ...errors, image: "Please select a valid image file." });
      setImage(null);
    }
  };

  const handleValidation = () => {
    let tempErrors = {};
    let isValid = true;

    if (!image) {
      tempErrors.image = "Please enter a image";
      isValid = false;
    }

    setErrors(tempErrors);
    return isValid;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (handleValidation()) {
      try {
        let imageUrl = "";
        if (image) {
          const formData = new FormData();
          formData.append("file", image);
          formData.append("upload_preset", cloudinaryUploadPreset);
          const cloudinaryResponse = await axios.post(
            cloudinaryUploadUrl,
            formData
          );
          console.log("respose111", cloudinaryResponse.data);
          imageUrl = cloudinaryResponse.data.secure_url;
          console.log("this is url::", imageUrl);
        }

        const response = await axios.post(
          gallery,
          { image: imageUrl },
          {
            withCredentials: true,
          }
        );
        console.log("response", response.data);

        if (response.data.status === true) {
          setImage("");
          setErrors({});
          setMessage("Committee member added successfully!");
          setTimeout(() => {
            setMessage(""); // Clear the message after 2 seconds
          }, 2000);
        } else {
          setErrormsg(response.data.message);
          setTimeout(() => {
            setErrormsg(""); // Clear the message after 2 seconds
          }, 2000);
        }
      } catch (error) {
        console.error("An error occurred:", error);
        setErrormsg("An error occurred. Please try again.");
        setTimeout(() => {
          setErrormsg(""); // Clear the message after 2 seconds
        }, 2000);
      }
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-5">Add Gallery Image</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
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

export default AddGalary;
