#include "StringUtils.h"

//buffer must be pre-allocated at call site
int readStringFromStream(Stream &stream, char *buffer, uint16_t  responseTimeout)
{
  int i = 0;
  int startOfReadingTime = millis();
  while ((millis() - startOfReadingTime) < responseTimeout && i == 0) {
    while (stream.available() > 0)
    {
      buffer[i] = stream.read();
      i++;
    }
    buffer[i] = '\0';
  }
  return i;
}

void remove_spaces(char* s) {
  char* d = s;
  do {
    while (*d == ' ') {
      ++d;
    }
  } while (*s++ = *d++);
}
