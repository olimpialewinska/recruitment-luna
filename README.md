# IoT Module Management Application - Aquaponics Farming

This is a project for an IoT module management application designed to measure water parameters in aquaponics farming. The application is built using ReactJS and aims to allow users to browse available modules and edit their parameters. Below, you will find information about the functionality, how to run the project, and testing.

## Features

### 1. Modules List Page

- The main page of the application displays all available modules in a list format.
- It shows the module's name, availability, and target temperature.
- Module data is fetched from the server using the GET `/modules` endpoint.

### 2. Module Details Page

- Clicking on a module on the list page redirects the user to the module's details page.
- It displays the module's name, description, availability, and target temperature.
- It allows module editing through a modal dialog triggered by clicking the "Edit" button.
- If a module is unavailable, it blocks the editing capability and displays a notice about its unavailability.

### 3. Module Editing Capability

- On the module details page, users can edit module parameters such as name, description, and target temperature.
- Before sending changes to the server, fields are validated:
  - `name` - a non-empty string
  - `description` - a non-empty string
  - `targetTemperature` - a number between 0 and 40

### 4. Displaying Current Temperature

- The current water temperature, measured by the specific module, is displayed on both the modules list and module details pages.
- Temperature data is obtained from a WebSocket server at `localhost:3001` using the `socket.io-client` npm package.
- Temperature updates in real-time upon receiving messages from the WebSocket server.
- If the temperature is within ±0.5°C of the `targetTemperature` value, it is displayed in green; otherwise, it is displayed in red.

## Running the Project

```bash
git clone https://github.com/olimpialewinska/recruitment-luna.git
cd recruitment-luna
npm install
npm start
```

The application will be accessible in your browser at http://localhost:3000.

## Unit/Component Testing

The project includes unit and component tests to verify the correctness of the application. To run the tests, use the following command:

```bash
npm test
```

## Author

Author: Olimpia Lewińska

Contact: olimpialewinska@gmail.com

This project is a recruitment task.
