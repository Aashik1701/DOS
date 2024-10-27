import ChatBot from 'react-simple-chatbot';
import { ThemeProvider } from 'styled-components';
import './OceanBot.css';

const steps = [
    {
        id: '0',
        message: 'Welcome to OceanBot! I can assist you with information about mooring buoys, distributed operating systems, sensors, and more.',
        trigger: '1',
    },
    {
        id: '1',
        message: 'To get started, please enter your name:',
        trigger: '2'
    },
    {
        id: '2',
        user: true,
        trigger: '3',
    },
    {
        id: '3',
        message: "Hi {previousValue}! What would you like to know about today?",
        trigger: '4'
    },
    {
        id: '4',
        options: [
            { value: 1, label: 'Mooring Buoy Components' },
            { value: 2, label: 'Sensor Information' },
            { value: 3, label: 'System Challenges' },
            { value: 4, label: 'Data Management' },
            { value: 5, label: 'Security Features' },
            { value: 6, label: 'Emerging Technologies' }
        ],
        trigger: '5'
    },
    {
        id: '5',
        message: ({previousValue}) => {
            switch (previousValue) {
                case 1:
                    return "Mooring buoys contain various components for comprehensive monitoring, including:\n- **Glider sensors** for movement tracking\n- **HF Lidar** for bathymetric mapping\n- **Dissolved oxygen sensors** for water quality\n- **UV-spectral petroleum detector** to monitor pollutants\n- **Water heat level sensors**, pH, turbidity, and TDS sensors\nWould you like to know more about a specific component?";
                case 2:
                    return "The sensor suite in mooring buoys includes:\n- **Temperature sensors**\n- **Pressure sensors**\n- **Humidity sensors**\n- **Solar irradiation sensors**\n- **Dust & gas sensors**\n- Advanced sensors like **DNA Biosensors** and **Coliform Detection** for marine health.\nWhich sensor would you like to explore further?";
                case 3:
                    return "Mooring buoy systems face several challenges:\n1. **Harsh marine conditions**\n2. **Limited resources** like power and bandwidth\n3. **Remote operation**\n4. **Data consistency**\nWould you like more information on any specific challenge?";
                case 4:
                    return "Data management in distributed operating systems involves:\n- **Distributed file systems** for consistent data storage\n- **Data processing protocols**\n- **Real-time data transmission**\nWhat aspect would you like to delve into?";
                case 5:
                    return "Security features are vital and include:\n- **Data encryption** for secure transmission\n- **Access control mechanisms**\n- **Fault tolerance and reliability protocols**\nWould you like more details on any of these features?";
                case 6:
                    return "Emerging technologies enhancing mooring buoy systems include:\n- **Edge computing** for real-time data processing\n- **Artificial Intelligence (AI)** to optimize operations\n- **Internet of Things (IoT)** for expanded sensor integration.\nWould you like to learn about a specific technology?";
                default:
                    return "I'm not sure about that. Please select a different option.";
            }
        },
        trigger: '6'
    },
    {
        id: '6',
        options: [
            { value: 1, label: 'Learn More' },
            { value: 2, label: 'Ask Another Question' },
            { value: 3, label: 'End Chat' }
        ],
        trigger: '7'
    },
    {
        id: '7',
        message: ({previousValue}) => {
            if (previousValue === 1) {
                return "Please select a specific topic to learn more.";
            } else if (previousValue === 2) {
                return "What else would you like to know about?";
            } else {
                return "Thank you for using OceanBot! Have a great day!";
            }
        },
        trigger: ({previousValue}) => previousValue === 3 ? 'end' : '4'
    },
    {
        id: 'end',
        message: 'Chat ended. Click the reset button to start a new chat.',
        end: true
    },
    {
        id: 'componentDetail',
        message: "These components are highly specialized:\n- **Glider Sensors**: Used for autonomous navigation and collecting underwater data.\n- **HF Lidar**: Provides detailed topography of the seafloor.\n- **Petroleum Detectors**: Essential for detecting oil spills or pollutants.\nWhich component would you like more details on?",
        trigger: '6'
    },
    {
        id: 'sensorDetail',
        message: "Here’s more on key sensors:\n- **DNA Biosensors**: Detects microbial activity in the water.\n- **Temperature Sensors**: Monitor changes in water temperature affecting marine life.\nWould you like to know about any other sensors?",
        trigger: '6'
    },
    {
        id: 'challengeDetail',
        message: "Challenges include resource constraints and maintenance:\n- **Power**: Low-power systems are essential for extended use.\n- **Data Consistency**: Ensures accurate information across nodes.\nWould you like to explore any specific challenge in detail?",
        trigger: '6'
    },
    {
        id: 'dataManagementDetail',
        message: "Data management focuses on reliability:\n- **Distributed File Systems**: Maintain data across nodes without loss.\n- **Real-Time Processing**: Critical for time-sensitive data like environmental threats.\nWould you like to discuss these further?",
        trigger: '6'
    },
    {
        id: 'securityDetail',
        message: "Security features keep data safe:\n- **Encryption**: Protects data in transit.\n- **Access Control**: Restricts unauthorized entry.\nWould you like to learn more about these security protocols?",
        trigger: '6'
    },
    {
        id: 'emergingTechDetail',
        message: "Emerging technologies offer new possibilities:\n- **AI**: Predicts environmental patterns.\n- **IoT Integration**: Enables a network of sensors for comprehensive monitoring.\nWould you like more details on these advancements?",
        trigger: '6'
    }
];

const theme = {
    background: '#E3F2FD', // Light blue background
    headerBgColor: '#0288D1', // Darker blue header
    headerFontSize: '20px',
    botBubbleColor: '#039BE5', // Medium blue for bot messages
    headerFontColor: 'white',
    botFontColor: 'white',
    userBubbleColor: '#0277BD', // Darker blue for user messages
    userFontColor: 'white',
};

const config = {
    botAvatar: "ocean-bot-avatar.png", // Replace with appropriate ocean/marine-themed avatar
    floating: true,
    width: "400px",
    height: "500px",
    placeholder: "Type your message...",
    headerTitle: "OceanBot - Marine Monitoring Assistant",
};

function OceanBot() {
    return (
        <div className="ocean-bot">
            <ThemeProvider theme={theme}>
                <ChatBot
                    headerTitle="OceanBot"
                    steps={steps}
                    {...config}
                    enableSmoothScroll
                    enableMobileView
                />
            </ThemeProvider>
        </div>
    );
}

export default OceanBot;
