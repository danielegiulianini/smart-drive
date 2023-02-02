#ifndef __STRING_UTILS__
#define __STRING_UTILS__

#pragma once
#include "Arduino.h"

int readStringFromStream(Stream &stream, char *buffer, uint16_t responseTimeout);
void remove_spaces(char* s);


#endif
