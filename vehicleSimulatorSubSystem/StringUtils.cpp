#include "StringUtils.h"

//buffer must be pre-allocated
void readStringFromStream(Stream &stream, char *buffer)
{
    int i = 0;

    while (stream.available() > 0)
    {
        buffer[i] = stream.read();
        i++;
    }
    buffer[i] = '\0';
}


void remove_spaces(char* s) {
  char* d = s;
  do {
    while (*d == ' ') {
      ++d;
    }
  } while (*s++ = *d++);
}
