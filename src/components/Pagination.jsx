import { useState } from "react";

function Pagination({ page, setPage, totalPages }) {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <div className="flex gap-4 p-4 items-center">
      {/* Prev button */}
      <button
        className="btn btn-primary"
        onClick={() => setPage((p) => Math.max(1, p - 1))}
        disabled={page === 1}
      >
        Previous
      </button>

      <span className="font-semibold">Page {page}</span>

      {/* Next button */}
      <button
        className="btn btn-primary"
        onClick={() => setPage((p) => p + 1)}
        disabled={page === totalPages}
      >
        Next
      </button>

      {/* Show All Dropdown */}
      <div className="relative">
        <button
          className="btn btn-outline"
          onClick={() => setShowDropdown((prev) => !prev)}
        >
          Show All
        </button>

        {showDropdown && (
          <div className="absolute z-10 mt-2 w-40 bg-base-100 border rounded shadow-lg max-h-60 overflow-y-auto">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                onClick={() => {
                  setPage(i + 1);
                  setShowDropdown(false);
                }}
                className={`block w-full text-left px-4 py-2 hover:bg-base-200 ${
                  page === i + 1 ? "bg-base-300 font-semibold" : ""
                }`}
              >
                Page {i + 1}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Pagination;
