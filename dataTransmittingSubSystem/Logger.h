#ifndef __LOGGER__

#define __LOGGER__

#include "Arduino.h"

class Logger
{
public:
    static Logger *GetInstance();
    void log(const String &msg);
    void setPrefix(const String &prefix);

private:
    //Logger2();
    static Logger *singletonLogger; // singleton instance
    String prefix = String("log");
};

#endif