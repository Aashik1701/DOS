import './App.css';
import Header from './components/Header/Header';
import Hero from './components/Pages/Hero/gg/Hero';
import Dashboard from './components/Dashboard/Dashboard';
import WaterQualityMap from './components/WaterQualityMap';
import UploadData from './components/uploadData'; // Adjust the path as necessary

function App() {
  return (
    <>
      <div>
        <Header />
        <UploadData /> {/* Use uppercase here */}
        <WaterQualityMap />
        <Dashboard />
        <Hero />
      </div>
    </>
  );
}

export default App;