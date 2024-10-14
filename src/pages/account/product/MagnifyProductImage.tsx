import React, { useState } from "react";
import CloseIcon from "@mui/icons-material/Close"; // Import MUI Close Icon

const MagnifyProductImage = ({ img }: { img: any }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Open modal when image is clicked
  const handleImageClick = () => {
    setIsModalOpen(true);
  };

  // Close modal with close button
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      {/* Image with hover effect */}
      <div
        style={{
          position: "relative",
          display: "inline-block",
          cursor: "pointer",
        }}
        onClick={handleImageClick}
      >
        <img src={img?.imageUrl} alt={img?.fileName} style={{ width: "4rem", height: "4rem" }} />

        {/* Title text on hover */}
        <div
          style={{
            position: "absolute",
            bottom: "0",
            left: "0",
            width: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            color: "white",
            textAlign: "center",
            fontSize: "0.8rem",
            padding: "0.2rem 0",
            opacity: 0.8,
            visibility: isModalOpen ? "hidden" : "visible", // Hide on click
          }}
        >
          Click to view details
        </div>
      </div>

      {/* Modal for scaling the image and showing details */}
      {isModalOpen && (
        <>
          {/* Backdrop */}
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100vw",
              height: "100vh",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              zIndex: 999,
            }}
          />

          {/* Modal content */}
          <div
            style={{
              position: "fixed",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "30rem",
              height: "30rem",
              zIndex: 1000,
              backgroundColor: "white",
              border: "1px solid #ccc",
              padding: "1rem",
              boxShadow: "0px 4px 8px rgba(0,0,0,0.1)",
            }}
          >
            {/* Close button */}
            <CloseIcon
              style={{
                position: "absolute",
                top: "-0.5rem",
                right: "-0.5rem",
                cursor: "pointer",
                border: "1px solid black",
                backgroundColor: "white",
                boxShadow: "0px 0px 10px 1px",
                borderRadius: "50%",
              }}
              onClick={handleCloseModal}
            />

            {/* Scaled Image */}
            <img src={img?.imageUrl} alt={img?.fileName} style={{ width: "100%", height: "auto" }} />

            {/* Optional: Image details */}
            {/* <div style={{ marginTop: "0.5rem" }}>
              <p>File Name: {img?.fileName}</p>
              <p>Resolution: {img?.resolution}</p>
            </div> */}
          </div>
        </>
      )}
    </div>
  );
};

export default MagnifyProductImage;
