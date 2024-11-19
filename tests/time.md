# How to Add New Test Cases to Time Class

This guide go show you how to add new test cases to the `Time` class.

## How to Start

- First-first, open the `tests/time.test.ts` file for your code editor.
- Find the test suite wey you wan add new test cases to. For this example, we go use the one wey dem call "should correctly identify timezone existence".

To add new test case, you go need to add an `it` block inside the `describe` block of the test suite.

```JavaScript
describe('Time Class', () => {
  test('should correctly identify timezone existence', () => {
    expect(Time.zoneExists('America/Argentina/Buenos_Aires')).toBe(true)
    expect(Time.zoneExists('Invalid/Timezone')).toBe(false)
  })

  it('should return true if timezone is valid', () => {
    // Add your test case here
  })
})
```

Write your test case inside the `it` block, using `expect` to assert the expected behavior.

```JavaScript
it('should return true if timezone is valid', () => {
  expect(Time.zoneExists('America/New_York')).toBe(true)
})
```

Run the tests using the command `npm test` to ensure that your new test case passes.

```bash
npm test
```

Na so e be! If you follow these steps, you go fit add new test cases to the Time class.
