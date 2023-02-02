#ifndef __VEHICLE_SIMULATOR__
#define __VEHICLE_SIMULATOR__

// #pragma once
#include "Arduino.h"

#define C_DRAG 0.4257
#define C_FRICTION 12.8

#define VEHICLE_MASS 1000

#define PERCENT 100
#define MILLISECONDS_IN_A_SECOND 1000

#define MAX_ENGINE_FORCE 8000
#define MAX_BREAKING_FORCE 30000
#define MAX_V 55 // in m/s
#define MAX_RPM 6000
#define MIN_RPM 1000
#define MAX_UINT 1023

#define VIN "1449020156464A4D534530DD343434363837"

class VehicleSimulator
{

  public:
    void init(int enginePercentagePid, int breakingPercentagePid, int fuelPercentagePid);
    void update(int dt);
    float vx;
    float vy;
    float speedV;
    float a;
    long distTrav;  //in meters
    float duration;
    float enginePercentage;
    float breakingPercentage;
    float FTractionX;
    float FTractionY;
    float FFrictionX;
    float FFrictionY;
    float FDragX;
    float FDragY;
    float FBreakingX;
    float FLongitudinalX;
    float FLongitudinalY;
    float rpm;
    int fuelLevel;

  private:
    int enginePercentagePid;
    int breakingPercentagePid;
    int fuelPercentagePid;

};

#endif
