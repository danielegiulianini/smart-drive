#include "VehicleSimulator.h"

void VehicleSimulator::init(int enginePercentagePid, int breakingPercentagePid, int fuelPercentagePid)
{
  this->vx = 0;
  this->vy = 0;
  this->speedV = 0;
  this->a = 0;
  this->distTrav = 0;
  this->duration = 0;
  this->enginePercentage = 0;
  this->breakingPercentage = 0;
  this->FTractionX = 0;
  this->FTractionY = 0;
  this->FFrictionX = 0;
  this->FFrictionY = 0;
  this->FDragX = 0;
  this->FDragY = 0;
  this->FBreakingX = 0;
  this->FLongitudinalX = 0;
  this->FLongitudinalY = 0;
  this->rpm = 0;
  this->fuelLevel = 0;

  this->enginePercentagePid = enginePercentagePid;
  this->breakingPercentagePid = breakingPercentagePid;
  this->fuelPercentagePid = fuelPercentagePid;
}

void VehicleSimulator::update(int dt)
{
  enginePercentage = map(analogRead(enginePercentagePid), 100, 900, 0, PERCENT); // analog input domain 0-1023, min and max values are empirically determined (calibration)
  // trim to zero (to refactor in function)
  if (enginePercentage < 0)
  {
    enginePercentage = 0;
  }
  breakingPercentage = map(analogRead(breakingPercentagePid), 100, 900, 0, PERCENT);
  if (breakingPercentage < 0)
  {
    breakingPercentage = 0;
  }
  FTractionX = MAX_ENGINE_FORCE * enginePercentage / PERCENT;
  FBreakingX = -MAX_BREAKING_FORCE * breakingPercentage / PERCENT;

  speedV = sqrt(vx * vx + vy * vy);
  FDragX = -C_DRAG * vx * speedV;
  FFrictionX = -C_FRICTION * vx;

  FLongitudinalX = FTractionX + FDragX + FFrictionX + FBreakingX; // Ftot  from v old (cannot be negative (no backwards movement, so trim to zero)
  a = FLongitudinalX / VEHICLE_MASS;

  vx = vx + (dt * a) / MILLISECONDS_IN_A_SECOND; // conversion milliseconds to seconds (as dt is expressed in milliseconds)

  // can't go backwards
  if (vx < 0)
  {
    vx = 0;
  }
  else if (vx > MAX_V)
  {
    vx = MAX_V;
  }

  duration = duration + dt; // dt is in millis
  distTrav = distTrav + (dt * vx/1000);  //delta  millimeters => meters
  rpm = map(vx, 0, MAX_V, MIN_RPM, MAX_RPM); // vehicle can't have rpm = 0

  fuelLevel = PERCENT - map(analogRead(fuelPercentagePid), 0, MAX_UINT, 0, PERCENT);
}
