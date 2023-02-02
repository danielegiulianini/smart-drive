#ifndef __EMULATED_ELM_FIRMWARE__
#define __EMULATED_ELM_FIRMWARE__
#include <SoftwareSerial.h> //#include <AltSoftSerial.h>


#include "Arduino.h"
#include "StringUtils.h"
#include "VehicleSimulator.h"

// hex strings corresponding to services (modes)
#define OBD_SERVICE_01 "01"
#define OBD_SERVICE_09 "09"

// hex strings corresponding to pids
#define OBD_VEHICLE_SPEED_PID "0D"
#define OBD_ENGINE_SPEED_PID "0C"
#define FUEL_TANK_LEVEL_INPUT "2F"
#define OBD_ODOMETER_PID "A6"

#define OBD_TERMINATOR "\r\r>"
#define OBD_NO_DATA "NO_DATA\r\r>"
#define OBD_OK "OK\r\r>"

#define VIN "1449020156464A4D534530DD343434363837"

class EmulatedElmFirmware
{

public:
    void init(Stream& mySerial);
    void checkQueryAndRespond(VehicleSimulator& vehicleData);

private:
    String getResponseToCmdOrQuery(String cmdAsString, VehicleSimulator& vehicleData);
    String getPid(String cmdAsString);

    Stream* mySerial;
};

#endif
