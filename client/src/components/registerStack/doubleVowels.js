let str = ['w','h','a','t',' ','o','n',' ','e','a','r','t','h',' ','a','r','e',' ','y','o','u',' ','t','a','l','k','i','n','g',' ','a','b','o','u','t','?'];

const doubleVowels = (str) => {
  let vowelCount = 0;
  let originalLength = 0;
  for (let i = 0; i < str.length; i ++) {
    originalLength++
    if (['a', 'e', 'i', 'o', 'u'].includes(str[i])) {
      vowelCount++
    }
  }

  let newLength = originalLength + vowelCount - 1;
  for (let i = originalLength - 1; i >= 0; i--) {
    str[newLength] = str[i];
    newLength--
    if (['a','e','i','o','u'].includes(str[i])) {
      str[newLength] = str[i];
      newLength--
    }
  }
  return str;
}


const expected = ['w','h','a','a','t',' ','o','o','n',' ','e','e','a','a','r','t','h',' ','a','a','r','e','e',' ','y','o','o','u','u',' ','t','a','a','l','k','i','i','n','g',' ','a','a','b','o','o','u','u','t','?'];

const areArraysEqual = (expected, actual, testName) => {
  let areEqualLength = actual.length === expected.length;
  let areEqualValues = actual.every((item, i) => item === expected[i]);

  if (areEqualValues && areEqualLength) {
    console.log('passed');
  } else {
    console.log('failed ', testName, ': expected ', expected, ' but got ', actual);
  }
}

areArraysEqual(expected, doubleVowels(str), 'it should double all vowels');