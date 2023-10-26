# smart-drive

## Introduction

A responsive, mobile-first app that acts as a support for the optimization of the user's driving style in terms of polluting emissions, safety, comfort by applying gamification principles, and an infrastructure for processing the data acquired from the vehicle control unit by means of OBD-II standard and a low-cost NodeMCU board.

## Features
Features provided by the web app are:

- user signup and authentication through password as a requirement for accessing app features.
- vehicles registration by which to track all data acquired and see related statistics.
- user's driving style scoring leveraging a cumulative, multidimensional schema that consider its driving story, cumulatively.
- real-time acoustic driving assistant, giving feedbacks during driving.
- users levels system based XP points gathered by driving.
- trips tracking, measurements will be gathered into spatio-temporal units called trips, enriched with driving scores and statistics.
- progress tracking, as a mean to encourage app usage.
- trips statistics generation, to monitor every drive. 
- real-time dashboard (telemetry) while driving, as a counterpart of vehicle's dashboard.
- custom, eco-driving badges assignment, rewarding partial goals concerning app use and consideration, as well as good practice in terms of eco-driving.
- community leaderboard, by which the user can compare his behaviour against other users and see where he needs to improve most.
- real-time notification system to inform the user of the main app events.

## How to deploy

### Running with emulated ECU

#### Global prerequisites
- Git
- Docker
- web browser with support for socket.io
- NodeMCU board
- Arduino IDE
- Arduino UNO board

#### Backend & Frontend

Steps to deploy and use smart-drive web application are the following:

1. clone the repo into the desired folder:

```bash
    git clone https://github.com/danielegiulianini/smart-drive
```

2.	move inside the downloaded project root folder:
```bash
    cd smart-drive
```

3.	build, create and start service containers (possibly with the --build option to recompile Docker images):
```bash
    docker-compose -f docker-compose.prod.yml up --build
```

4.	connect with a browser to the address "http://localhost:8000" by typing it into to the search bar

5.	when you want to stop containers execution, deleting them together with allocated resources, type:
```bash
    docker-compose down
```

#### Edge Node
Steps to deploy the SW for the edge node (on a NodeMCU board) (working with Arduino IDE 1.8.19) are:

0. Connect the NodeMCU board: connect your NodeMCU board to your computer using a USB cable.
1. Open and configure the Arduino IDE:
open the Arduino IDE.
Go to "File" → "Preferences".
In the "Additional Boards Manager URLs" field, enter the following URL: http://arduino.esp8266.com/stable/package_esp8266com_index.json
Click "OK" to save the preferences.
2. Install the necessary packages:
go to "Tools" → "Board" → "Boards Manager".
In the Boards Manager, search for "esp8266" and select the package named "esp8266 by ESP8266 Community".
Click on "Install" to install the package.
3. Select the NodeMCU board:
go to "Tools" → "Board" and select "NodeMCU 1.0 (ESP-12E Module)" from the list.
4. Select the port: go to Tools > Port and choose the port to which your NodeMCU board is connected. If you're not sure, you can check your system's device manager or the Arduino IDE's port list.
5. Open the sketch: click on File > Open and open [this file](dataTransmittingSubSystem/dataTransmittingSubSystem.ino).
6. Upload the code:
    verify the code by clicking on the "Verify" button (checkmark symbol) to check for any errors.        
    Click on the "Upload" button (right arrow symbol) to compile and upload the code to the NodeMCU board.
7. Monitor the output: to observe the output or debug messages, open the Serial Monitor in Arduino IDE by going to "Tools" → "Serial Monitor".
Make sure the baud rate is set to the same value as in the code.

#### ECU
Steps to deploy the emulated ECU SW on a Arduino UNO board (working with Arduino IDE 1.8.19) are:

0. Prepare the circuit: deploy your Arduino UNO board following [this file](vehicleSimulatorSubSystem/vehicleSimulatorSubSystem.ino).
1. Connect the Arduino UNO board: connect your Arduino UNO board to your computer using a USB cable.
2. Open Arduino IDE: Launch a new instance of the Arduino IDE (wrt that of NodeMCU previously started, as to visualize the messages coming from the two different serial monitors).
3. Select the board: go to Tools > Board and select "Arduino Uno" from the list of available boards.
4. Select the port: go to Tools > Port and choose the port to which your Arduino Uno board is connected. If you're not sure, you can check your system's device manager or the Arduino IDE's port list.
5. Open the sketch: click on File > Open and open [this file](vehicleSimulatorSubSystem/vehicleSimulatorSubSystem.ino).
6. Upload the code: once the code is successfully verified, click on the "Upload" button (right arrow icon) or go to Sketch > Upload to transfer the code to your Arduino UNO board. The status bar will show the progress, and the onboard LED on the Arduino will blink rapidly while uploading.
7. Monitor the output: to observe the output or debug  messages, open the Serial Monitor in Arduino IDE by going to "Tools" → "Serial Monitor".
Make sure the baud rate is set to the same value as in the code.
8. Use your emulated car: use the potentiometers as the emulated throttle/break (follow [this file](vehicleSimulatorSubSystem/vehicleSimulatorSubSystem.ino) to map between each other) and visualize your dashboard through the lcd or similar. 

### Running with real ECU

#### Global prerequisites
- Git
- Docker
- web browser with support for socket.io
- NodeMCU board
- Arduino IDE
- real ECU (your car contains one)
- OBD-II scanner (ex., ELM 327)

#### Backend & Frontend
Like described [before](#backend-&-frontend).

#### Edge Node
Like described [before](#edge-node).

#### ECU
1. Identify the OBD-II Port: locate the OBD-II port in your vehicle, which is usually located under the dashboard, near the steering column. It may be covered with a protective cap.
2. Connect the Scanner: plug the OBD-II scanner's connector into the OBD-II port in your vehicle. Ensure it is firmly connected and properly aligned.
3. Turn on the Ignition: start your car's ignition by turning the key to the "ON" position. However, do not start the engine unless specifically instructed by the scanner manufacturer.
4. Connect your NodeMCU board to your OBD-II scanner: bind the two devices by bluetooth, wifi, or wire, depending on your specific OBD-II scanner type.
5. Use your app: after having signed up and logged in, navigate to the drive mode page to access your real-time dashboard, track your data and receive your customized driving tips.
5. Disconnect the Scanner: once you have ended using the app, disconnect the OBD-II scanner from the vehicle's port.

> [!NOTE]  
> Please note that this subsystem has not been extensively tested on a real car yet.

> [!WARNING]  
> Remember, it's essential to be cautious while using an OBD-II scanner and to prioritize safety.