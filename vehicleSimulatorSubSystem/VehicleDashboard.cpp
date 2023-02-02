#include "VehicleDashboard.h"
#include "Logger.h"
Logger*  logger3 = Logger::GetInstance();

void VehicleDashboard::init(int rs, int enable, int d4, int d5, int d6, int d7, int secondsOfDisplay)
{
  this->lcd = new LiquidCrystal(rs, enable, d4, d5, d6, d7);
  this->lcd->begin(16, 2);
  this->secondsOfDisplay = secondsOfDisplay;
}

void VehicleDashboard::display(int kph, float rpm, long distTrav, float duration)
{
  if (int(duration / MILLISECONDS_IN_A_SECOND) % (secondsOfDisplay * 2) <= (secondsOfDisplay - 1))
  {
    // setCursor(col, row)
    // clearing old printsf
    clearLineFrom(0, 0);
    lcd->setCursor(0, 0);
    lcd->print("kph:");
    lcd->print(kph);
    clearLineFrom(0, 1);
    lcd->setCursor(0, 1);
    lcd->print("rpm:");
    lcd->print(rpm, 0); // 2nd argument is the # of decimal digits to print
  }
  else
  {
    clearLineFrom(0, 0);
    lcd->setCursor(0, 0);
    lcd->print("dist(m):");
    lcd->print(distTrav);
    clearLineFrom(0, 1);
    lcd->setCursor(0, 1);
    lcd->print("dur(min):");
    lcd->print(duration / 1000 / 60, 0); // milliseconds => hours
  }
}

// needed for lcd
void VehicleDashboard::clearLineFrom(int colIndex, int rowIndex)
{
  lcd->setCursor(colIndex, rowIndex);
  lcd->print("                ");
}
