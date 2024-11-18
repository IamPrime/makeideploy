# makeideploy.today [site]

We just want make you know say we no de joke. 
I know say some of una people dey think say we dey joke but we dey serious.

FOSSA Status - [fossa-url]
FOSSA Badge - [fossa-badge]

## Getting started

* Run dis tin:
  * `npm i` — make dependencies enter.
  * `npm run dev` start dev server
  * `now dev` if you want use local serveless function (you go need "now")

## Add your reasons

Reasons dey for [reasons.ts].

## API endpoint

We get API wey you fit use for your CI or just for fun at [api-endpoint].

You fit add some optional parameters wey go customize API response:

* `tz`: Timezone wey you want use. Put correct timezone string, like `Africa/Lagos` or `America/Chicago`. Default na `UTC`.

* `date`: Date wey you want check. Default na today. Put correct date string for this format `YYYY-MM-DD`, like `2024-11-18`.

### Examples

Get the default API response using the current date and time in the UTC timezone:

```url
https://makeideploy.today/api
```

Get the API response for a specific timezone (e.g., Africa/Lagos):

```url
https://makeideploy.today/api?tz=Africa/Lagos
```

Get the API response for a specific date (e.g., 2024-11-18) in the UTC timezone:

```url
https://makeideploy.today/api?date=2024-11-18
```

Get the API response for a specific date (e.g., 2024-11-18) in a specific timezone (e.g., America/Chicago):

```url
https://makeideploy.today/api?tz=America/Chicago&date=2024-11-18
```

## API Response

The API go give you JSON object wey get these keys:

* `timezone`: Timezone wey you give for the request.
* `date`: Date wey you provide for ISO format (YYYY-MM-DDTHH:mm:ss.sssZ).
* `makeideploy`: Boolean value wey go show if you suppose deploy today.
* `message`: String/Message wey explain why you go or no go deploy.

Example response:

```json
{
  "timezone": "UTC",
  "date": "2024-11-18T00:00:00.000Z",
  "makeideploy": false,
  "message": "Today na Monday, you suppose don deploy!"
}
```

## Credits

Favicon created by **emilegraphics** from the NOUN Project at [favicon-credit]

## License

Abeg check am for [license-link] || WTFPL - You fit do anytin wey you want with dis code!

* [site]: https://makeideploy.today
* [fossa-badge]: We go put am
* [fossa-url]: https://app.fossa.io/projects/#
* [reasons.ts]: https://github.com/IamPrime/makeideploy/blob/master/helpers/reasons.ts
* [api-endpoint]: https://makeideploy.today/api
* [favicon-credit]: https://thenounproject.com/search/?q=dot&i=1359410
* [license-link]: https://github.com/IamPrime/makeideploy/blob/master/LICENSE
<!-- End of README.md -->