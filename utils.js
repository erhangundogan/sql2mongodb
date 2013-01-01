var crypto = require("crypto");

exports.isArray = function(v) {
  return v.isArray ||
         v instanceof Array ||
         Object.prototype.toString.call(v) == '[object Array]';
};

exports.aspectRatio = function(w, h, c) {
  if (!w || !h) { return null; }

  var constant = c || 160,
      width = w,
      height = h,
      ratio = width / height;

  if (ratio <= 0.9) {
    width = Math.floor(width*constant/height);
    height = constant;
  } else {
    height = Math.floor(height*constant/width);
    width = constant;
  }

  return {width:width, height:height};
}

/**
 * Merge object b with object a.
 *
 *     var a = { foo: 'bar' }
 *       , b = { bar: 'baz' };
 *
 *     utils.merge(a, b);
 *     // => { foo: 'bar', bar: 'baz' }
 *
 * @param {Object} a
 * @param {Object} b
 * @return {Object}
 * @api private
 */
exports.merge = function(a, b){
  if (a && b) {
    for (var key in b) {
      a[key] = b[key];
    }
  }
  return a;
};

/**
 * Flatten the given `arr`.
 *
 * @param {Array} arr
 * @return {Array}
 * @api private
 */
exports.flatten = function(arr, _ret) {
  var ret = _ret || [],
      len = arr.length, i;
  for (i = 0; i < len; ++i) {
    if (Array.isArray(arr[i])) {
      exports.flatten(arr[i], ret);
    } else {
      ret.push(arr[i]);
    }
  }
  return ret;
};

/**
 * dd.mm.yyyy string objesinden Date objesi üretir
 *
 * @param value
 */
exports.toDate = function toDate(value) {
  if (!value || value.length !== 10) {
    return new Date();
  } else {
    return new Date(
      Number(value.slice(6, 10)),
      Number(value.slice(3, 5)) - 1,
      Number(value.slice(0, 2)),
      2,0,0); // yıl, ay, gün
  }
};

/**
 * Date objesinden { date:dd.mm.yyyy, time:hh:mm, day:"<Gün>" } objesi üretir
 *
 * @param value
 */
exports.fromDate = function fromDate(value) {
  var date,
      result,
      dateArray = [],
      timeArray = [],
      dateNum,
      monthNum,
      days = ["Pazar", "Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi"];

  if (value) {
    result = {};
    date = new Date(value);
    dateNum = "" + date.getDate();
    monthNum = "" + (date.getMonth() + 1);

    dateNum = dateNum.length === 1 ? "0" + dateNum : dateNum;
    monthNum = monthNum.length === 1 ? "0" + monthNum : monthNum;

    dateArray.push(dateNum);
    dateArray.push(monthNum);
    dateArray.push(date.getFullYear());
    result.date = dateArray.join(".");

    var hours = date.getHours();
    timeArray.push(hours < 10 ? "0"+hours : hours);
    var minutes = date.getMinutes();
    timeArray.push(minutes < 10 ? "0"+minutes : minutes);
    result.time = timeArray.join(":");

    result.day = days[date.getDay()];
  }
  return result;
};

/**
 * Returns a random int, used by `utils.uid()`
 *
 * @param {Number} min
 * @param {Number} max
 * @return {Number}
 * @api private
 */
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Returns fixed decimal number
 *
 * toFixed(1.689442324, 2) => 1.68
 *
 * @param precision
 */
exports.toFixed = function(number, precision) {
  var power = Math.pow(10, precision || 0);
  return Math.round(number * power) / power;
};

/**
 * Return a unique identifier with the given `len`.
 *
 *     utils.uid(10);
 *     // => "3DaS435D2z"
 *     utils.uid(10, true);
 *     // => "cDaS435D2z"
 *
 * @param {Number} len
 * @param {Boolean} first character must be alpha numeric char (for html id generation)
 * @return {String}
 * @api public
 */
exports.uid = function(len, firstAlphaNumeric) {
  var buf = [],
      chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",
      charlen = chars.length,
      firstAlphaNumeric = firstAlphaNumeric || false;

  if (firstAlphaNumeric) {
    var alphaNumericChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
        ancharlen = alphaNumericChars.length;

    buf.push(alphaNumericChars[getRandomInt(0, ancharlen - 1)]);
    len -= 1;
  }

  for (var i = 0; i < len; ++i) {
    buf.push(chars[getRandomInt(0, charlen - 1)]);
  }

  return buf.join("");
};

/**
 * node.js > 0.6

exports.uid = function(len) {
  return crypto.randomBytes(Math.ceil((len*3)/4))
    .toString('base64')
    .slice(0, len);
};
 */