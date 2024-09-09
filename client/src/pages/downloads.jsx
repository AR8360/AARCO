import React from "react";
import a from "../assets/ec.pdf";
const Downloads = () => {
  const pdfFiles = [
    { label: "Retiring Members", url: a },
    { label: "Elected Members", url: "." },
    { label: "Important Notices", url: "" },
  ];

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Download PDF Notices</h1>
      <ul className="list-disc pl-5 space-y-4">
        {pdfFiles.map((file) => (
          <li key={file.label} className="text-lg">
            <a
              href={file.url}
              download
              className="text-blue-500 hover:underline"
            >
              {file.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Downloads;
