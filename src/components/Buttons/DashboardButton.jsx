import './AnimatedDashboardButton.css'; // Make sure to create this CSS file

const AnimatedDashboardButton = () => {
  return (
    <button className="animated-dashboard-button">
      <span>Dashboard</span>
      <span className="animation"></span>
    </button>
  );
};

export default AnimatedDashboardButton;