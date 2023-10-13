import React from "react";

const LoaderInline: React.FC = () => {
  return (
    <div className="spinner-grow text-primary" role="status">
      <svg
        width="1em"
        height="1em"
        viewBox="0 0 16 16"
        className="bi bi-arrow-clockwise"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zM8 1a7 7 0 1 0 0 14V1z"
        />
        <path
          fillRule="evenodd"
          d="M8.646 3.646a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1 0 .708l-2 2a.5.5 0 1 1-.708-.708L10.293 6.5H5a.5.5 0 1 1 0-1h5.293l-1.147-1.146a.5.5 0 0 1 0-.708z"
        />
      </svg>
      <span className="visually-hidden">Cargando...</span>
    </div>
  );
};

export default LoaderInline;
