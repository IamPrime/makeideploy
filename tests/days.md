# How to Add New Test Case for Days

If you wan add new case to test for day inside Time class, follow these steps wey I go tell you now-now:

- First-first, find that `days.test.ts` file wey dey inside `tests` folder.
- Copy one of those describe blocks wey dey there already, the one wey match the day you wan test (like `isMonday()`, `isTuesday19th()`, and co).
- Paste am for the file, then change the name to the day you dey test.
- For inside the describe block, add new it block to test your own special case.
- For the `it` block, create new `Date` object with the date and time wey you wan test.
- Use `jest.spyOn()` to do as if you be the `now` function of the `Time` class, then return that Date object wey you just create.
- Call the method wey you dey test on top the `time` object, then use `expect` to check if the result na wetin you dey expect.
- Save the file, then run the tests to make sure say everything dey work as e suppose be.

This example go show you how new `it` block fit be:

```JavaScript
it('returns true if it is a holiday', () => {
  const date = new Date('December 25, 2023 00:00:00')
  jest.spyOn(time, 'now').mockImplementation(() => date)
  expect(time.isHolidays()).toBe(true)
})
```

Na so o! If you follow these steps, you go fit add new test cases to the `Time` class to make sure say e dey work well-well for all days and times.

*Disclaimer: Dis text na AI generate am.*
