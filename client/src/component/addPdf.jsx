import React, { useState } from "react";
import { addPdfRoute, getPdfRoute, deletePdfRoute } from "../utils/ApiRoutes";
import axios from "axios";

const AddPdf = () => {
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const [errormsg, setErrormsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = {};
    if (!title) validationErrors.title = "Title is required.";
    if (!link) validationErrors.link = "Link is required.";
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Add logic to send the data to the backend
    try {
      const response = await axios.post(
        addPdfRoute,
        { title: title, link: link },
        { withCredentials: true }
      );

      setTitle("");
      setLink("");
      setErrors({});
      setMessage("PDF added successfully");
      setTimeout(() => {
        setMessage("");
      }, 2000);
    } catch (error) {
      console.error("Error adding news:", error);
      setErrormsg("Error adding news. Please try again later.");
      setTimeout(() => {
        setErrormsg("");
      }, 2000);
    }
  };

  return (
    <>
      <div className="p-6 max-w-2xl mx-auto bg-white shadow-md rounded-lg">
        {" "}
        {/* Increased max-width to 3xl */}
        <h2 className="text-2xl font-bold mb-5">Add PDF</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="title"
              className="block text-gray-700 font-bold mb-2"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-3 border rounded"
              placeholder="Enter news title"
            />
            {errors.title && (
              <p className="text-red-500 text-sm">{errors.title}</p>
            )}
          </div>

          <div className="mb-4">
            <label
              htmlFor="link"
              className="block text-gray-700 font-bold mb-2"
            >
              Link
            </label>
            <input
              type="text"
              id="link"
              value={link}
              onChange={(e) => setLink(e.target.value)}
              className="w-full p-3 border rounded"
              placeholder="Enter pdf link"
            />
            {errors.link && (
              <p className="text-red-500 text-sm">{errors.link}</p>
            )}
          </div>

          {message && <p className="text-green-500 text-sm pb-2">{message}</p>}
          {errormsg && <p className="text-red-500 text-sm pb-2">{errormsg}</p>}

          <button
            type="submit"
            className="bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600"
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default AddPdf;
