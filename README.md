# smart-drive

## Introduction

A responsive, mobile-first app that acts as a support for the optimization of the user's driving style in terms of polluting emissions, safety, comfort by applying gamification principles, and an infrastructure for processing the data acquired from the vehicle control unit by means of [OBD-II](https://scholar.google.com/scholar?hl=it&as_sdt=0%2C5&q=obd-II&btnG=) standard and a low-cost [NodeMCU](https://it.wikipedia.org/wiki/NodeMCU) board.

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

# Technologies

## Software
<div align="center">
	<code><img width="50" src="https://user-images.githubusercontent.com/25181517/182884177-d48a8579-2cd0-447a-b9a6-ffc7cb02560e.png" alt="mongoDB" title="mongoDB"/></code>
	<code><img width="50" src="https://user-images.githubusercontent.com/25181517/183859966-a3462d8d-1bc7-4880-b353-e2cbed900ed6.png" alt="Express" title="Express"/></code>
	<code><img width="50" src="https://user-images.githubusercontent.com/25181517/117448124-a2da9800-af3e-11eb-85d2-bd1b69b65603.png" alt="Vue.js" title="Vue.js"/></code>
	<code><img width="50" src="https://user-images.githubusercontent.com/25181517/183568594-85e280a7-0d7e-4d1a-9028-c8c2209e073c.png" alt="Node.js" title="Node.js"/></code>
	<code><img width="50" src="https://user-images.githubusercontent.com/25181517/121401671-49102800-c959-11eb-9f6f-74d49a5e1774.png" alt="npm" title="npm"/></code>
	<code><img width="50" src="https://github.com/marwin1991/profile-technology-icons/assets/62091613/b40892ef-efb8-4b0e-a6b5-d1cfc2f3fc35" alt="Vite" title="Vite"/></code>
	<code><img width="50" src="https://user-images.githubusercontent.com/25181517/183898054-b3d693d4-dafb-4808-a509-bab54cf5de34.png" alt="Bootstrap" title="Bootstrap"/></code>
	<code><img width="50" src="https://user-images.githubusercontent.com/25181517/187070862-03888f18-2e63-4332-95fb-3ba4f2708e59.png" alt="websocket" title="websocket"/></code>
	<code><img width="50" src="https://user-images.githubusercontent.com/25181517/183345125-9a7cd2e6-6ad6-436f-8490-44c903bef84c.png" alt="Nginx" title="Nginx"/></code>
	<code><img width="50" src="https://user-images.githubusercontent.com/25181517/117207330-263ba280-adf4-11eb-9b97-0ac5b40bc3be.png" alt="Docker" title="Docker"/></code>
    <code><img width="50" src="https://github.com/marwin1991/profile-technology-icons/assets/136815194/a57a85ba-e2dd-4036-85b6-7e1532391627" alt="Arduino" title="Arduino"/></code>
</div>

## Hardware

The HW technologies used (but the code can be deployed to other target boards as well, with or without modifications depending on them) are:

* [Arduino UNO](https://store.arduino.cc/products/arduino-uno-rev3)
* [NodeMCU 0.9](https://it.wikipedia.org/wiki/NodeMCU)

Also, a OBD-II scanner could be used if you want to test it on a real car (see [How to deploy section](#how-to-deploy) for the details):
* ELM327 OBD-II scanner

## How to deploy

The system has been designed to be deployed and run onto (at least 2) different execution scenario: 
- with a emulated Engine Control Unit (ECU) to ease development 
- with a real ECU.

> [!NOTE]  
> Note that the modifications only affects the ECU component as all the SW components have been designed to be *interoperable* by adopting a *microservices architecture*.

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
4. Select the port: go to "Tools" > "Port" and choose the port to which your NodeMCU board is connected. If you're not sure, you can check your system's device manager or the Arduino IDE's port list.
5. Open the sketch: click on "File" > "Open" and open the file dataTransmittingSubSystem/dataTransmittingSubSystem.ino.
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
3. Select the board: go to "Tools" > "Board" and select "Arduino Uno" from the list of available boards.
4. Select the port: go to "Tools" > "Port" and choose the port to which your Arduino Uno board is connected. If you're not sure, you can check your system's device manager or the Arduino IDE's port list.
5. Open the sketch: click on "File" > "Open" and open the file vehicleSimulatorSubSystem/vehicleSimulatorSubSystem.ino.
6. Upload the code: once the code is successfully verified, click on the "Upload" button (right arrow icon) or go to "Sketch" > "Upload" to transfer the code to your Arduino UNO board. The status bar will show the progress, and the onboard LED on the Arduino will blink rapidly while uploading.
7. Monitor the output: to observe the output or debug  messages, open the Serial Monitor in Arduino IDE by going to "Tools" → "Serial Monitor".
Make sure the baud rate is set to the same value as in the code.
8. Use your emulated car: use the potentiometers as the emulated throttle/break (follow [this file](vehicleSimulatorSubSystem/vehicleSimulatorSubSystem.ino) to map between each other) and visualize your dashboard through the LCD or similar. 

### Running with real ECU

#### Global prerequisites
- Git
- Docker
- web browser with support for socket.io
- NodeMCU board
- Arduino IDE
- real ECU (your car contains one)
- OBD-II scanner (ex., ELM 327)

#### <a id="backend-&-frontend2"></a>  Backend & Frontend
Like described [before](#backend-&-frontend).

#### <a id="edge-node2"></a> Edge Node
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