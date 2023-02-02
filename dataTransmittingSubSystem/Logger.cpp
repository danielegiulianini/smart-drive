#include "Logger.h"

Logger *Logger::singletonLogger = NULL;

Logger *Logger::GetInstance()
{
    if (singletonLogger == NULL)
    {
        singletonLogger = new Logger();
    }
    return singletonLogger;
}

void Logger::log(const String& msg) {
  Serial.println(this->prefix + ":" + msg);
}

void Logger::setPrefix(const String& prefix) {
  this->prefix = prefix;
}