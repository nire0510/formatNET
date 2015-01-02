describe("formatJS Library", function() {
  it ("String.format", function () {
    expect(typeof String().format).toEqual('function');
    expect('Hello, {0}'.format('Nir')).toEqual('Hello, Nir');
    expect('{0} price: {1}$'.format('Phone', 100)).toEqual('Phone price: 100$');
    expect('{0} {1} {1} {0}'.format('alpha', 'bravo')).toEqual('alpha bravo bravo alpha');
  });

  it ("Number.format", function () {
    expect(typeof Number().format).toEqual('function');
    expect(new Number(1234.5678).format('00000')).toEqual('01235');
    expect(new Number(1234.5678).format('0')).toEqual('1235');
    expect(new Number(123).format('00000')).toEqual('00123');
    expect(new Number(0.45678).format('0.00')).toEqual('0.46');
    expect(new Number(1.2).format('0.00')).toEqual('1.20');
    expect(new Number(1.2).format('00.00')).toEqual('01.20');
    expect(new Number(.28).format('0.0')).toEqual('0.3');
    //expect(new Number(1234.5678).format('#####')).toEqual('1235');
    //expect(new Number(0.45678).format('#.##')).toEqual('.46');
  });

  it ("Date.format", function () {
    var dt = new Date();

    dt.setMonth(1);
    dt.setDate(1);
    dt.setFullYear(2015);
    dt.setHours(9);
    dt.setMinutes(5);
    dt.setSeconds(25);

    // Date
    expect(dt.format('y')).toEqual('15');
    dt.setFullYear(2005);
    expect(dt.format('y')).toEqual('5');
    dt.setFullYear(2015);
    expect(dt.format('yy')).toEqual('15');
    expect(dt.format('yyy')).toEqual('015');
    expect(dt.format('yyyy')).toEqual('2015');
    expect(dt.format('M')).toEqual('1');
    expect(dt.format('MM')).toEqual('01');
    expect(dt.format('MMM')).toEqual('Jan');
    expect(dt.format('MMMM')).toEqual('January');
    // Hour
    expect(dt.format('h')).toEqual('9');
    expect(dt.format('hh')).toEqual('09');
    expect(dt.format('H')).toEqual('9');
    expect(dt.format('HH')).toEqual('09');
    expect(dt.format('m')).toEqual('5');
    expect(dt.format('mm')).toEqual('05');
    expect(dt.format('s')).toEqual('25');
    expect(dt.format('ss')).toEqual('25');
    expect(dt.format('t')).toEqual('A');
    expect(dt.format('tt')).toEqual('AM');
    expect(dt.format('z')).toEqual('+4');
    expect(dt.format('zz')).toEqual('+04');
    expect(dt.format('zzz')).toEqual('+04:00');
    // Predefined formats:
    expect(dt.format('shortTime')).toEqual('9:05 AM');
    expect(dt.format('shortDate')).toEqual('1/1/2015');
    expect(dt.format('longTime')).toEqual('9:05:25 AM');
    expect(dt.format('longDate')).toEqual('Sunday, January 01, 2015');
    expect(dt.format('sortableDateTime')).toEqual('2015-01-0109:05:25');
  });
});