/*
*
*
*       Complete the handler logic below
*       
*       
*/

function ConvertHandler() {
  
  this.getNum = function(input) {    
    var formattedInput = input.replace(/\s/g, "");

    var index = formattedInput.indexOf(formattedInput.match(/[a-z]/i));  
    if (index === -1) return "no unit";
    if (index === 0) return 1;

    var result = formattedInput.slice(0, index);
    // Check for double fraction
    var doubleFraction = result.match(/\//g)
    if (doubleFraction && doubleFraction.length > 1) return "invalid number";
    // Prevent divide by zero
    if (doubleFraction && doubleFraction.length === 1 && !Number(result.split("/")[1])) return "cannot divide by zero";
    
    return Number(eval(result).toFixed(5));
  };
  
  this.getUnit = function(input) {
    var formattedInput = input.replace(/\s/g, "");
    var index = formattedInput.indexOf(formattedInput.match(/[a-z]/i));
    var validUnits = ['gal','l','mi','km','lbs','kg'];    
    var result = formattedInput.slice(index).toLowerCase();
    if (!validUnits.includes(result)) return "invalid unit";    
    return result;
  };
  
  this.getReturnUnit = function(initUnit) {
    const returnedUnits = {
      "gal": "l",
      "l": "gal",
      "lbs": "kg",
      "kg": "lbs",
      "mi": "km",
      "km": "mi"
    }

    if (initUnit in returnedUnits) return returnedUnits[initUnit]
  };

  this.spellOutUnit = function(unit) {
    const fullNameUnits = {
      gal: "gallons",
      l: "liters",
      lbs: "pounds",
      kg: "kilograms",
      mi: "miles",
      km: "kilometers"
    };
    return fullNameUnits[unit]
  };
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    const conversions = {
      "gal": galToL,
      "l": 1/galToL,
      "lbs": lbsToKg,
      "kg": 1/lbsToKg,
      "mi": miToKm,
      "km": 1/miToKm
    };
    
    if (initUnit in conversions && !Number(initNum)) initNum = 1;
    return Number((initNum * conversions[initUnit]).toFixed(5))
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {    
    return `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;
  };
  
}

module.exports = ConvertHandler;
