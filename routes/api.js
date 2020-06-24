/*
*
*
*       Complete the API routing below
*
*
*/

'use strict';

var expect = require('chai').expect;
var ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  
  var convertHandler = new ConvertHandler();

  app.route('/api/convert')
    .get(function (req, res){
      var input = req.query.input;      
      if (!input) return res.json({error: "invalid number and unit", string: "Error"});  

      var initNum = convertHandler.getNum(input);
      if (initNum === "no unit") return res.json({error: "no unit", string: "Error"});
      if (initNum === "invalid number") return res.json({error: "invalid number", string: "Error"});
      if (initNum === "cannot divide by zero") return res.json({error: "cannot divide by zero", string: "Error"});

      var initUnit = convertHandler.getUnit(input);
      if (initUnit === "invalid unit") return res.json({error: "invalid unit", string: "Error"})

      var returnNum = convertHandler.convert(initNum, initUnit);

      var returnUnit = convertHandler.getReturnUnit(initUnit);
      var toString = convertHandler.getString(initNum, initUnit, returnNum, returnUnit);
      
      //res.json
      return res.json({
        initNum,
        initUnit,
        returnNum,
        returnUnit,
        string: toString
      })
    });
    
};
