import ChatBot from 'react-simple-chatbot';
import { ThemeProvider } from 'styled-components';
import './OceanBot.css';
const steps = [
    {
        id: '0',
        message: 'Welcome to OceanBot! I can help you with information about mooring buoys and distributed operating systems.',
        trigger: '1',
    },
    {
        id: '1',
        message: 'Please enter your name:',
        trigger: '2'
    },
    {
        id: '2',
        user: true,
        trigger: '3',
    },
    {
        id: '3',
        message: "Hi {previousValue}! What would you like to know about?",
        trigger: '4'
    },
    {
        id: '4',
        options: [
            { value: 1, label: 'Mooring Buoy Components' },
            { value: 2, label: 'Sensor Information' },
            { value: 3, label: 'System Challenges' },
            { value: 4, label: 'Data Management' },
            { value: 5, label: 'Security Features' }
        ],
        trigger: '5'
    },
    {
        id: '5',
        message: ({previousValue}) => {
            switch (previousValue) {
                case 1:
                    return "Mooring buoys include components like: \n- Glider sensors\n- HF Lidar\n- Dissolved oxygen sensors\n- UV-spectral petroleum detector\n- Water heat level sensors\n- pH, turbidity & TDS sensors\n\nWould you like to know more about any specific component?";
                case 2:
                    return "Our sensor suite includes:\n- Temperature sensors\n- Pressure sensors\n- Humidity sensors\n- Solar irradiation sensors\n- Dust & gas sensors\n- Advanced sensors like DNA Biosensors and Coliform Detection\n\nWhich sensor would you like to learn more about?";
                case 3:
                    return "Main challenges include:\n1. Harsh marine environment\n2. Limited power and bandwidth\n3. Remote operation difficulties\n4. Data consistency maintenance\n\nWould you like details about any specific challenge?";
                case 4:
                    return "Data management involves:\n- Distributed file systems\n- Data consistency protocols\n- Real-time processing\n- Remote transmission\n\nWhat aspect interests you?";
                case 5:
                    return "Security features include:\n- Data encryption\n- Access control\n- Secure transmission protocols\n- Fault tolerance mechanisms\n\nWould you like more details?";
                default:
                    return "I'm not sure about that. Please select another option.";
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
                return "Please select a new topic to explore.";
            } else if (previousValue === 2) {
                return "What else would you like to know?";
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
    botAvatar: "ocean-bot-avatar.png", // Replace with appropriate ocean/marine themed avatar
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