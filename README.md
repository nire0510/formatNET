# formatNET
**The missing JavaScript format method**

formatNET is a lightweight JavaScript library inspired by .NET `Format` and `ToString` methods,
which allows programmers to replace placeholders in strings and reformat numbers & dates values accordingly.

### Strings
This is the most simple usage, which reminds many JavaScript templates engines libraries out there.
It allows you to replace ordered placeholders in string with arguments of any type. Few examples:
```javascript
'Hello, {0}'.format('Nir'); // => 'Hello, Nir'
'{0} price: {1}$'.format('Phone', 100); // => 'Phone price: 100$'
'{0} {1} {1} {0}'.format('alpha', 'bravo'); // => 'alpha bravo bravo alpha'
```

### Numbers
Number format method is useful in formatting raw numbers as prices, percents and more.
The library current supports the **0 place holder** specifier, which replaces a zero with the corresponding digit
if one is present; otherwise, zero appears in the result string.
The following examples demonstrate the formatting and the smart round action that is applied on formatted numbers:
```javascript
var num = new Number(1234.5678);

num.format('00000'); // => '01235'
num.format('0.00'); // => '1234.57'
```

### Dates & Times
Dates & times can be formatted as well. You can use one of the predefined formats or write your custom format if you want:
```javascript
var dt = new Date();

dt.format('MMM, dddd'); // => 'Jan, Thrsday'
dt.format('shortTime'); // => 'Jan, Thrsday'
```
As seen above, **formatnet** offers a few built-in format templates:

| Template | Description | Example |
|:---------|:-----------|:--------|
| shortTime | The time, using a 12-hours clock | 2015-01-01T09:45:30 -> 9:45 AM|
| longTime | The time with seconds, using a 12-hours clock | 2015-01-01T09:45:30 -> 9:45:30 AM|
| shortDate | The date in numbers only | 2015-01-01T09:45:30 -> 1/1/15|
| longDate | The date in full names | 2015-01-01T09:45:30 -> Thursday, January 01, 2015|

In addition to the predefined templates above, you can also customize formats dates & times using the specifiers below:

| Specifier | Description | Example |
|:----------|:-----------|:--------|
|y | The year, from 0 to 99 | 2015-01-01T13:45:30 -> 15|
|yy | The year, from 00 to 99 | 2015-01-01T13:45:30 -> 15|
|yyy | The year, with a minimum of three digits | 2015-01-01T13:45:30 -> 2015|
|yyyy | The year as a four-digit number | 2015-01-01T13:45:30 -> 2015|
|yyyyy | The year as a five-digit number | 2015-01-01T13:45:30 -> 02015|
|M | The month, from 1 through 12 | 2014-01-01T13:45:30 -> 1|
|MM | The month, from 01 through 12 | 2014-12-01T13:45:30 -> 01|
|MMM | The abbreviated name of the month | 2014-12-01T13:45:30 -> Jan|
|MMMM | The full name of the month | 2014-12-01T13:45:30 -> January|
|d | The day of the month, from 1 through 31 | 2014-12-01T13:45:30 -> 1|
|dd | The day of the month, from 01 through 31 | 2014-12-01T13:45:30 -> 01|
|ddd | The abbreviated name of the day of the week | 2014-12-01T13:45:30 -> Thu|
|dddd | The full name of the day of the week 2014-12-01T13:45:30 -> Thursday|
|h | The hour, using a 12-hour clock from 1 to 12 | 2014-12-01T13:45:30 -> 1|
|hh | The hour, using a 12-hour clock from 01 to 12 | 2014-12-01T13:45:30 -> 01|
|H | The hour, using a 24-hour clock from 0 to 23 | 2014-12-01T13:45:30 -> 13|
|HH | The hour, using a 24-hour clock from 00 to 23 | 2014-12-01T13:45:30 -> 13|
|m | The minute, from 0 through 59 | 2014-12-01T13:45:30 -> 45|
|mm | The minute, from 00 through 59 | 2014-12-01T13:45:30 -> 45|
|s | The second, from 0 through 59 | 2014-12-01T13:45:30 -> 30|
|ss | The second, from 00 through 59 | 2014-12-01T13:45:30 -> 30|
|t | The first character of the AM/PM designator | 2014-12-01T13:45:30 -> P|
|tt | The AM/PM designator | 2014-12-01T13:45:30 -> PM|
|z | Hours offset from UTC, with no leading zeros | 2014-12-01T13:45:30-07:00 -> -7|
|zz | Hours offset from UTC, with a leading zero for a single-digit value | 2014-12-01T13:45:30-07:00 -> -07|
|zzz | Hours and minutes offset from UTC | 2014-12-01T13:45:30-07:00 -> -07:00|

#### Locales
**formatnet** comes with a built-in dictionary which contains days & months names for en-us locale.
when loaded, **formatnet** takes current locale from `window.navigator.language` and tries to find its dictionary.
If it doesn't, the default language dictionary is loaded, which is **en-us**.  
More dictionaries are available under locales folder. To add an additional dictionary, add its file to your page, right above **formatnet** library file:

```html
<!-- Loads the French dictionary -->
<script src="bower_components/formatnet/dist/locales/fr-fr.js"></script>
<!-- Loads formatnet library -->
<script src="bower_components/formatnet/dist/formatnet.min.js"></script>
```