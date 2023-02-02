#include "EmulatedElmFirmware.h"
#include "Logger.h"

Logger*  logger2 = Logger::GetInstance();

void EmulatedElmFirmware::init(Stream &serial)
{
  mySerial = &serial;
}

void EmulatedElmFirmware::checkQueryAndRespond(VehicleSimulator& vehicleData)
{
  String cmdReceived, response;
  // send data via hc-06 (slave) (only the selected!)
  if (mySerial->available())
  {
    // if nodemcu requested some data

    char cmdReceived[100]; // over-dimensioned
    readStringFromStream(*mySerial, cmdReceived);
    response = getResponseToCmdOrQuery(String(cmdReceived), vehicleData);

    mySerial->print(response);

    logger2->log(F("Command received by emulated OBD scanner is: "));
    logger2->log(cmdReceived);

    logger2->log(F("Response sent by emulated OBD scanner is: "));
    logger2->log(response);

  }
}

String EmulatedElmFirmware::getResponseToCmdOrQuery(String cmdAsString, VehicleSimulator& vehicleData)
{
  String response = "";

  // response schema is (in hex, where X stands for mode):
  // 4X REQ_PID VALUE

  if (cmdAsString.startsWith("AT"))
  {
    response = OBD_OK;
  }
  else if (cmdAsString.startsWith(OBD_SERVICE_01))
  {
    if (getPid(cmdAsString).startsWith(OBD_VEHICLE_SPEED_PID))
    {
      int vxKph = int(vehicleData.vx * 3.6);                                                                         // from mph to kph
      response = "41 " + String(OBD_VEHICLE_SPEED_PID) + " " + String(int(vxKph), HEX) + OBD_TERMINATOR; // hex pairs of digits must be separated by spaces (underscores) like elmduino expects them?? Np, 'cause it cuts them off before putting in payload!
    }
    else if (getPid(cmdAsString).startsWith(String(OBD_ENGINE_SPEED_PID)))
    { // else if (getPid(cmdAsString) == String(OBD_ENGINE_SPEED_PID)) {
      int encondedRpm = int(vehicleData.rpm);
      encondedRpm *= 4;
      response = "41 " + String(OBD_ENGINE_SPEED_PID) + " " + String(encondedRpm, HEX) + OBD_TERMINATOR; // for rpm computation: https://www.obdsol.com/knowledgebase/obd-software-development/reading-real-time-data/
    }
    else if (getPid(cmdAsString).startsWith(String(FUEL_TANK_LEVEL_INPUT)))
    {
      int encondedFuelTankLevel = int(vehicleData.fuelLevel);
      encondedFuelTankLevel *= 255 / 100;
      response = "41 " + String(FUEL_TANK_LEVEL_INPUT) + " " + String(encondedFuelTankLevel, HEX) + OBD_TERMINATOR;
    }
    else if (getPid(cmdAsString) == String(OBD_ODOMETER_PID))
    {
      long encondedOdometer = vehicleData.distTrav * 10;


      response = "41 " + String(OBD_ODOMETER_PID) + " " + String(encondedOdometer, HEX) + OBD_TERMINATOR;
    }
    else
    {
      // my_logln(F("no data for spid other than speed and rpm"));
      response = OBD_NO_DATA;
    }
  }
  else if (cmdAsString.startsWith(OBD_SERVICE_09))
  {
    // return vin
    response = String(VIN) + OBD_TERMINATOR;
  }
  else
  { // no data for services other than 01 and 09
    response = OBD_NO_DATA;
    logger2->log(F("no data for services other than 01 and 09"));
  }
  return response;
}

String EmulatedElmFirmware::getPid(String cmdAsString)
{
  const int modeLengthInHexDigits = 2;
  const int pidLengthInHexDigits = 2;

  if (cmdAsString.length() >= modeLengthInHexDigits + pidLengthInHexDigits)
  {
    //logger2->log(F("req pid is: "));
    //logger2->log(cmdAsString.substring(modeLengthInHexDigits, modeLengthInHexDigits + pidLengthInHexDigits) + "!"); //starting inclusive; ending exclusive
    return cmdAsString.substring(modeLengthInHexDigits);
  }
  else
    return ""; //"" means invalid cmdAsString
}
