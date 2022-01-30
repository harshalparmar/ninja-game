
((global) => {

	const expandAll = true;

	const TestType = Symbol('Test');
	const GroupType = Symbol('Group');
	let testQueue = [];
	let testOverride = null;
	let runTestCount = 0;
	function runTest(test) {
		switch (test.type) {
			case TestType:
				runTestCount++;
				try {
					test.testFn();
					console.log(
						`%cPASS%c ${test.name}`,
						'color: #fff; background-color: #01a54f; padding: 1px 6px; border-radius: 2px',
						'color: #01a54f;'
					);
				}
				catch(e) {
					console.log(
						`%cFAIL%c ${test.name}`,
						'color: #fff; background-color: #e50000; padding: 1px 6px; border-radius: 2px',
						'color: #e50000;'
					);
					console.error(e);
				}
				break;

			case GroupType:
				expandAll ? console.group(test.name) : console.groupCollapsed(test.name);
				test.tests.forEach(runTest);
				console.groupEnd();
				break;

			default:
				throw new Error('Invalid object type');
		}

	}

	setTimeout(() => {
		runTestCount = 0;
		let startTime = performance.now();
		if (testOverride) {
			console.log(
				'%cTest Runner: Hiding all but one test result.',
				'color: #700; background-color: #fdd; padding: 2px 10px; border-radius: 20px;'
			);
			runTest(testOverride);
		} else {
			testQueue.forEach(runTest);
		}
		const runTime = performance.now() - startTime;
		console.log(`Test Runner: Ran ${runTestCount} ${runTestCount === 1 ? 'test' : 'tests'} in ${runTime.toFixed(2)} ms.`);
	});


	function describe(name, queueTests) {
		const oldQueue = testQueue;
		testQueue = [];
		queueTests();
		oldQueue.push({ type: GroupType, name: name, tests: testQueue });
		testQueue = oldQueue;
	}

	describe.only = function describeOnly(name, queueTests) {
		const oldQueue = testQueue;
		testQueue = [];
		queueTests();
		testOverride = { type: GroupType, name: name, tests: testQueue };
		testQueue = oldQueue;
	};

	function test(name, testFn) {
		testQueue.push({ type: TestType, name, testFn });
	}

	test.only = function testOnly(name, testFn) {
		testOverride = { type: TestType, name, testFn };
	}

	global.describe = describe;
	global.test = test;
	global.it = test;

})(window);