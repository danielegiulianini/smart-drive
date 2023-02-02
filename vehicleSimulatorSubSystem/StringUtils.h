#ifndef __STRING_UTILS__
#define __STRING_UTILS__

#pragma once
#include "Arduino.h"

void readStringFromStream(Stream &stream, char *buffer);
void remove_spaces(char* s);


#endif
