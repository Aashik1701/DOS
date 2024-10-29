import './App.css';
import Header from './components/Header/Header';
import Hero from './components/Pages/Hero/gg/Hero';
import WaterQualityMap from './components/WaterQualityMap';
import UploadData from './components/uploadData'; // Adjust the path as necessary
import ControlPanel from './components/Dashboard/ControlPanel';
import NotFound from './components/Pages/Hero/gg/NotFound';
//import OceanBot from './components/Chatbot/OceanBot';

function App() {
  return (
    <>
      <div>
        <Header />
        <ControlPanel />
        <Hero />
        <WaterQualityMap />
        <NotFound />
        <UploadData /> {/* Use uppercase here */}                
      </div>
    </>
  );
}

export default App;