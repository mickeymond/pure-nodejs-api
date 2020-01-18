/*
* Test Runner
*
*/
it = (testDescription, testFunction) => {
  _app.tests.unit[testDescription] = testFunction;
}

// Application Logic fro the Test Runner
_app = {};

// Container for Tests
_app.tests = {};

_app.tests.unit = {};

require('./unit');
require('./api');

// Count all the Tests
_app.countTests = () => {
  let counter = 0;
  for (let key in _app.tests) {
    if (_app.tests.hasOwnProperty(key)) {
      let subTests = _app.tests[key];
      for (let testName in subTests) {
        if (subTests.hasOwnProperty(testName)) {
          counter++;
        }
      }
    }
  }
  return counter;
}

// Run all the tests
_app.runTests = () => {
  const errors = [];
  let success = 0;
  const limit = _app.countTests();
  let counter = 0;

  for (let key in _app.tests) {
    if (_app.tests.hasOwnProperty(key)) {
      const subTests = _app.tests[key];
      for (let testName in subTests) {
        if (subTests.hasOwnProperty(testName)) {
          (() => {
            let tmpTestName = testName;
            let testValue = subTests[testName];
            // Call the test
            try {
              testValue(() => {
                // If it calls back without failing that means it succeded, so log it in green
                console.log('\x1b[32m%s\x1b[0m',tmpTestName);
                counter++;
                success++
                if (counter === limit) {
                  _app.produceTestResults(limit, success, errors);
                }
              });
            } catch (error) {
              // If it throwns then it failed, so capture the error and log it in red
              errors.push({
                'name': testName,
                'error': error
              });
              console.log('\x1b[31m%s\x1b[0m',tmpTestName);
              counter++;
              if (counter === limit) {
                _app.produceTestResults(limit, success, errors);
              }
            }
          })();
        } 
      }
    }
  }
}

// Produce a Test Outcome Report
_app.produceTestResults = (limit, success, errors) => {
  console.log("");
  console.log("--------BEGIN TEST REPORT--------");
  console.log("");
  console.log("Total Tests: ",limit);
  console.log("Pass: ",success);
  console.log("Fail: ",errors.length);
  console.log("");

  // If there are errors, print them in detail
  if(errors.length > 0){
    console.log("--------BEGIN ERROR DETAILS--------");
    console.log("");
    errors.forEach(function(testError){
      console.log('\x1b[31m%s\x1b[0m',testError.name);
      console.log(testError.error);
      console.log("");
    });
    console.log("");
    console.log("--------END ERROR DETAILS--------");
  }


  console.log("");
  console.log("--------END TEST REPORT--------");
}

// Run Application Tests
_app.runTests();