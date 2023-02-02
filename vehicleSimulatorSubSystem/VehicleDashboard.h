#ifndef __VEHICLE_DASHBOARD__
#define __VEHICLE_DASHBOARD__

// #pragma once
#include "Arduino.h"
#include <LiquidCrystal.h>


#define MILLISECONDS_IN_A_SECOND 1000

class VehicleDashboard
{

  public:
    void init(int rs, int enable, int d4, int d5, int d6, int d7, int secondsOfDisplay = 2);
    void display(int kph, float rpm, long distTrav, float duration);

  private:
    int secondsOfDisplay; //seconds of diplay for each panel
    LiquidCrystal* lcd;
    void clearLineFrom(int colIndex, int rowIndex);
};

#endif
