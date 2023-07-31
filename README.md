<div style='width: 100%;display:flex; flex-direction:row; align-items: center; justify-content: center;'>
<img style='width: 100%; object-fit: contain;' src='https://github.com/Schlomoh/travel-helper/blob/main/docs/assets/travel-helper-screen_recording.gif?raw=true' alt='screen-recording' />
</div>

# Travel-helper
Travel-helper is a personal project using ReactJS and Vite as the build tool, and TypeScript for a typed syntax. This application aims to provide a unique travel planning experience by leveraging the power of OpenAI's language model to understand your preferences and create a tailored itinerary.

## Usage
Clone this project and navigate into the its directory on your local machine. 

### Install dependencies
To install the necessary dependencies, run the following command: 
```bash
  npm install
```

### Set environment variables
To access the apis used in this project you will have to provide your own API key. To do this, use the provided .env template file called "CHANGE_TO.env" and change its name to ".env" ;)
This file will have to variables set, which you will only have to fill with your own key values.

### Running the project
Now you can run the project in either development mode usign this command:
```bash
npm run dev
```

Or create a production build ...
```bash 
npm run build
```
which you can then run using the following cammand:
```bash
npm run preview
```

## Background
Travel-helper was created to provide a more personalized and efficient way to plan trips. Traditional travel planning methods often involve browsing through countless websites, reviews, and travel guides, which can be time-consuming and overwhelming. By using natural language processing and machine learning algorithms, TravelItinerary simplifies the process by allowing users to communicate their travel plans and preferences to the AI, which then generates a personalized itinerary.

## Features
- **Conversational Interface:** Interact with the AI through a user-friendly chat interface, allowing you to communicate your travel plans and preferences easily.
- **Personalized Itinerary:** Receive a customized itinerary based on your conversations with the AI, including activities, places to visit, and accommodations.
- **Integration with Google Places Search API (Future Update):** Provide more detailed information about the activities and places suggested by the AI, such as reviews, ratings, and images.
- **Responsive Design:** Access the application on various devices, including desktops, laptops, tablets, and mobile phones, ensuring a seamless user experience.
- **Easy Navigation:** Quickly browse through different sections of your itinerary, allowing you to easily access the information you need.

## Technical Details
Travel-helper is built using ReactJS, a popular JavaScript library for building user interfaces, and Vite, a fast and efficient build tool. The application leverages the OpenAI API to integrate the language model and generate the itinerary. TypeScript is used for a typed syntax, ensuring code maintainability and scalability.

## Future Plans
Planned features include integrating the Google Places Search API to provide more comprehensive information about the activities and places suggested by the AI. Additionally, we aim to improve the user interface and user experience, making it even easier for you to communicate your travel plans and preferences to the AI.

## License
travel-helper is licensed under the MIT License.
