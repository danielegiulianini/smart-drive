#ifndef __BLOCKINGELM327__
#define __BLOCKINGELM327__

#include "Arduino.h"
#include "ELMduino.h"

class BlockingElm327
{
  public:
    bool init(Stream& stream, const bool& debug = false, const uint16_t& responseTimeout = 1000);

    int32_t kph();
    float rpm();
    float fuelLevel();
    float odometer();

  private:
    ELM327 *elm327;
};

#endif
