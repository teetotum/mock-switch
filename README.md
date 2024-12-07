# mock-switch

This package consists of a minimalistic UI and a simple API to integrate with your mock setup.
The UI enables you to switch between your prepared mock responses during runtime; where previously you would have had to comment-in and comment-out prepared lines of code in your source file, and rebuild your front-end to switch between different scenarios of mocked responses.
This package can be used with any client-side mock setup; no matter if you use [mock-service-worker](https://www.npmjs.com/package/msw), [fetch-mock](https://www.npmjs.com/package/fetch-mock), [xhr-mock](https://www.npmjs.com/package/xhr-mock), or [axios-response-mock](https://www.npmjs.com/package/axios-response-mock).

The `mock-switch` package is useful when demoing your front-end to show how it behaves in different scenarios and useful during development to trigger all front-end states your component is supposed to handle, but it is not meant to be used with mocks in automatic test runs which usually run headless anyway, and even when not, are not designed to query for ad-hoc user input.

You do not need to integrate `mock-switch` with all of your prepared mocks and all scenarios; you can add it selectively where you need the choices to be selectable during runtime.

## usage

Add `mock-switch` to your `package.json` and install via `npm` or your preferred package manager.
Import it in your mock setup file and call `mockSwitch` anywhere you want to enable switching between different choices via the UI.

The following example uses a `mock-service-worker` setup

```js
import { http, HttpResponse } from "msw";
import { mockSwitch } from "mock-switch";

export const handlers = [
  http.get("user/isVerified", ({ request }) => {
    // here we enable switching between different scenarios
    switch (
      mockSwitch("respond to user/isVerified", [
        "verified user",
        "unverified user",
        "bad request",
        "server error",
      ])
    ) {
      case "verified user":
        return HttpResponse.json({ isVerified: true });
      case "unverified user":
        return HttpResponse.json({ isVerified: false });
      case "bad request":
        return new Response(null, { status: 400 });
      case "server error":
        return new Response(null, { status: 500 });
      default:
        return null;
    }
  }),
  http.get("user/isPremiumEnabled", ({ request }) => {
    // here no choices are supported
    return HttpResponse.json({ isPremiumEnabled: true });
  }),
];
```

The function `mockSwitch(qualifier: string, choices: Array<string>) => selectedCoice: string` takes two arguments: a qualifier `string` that identifies the intercepted route in a user readable way, and an array of choices the user can choose from. The selected choice is returned.
The function executes and returns synchronously, if the user previously made no decision for the intercepted route the first choice is selected by default. The user can select any choice for any intercepted route in the UI prior to triggering the interaction that would result in the intercepted route.
User decisions are persisted in session storage and therefore survive page refresh.

Currently no option to block a request while prompting the user for a decision is offered, but might be added in a future version (this would require an `async` variant of `mockSwitch` and would only work with mocking setups that support async resolver functions).

The qualifier and choices do not need to adhere to any syntax; to ensure your user decisions are mapped correctly to the intercepted routes your qualifiers should be distinct (different routes should have different qualifiers); and choices should be unique within the same group only (so it is fine to have a 'bad request' for route A and another 'bad request' for a different route B).

## API documentation

Currently this README text is the only available documentation.

## contributing feedback

If you think `mock-switch` is missing a feature or the documentation doesn't answer all your questions please visit the [discussions](https://github.com/teetotum/mock-switch/discussions) section and provide your feedback.
If you found a bug please visit the [issues](https://github.com/teetotum/mock-switch/issues) section and check whether your issue has been reported, and if not open a new issue.
All contributions are expected to be reasonably formatted using markdown, edited for clarity, and reasonably complete to form the basis of a constructive discussion.
