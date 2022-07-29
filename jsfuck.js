const charMap = {};

const zero = '+[]';
const one = '+!![]';

const fromNumber = (num) => {
  return num === 0
    ? zero  
    : Array.from({ length: num }, () => one).join(' + ');
}
charMap['\\'] = `(/\\\\/+[])[${fromNumber(1)}]`;
charMap[' '] = `({}+[])[${fromNumber(7)}]`;
charMap.a = `(+{}+[])[${fromNumber(1)}]`;
charMap.b = `({}+[])[${fromNumber(2)}]`;
charMap.o = `({}+[])[${fromNumber(1)}]`;
charMap.e = `({}+[])[${fromNumber(4)}]`;
charMap.c = `({}+[])[${fromNumber(5)}]`;
charMap.t = `({}+[])[${fromNumber(6)}]`;
charMap.f = `(![]+[])[${fromNumber(0)}]`;
charMap.s = `(![]+[])[${fromNumber(3)}]`;
charMap.r = `(!![]+[])[${fromNumber(1)}]`;
charMap.u = `(!![]+[])[${fromNumber(2)}]`;
charMap.i = `((+!![]/+[])+[])[${fromNumber(3)}]`;
charMap.n = `((+!![]/+[])+[])[${fromNumber(4)}]`;

const fromString = (str) => {
  return str.split('').map((char) => {
    return (char in charMap)
      ? charMap[char]
      : `([]+[])[${fromString('constructor')}][${fromString('fromCharCode')}](${fromNumber(char.charCodeAt(0))})`;
  }).join('+');
}

charMap.S = `([]+([]+[])[${fromString('constructor')}])[${fromNumber(9)}]`;
charMap.g = `([]+([]+[])[${fromString('constructor')}])[${fromNumber(14)}]`;
charMap.p = `([]+(/-/)[${fromString('constructor')}])[${fromNumber(14)}]`;

charMap.d = `(${fromNumber(13)})[${fromString('toString')}](${fromNumber(14)})`;
charMap.h = `(${fromNumber(17)})[${fromString('toString')}](${fromNumber(18)})`;
charMap.m = `(${fromNumber(22)})[${fromString('toString')}](${fromNumber(23)})`;
charMap.C = `((()=>{})[${fromString('constructor')}](${fromString('return escape')})()(${charMap['\\']}))[${fromNumber(2)}]`;

const compile = (code) => {
  return `(()=>{})[${fromString('constructor')}](${fromString(code)})()`;
}

const input = process.argv[2];

if (input) {
  import('fs').then((fs) => {
    fs.readFile(input, 'utf8', (err, data) => {
      if (err) {
        console.log(err);
      } else {
        import('path').then((path) => {
          fs.writeFile(`${path.parse(input).name}.fuck.js`, compile(data), (err) => {
            if (err) {
              console.log(err);
            } else {
              console.log(`${path.parse(input).name}.fuck.js compiled successfully`);
            }
          });
        }).catch((err) => {
          console.log(err);
        });
      }
    });
  }).catch((err) => {
    console.log(err);
  });
} else {
  console.log('Please provide a file path');
}
