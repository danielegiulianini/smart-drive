#include <SoftwareSerial.h> //#include <AltSoftSerial.h>
#include "VehicleSimulator.h"
#include "EmulatedElmFirmware.h"
#include "VehicleDashboard.h"
#include "Logger.h"

SoftwareSerial mySerial(8, 9); // arduino's RX,arduino's TX

unsigned long lastTime = 0;
Logger* logger;

#define BAUD_RATE 9600
#define ENGINE_PERCENTAGE_PID A0
#define BREAKING_PERCENTAGE_PID A1
#define FUEL_LEVEL_PERCENTAGE_PID A2

const int rs = 12, en = 11, d4 = 5, d5 = 4, d6 = 3, d7 = 2;
#define dt 1000 // period (in millis) OF 1. SIMULATION, 2.DISPLAY and 3. checking (by sim. elm)if commands arrived

VehicleSimulator* vehicleSimulator = new VehicleSimulator();
VehicleDashboard* dashboard = new VehicleDashboard();
EmulatedElmFirmware* elmFirmware = new EmulatedElmFirmware();

void setup() {
  mySerial.begin(BAUD_RATE);
  Serial.begin(BAUD_RATE);

  vehicleSimulator->init(ENGINE_PERCENTAGE_PID, BREAKING_PERCENTAGE_PID, FUEL_LEVEL_PERCENTAGE_PID);
  dashboard->init(rs, en, d4, d5, d6, d7, 2);
  elmFirmware->init(mySerial);

  logger = Logger::GetInstance();
  logger->setPrefix("vehicleSim");

  logger->log(F("OBD scanner emulator ready for cmds. "));
}



void loop() {

  if ((millis() - lastTime) > dt) {

    vehicleSimulator->update(dt);
    dashboard->display(int(vehicleSimulator->vx * 3.6),  // mps => kph
                       vehicleSimulator->rpm,
                       vehicleSimulator->distTrav,
                       vehicleSimulator->duration);
    elmFirmware->checkQueryAndRespond(*vehicleSimulator);

    logger->log(F("--------------------------------"));
    lastTime = millis();
  }
}
