import './InteractiveButton.css'; // Import the CSS file

const InteractiveButton = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="relative group">
        <button className="interactive-button">
          <span className="gradient-background"></span>
          <span className="button-content">
            <div className="flex items-center space-x-2">
              <span className="button-text">Darshboard</span>
              <svg
                className="button-icon"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  clipRule="evenodd"
                  d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z"
                  fillRule="evenodd"
                ></path>
              </svg>
            </div>
          </span>
        </button>
      </div>
    </div>
  );
};

export default InteractiveButton;