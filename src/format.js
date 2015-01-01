var FormatJS = (function() {
  "use strict";
  var _locale = "en-US";

  /*
   * Validator of method's arguments.
   * args - array of method's arguments.
   * vector - JSON object which contains validation rules
   */
  var isValid = function (args, vector) {
    for (var check in vector) {
      if (vector.hasOwnProperty(check)) {
        switch(check) {
          case "argsnum":
            if ((vector[check] == args.length) === false) {
              throw "Wrong number of arguments. Valid number of arguments is " + vector[check];
            }
            break;
          case "minargsnum":
            if ((vector[check] <= args.length) === false) {
              throw "Too few arguments";
            }
            break;
          case "maxargsnum":
            if ((vector[check] >= args.length) === false) {
              throw "Too many arguments";
            }
            break;
          case "regex":
            if (vector[check].test(args[0]) === false) {
              throw "Invalid format";
            }
            break;
        }
      }
    }
    return true;
  };

  /*
   * Dictionary object.
   */
  var Dictionary = {
    "en-US": {
      Days: ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'],
      DaysShort: ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'],
      Months: ['January','February','March','April','May','June','July','August','September','October','November','December']
    },
    "he-IL": {
      Days: ['ראשון','שני','שלישי','רביעי','חמישי','שישי','שבת'],
      DaysShort: ['א','ב','ג','ד','ה','ו','ש'],
      Months: ['ינואר','פברואר','מרץ','אפריל','מאי','יוני','יולי','אוגוסט','ספטמבר','אוקטובר','נובמבר','דצמבר']
    },
    "es-ES": {
      Days: ['domingo', 'lunes','martes','miércoles','jueves','viernes','sábado'],
      DaysShort: ['dom','lun','mar','mié','jue','vie','sáb'],
      Months: ['enero','febrero','marzo','abril','mayo','junio','julio','agosto','setiembre','octubre','noviembre','diciembre']
    }
  };

  /*
   * Set the locale to affect the months & days names.
   */
  var setLocale = function(strLocale) {
    if (Dictionary.hasOwnProperty(strLocale))
      _locale = strLocale;
    else
      throw "Invalid locale";
  };

  /*
   * Add the format method to any String type objects.
   * Usage samples:
   * 1. "Hello, {0}".format("Nir") -> "Hello, Nir"
   */
  String.prototype.format = function () {
    var args = arguments;
    return this.replace(/{{|}}|{(\d+)}/g, function (curlyBrack, index) {
      return ((curlyBrack == "{{") ? "{" : ((curlyBrack == "}}") ? "}" : args[index]));
    });
  };

  /*
   * Add the format method to any Number type objects.
   * Usage samples:
   * var num = new Number(20.6);
   * num.format("###.00"); -> 20.60
   */
  Number.prototype.format = function () {
    var args = arguments,
      clearFormat = null,
      numberArray = null,
      formatArray = null,
      numberInnerArray = null,
      formatInnerArray = null,
      outputArray = [];

    if (isValid(args, {argsnum:1, regex:/[#0\- ]+/})) {
      clearFormat = args[0].replace(/[^0#\.]/g, '');
      numberArray = (this.toFixed((clearFormat.length - clearFormat.indexOf('.') - 1) % clearFormat.length).toString()).split('.');
      formatArray = args[0].split('.');
      for (var i = 0; i < formatArray.length; i++) {
        // Convert strings to arrays
        if (i === 0) {
          numberInnerArray = numberArray[i].split('').reverse(); // Convert string to array
          formatInnerArray = formatArray[i].indexOf('0') >= 0 ?
            (formatArray[i].substr(0, formatArray[i].indexOf('0')) + formatArray[i].substr(formatArray[i].indexOf('0')).replace(/#/g, '0')).split('').reverse() : // Convert string to array
            formatArray[i].split('').reverse();
        }
        else {
          if (formatArray[i].length > 0){
            outputArray.push('.');
            numberInnerArray = numberArray[i].split(''); // Convert string to array
            formatInnerArray = formatArray[i].indexOf('0') >= 0 ?
              (formatArray[i].substr(0, formatArray[i].lastIndexOf('0')) + formatArray[i].substr(formatArray[i].lastIndexOf('0')).replace(/#/g, '0')).split('') : // Convert string to array
              formatArray[i].split('');
          }
        }
        while(numberInnerArray.length || formatInnerArray.length) {
          if(numberInnerArray.length && formatInnerArray.length) {
            if(/[^0#]/.test(formatInnerArray[0])) {
              outputArray.push(formatInnerArray.shift());
            } else {
              var intLength = (formatInnerArray.join('').match(/[0#]/g).length == 1 ? numberInnerArray.length : 1);
              for (var j = 0; j < intLength; j++) {
                outputArray.push(numberInnerArray.shift());
              }
              formatInnerArray.shift();
            }
          } else if (numberInnerArray.length) {
            outputArray.push(numberInnerArray.shift());
          } else {
            if(/[^#]/.test(formatInnerArray[0])) {
              outputArray.push(formatInnerArray.shift());
            }
            else
              formatInnerArray.shift();
          }
        }
        if (i === 0) outputArray.reverse();
      }
      return outputArray.join('');
    }
  };

  /*
   * Add the format method to any Date type objects.
   * var dt = new Date();
   * dt.format("MMM yyyy, hh:mm") -> Oct 2010, 10:00;
   */
  Date.prototype.format = function () {
    var args = arguments,
      format = null,
      temp = null;

    if (isValid(args, {argsnum:1})) {
      format = args[0].toString().match(/\w+|[-_/\\\., ]+/g);
      for(var i = 0; i < format.length; i++) {
        switch(format[i]) {
          case "y":
            format[i] = this.getFullYear().toString().substr(3);
            break;
          case "yy":
            format[i] = this.getFullYear().toString().substr(2);
            break;
          case "yyy":
            format[i] = this.getFullYear().toString().substr(1);
            break;
          case "yyyy":
            format[i] = this.getFullYear();
            break;
          case "M":
            format[i] = this.getMonth();
            break;
          case "MM":
            temp = this.getMonth();
            format[i] = ("0" + temp).substr(Math.abs(1 - temp.toString().length));
            break;
          case "MMM":
            format[i] = Dictionary[_locale].Months[this.getMonth()].substr(0, 3);
            break;
          case "MMMM":
            format[i] = Dictionary[_locale].Months[this.getMonth()];
            break;
          case "d":
            format[i] = this.getDate();
            break;
          case "dd":
            temp = this.getDate();
            format[i] = ("0" + temp).substr(Math.abs(1 - temp.toString().length));
            break;
          case "ddd":
            format[i] = Dictionary[_locale].Days[this.getDay()].substr(0, 3);
            break;
          case "dddd":
            format[i] = Dictionary[_locale].Days[this.getDay()];
            break;
          case "h":
            format[i] = this.getHours() % 12;
            break;
          case "hh":
            temp = this.getHours() % 12;
            format[i] = ("0" + temp).substr(Math.abs(1 - temp.toString().length));
            break;
          case "H":
            format[i] = this.getHours();
            break;
          case "HH":
            temp = this.getHours();
            format[i] = ("0" + temp).substr(Math.abs(1 - temp.toString().length));
            break;
          case "m":
            format[i] = this.getMinutes();
            break;
          case "mm":
            temp = this.getMinutes();
            format[i] = ("0" + temp).substr(Math.abs(1 - temp.toString().length));
            break;
          case "s":
            format[i] = this.getSeconds();
            break;
          case "ss":
            temp = this.getSeconds();
            format[i] = ("0" + temp).substr(Math.abs(1 - temp.toString().length));
            break;
          case "t":
            format[i] = (this.getHours() < 12 ? "A" : "P");
            break;
          case "tt":
            format[i] = (this.getHours() < 12 ? "AM" : "PM");
            break;
          case "z":
            temp = 6 + this.getTimezoneOffset() / 60;
            format[i] = (temp > 0 ? "+" : "") + temp;
            break;
          case "zz":
            temp = 6 + this.getTimezoneOffset() / 60;
            format[i] = (temp > 0 ? "+" : "") + ("0" + temp).substr(Math.abs(1 - temp.toString().length));
            break;
          case "shortTime":
            format[i] = this.format("h:mm tt");
            break;
          case "shortDate":
            format[i] = this.format("M/d/yyyy");
            break;
          case "longTime":
            format[i] = this.format("h:mm:ss tt");
            break;
          case "longDate":
            format[i] = this.format("dddd, MMMM dd, yyyy");
            break;
          case "fullDateTime":
            format[i] = this.format("dddd, MMMM dd, yyyy h:mm:ss tt");
            break;
          case "sortableDateTime":
            format[i] = this.format("yyyy-MM-dd~HH:mm:ss").replace('~', 'T');
            break;
        }
      }
      return (format.join(''));
    }
  };

  return {
    setLocale: setLocale
  };
})();