#include "BlockingElm327.h"
#include "StringUtils.h"
#include "Logger.h"

bool BlockingElm327::init(Stream& stream, const bool& debug, const uint16_t& responseTimeout)
{
  elm327 = new ELM327();
  return elm327->begin(stream, debug, responseTimeout);
}

int32_t BlockingElm327::kph()
{
  int32_t  kph = elm327->kph();
  while (elm327->nb_rx_state == ELM_GETTING_MSG)
  {
    kph = this->elm327->kph();
  }
  if (elm327->nb_rx_state != ELM_SUCCESS)
  {
    kph = -1;
    elm327->printError();
  }
  return kph;
}

float BlockingElm327::rpm()
{
  float rpm = elm327->rpm();
  while (elm327->nb_rx_state == ELM_GETTING_MSG)
  {
    rpm = this->elm327->rpm();
  }
  if (elm327->nb_rx_state != ELM_SUCCESS)
  {
    rpm = -1;
    elm327->printError();
  }
  return rpm;
}

float BlockingElm327::fuelLevel() {

  float fuelLevel = elm327->fuelLevel();
  while (elm327->nb_rx_state == ELM_GETTING_MSG)
  {
    fuelLevel = this->elm327->fuelLevel();
  }
  if (elm327->nb_rx_state != ELM_SUCCESS)
  {
    fuelLevel = -1;
    elm327->printError();
  }
  return fuelLevel;
}

float BlockingElm327::odometer() {
  float odometer = -1;
  delay(100); //wait a bit to not compact different pid requests in one request
  elm327->elm_port->flush();

  //if valid data coming (no no_data...) ex. response format: 41 01 A6 F8 (MODE PID BYTE1 BYTE2 ...>)
  elm327->elm_port->print("01A6");

  delay(1000); //wait a bit for response to arrive
  char encodedOdometer[12] = {};  //over-dimensioned char buffer

  int responseLength = readStringFromStream(*(elm327->elm_port), encodedOdometer, elm327->timeout_ms);
  if (responseLength > 5 + 1) {//5 as: 2 for mode, 1 for 1st space, 2 for pid, 1 for 2nd space
    encodedOdometer[responseLength - 1] = '\0'; //removing > terminator
    // Logger::GetInstance()->log("encoded Odometer: "); Logger::GetInstance()->log(&encodedOdometer[5 + 1]);

    remove_spaces(&encodedOdometer[5 + 1]);
    odometer = strtol(&encodedOdometer[5 + 1], NULL, 16) / 10;

  } else {
    Logger::GetInstance()->log(F("error happened, resp length is: ")); Logger::GetInstance()->log(String(responseLength));
    //error happened
  }
  return odometer;
}
