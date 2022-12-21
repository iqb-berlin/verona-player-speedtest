The Speedtest-Player is a [Verona-player](https://github.com/verona-interfaces/player) for running speed tests. It's units are just strings - mostly simple sentences. The player shows the sentence and two buttons. Clicking one button submits response data (value `A` or value `B`) and requests the host to navigate to the next unit/page. The response-data is given in the [IQB-Standard-Format](https://github.com/iqb-berlin/verona-data-specifications/blob/main/responses/manual_iqb-standard.md). 

It is developed in behalf of the Institut für Bildungsanalysen Baden-Württemberg (IBBW). Starting in nov 2022, the IQB - Institute for Educational Quality Improvement maintains this player.

# Usage

## Player

Verona Players are html files to be loaded into an application supporting the Verona Specification for players. Go to the releases section of this repository and download the file.

## Unit Data

Every unit is represented by at least one line of text. Depending on the application to run the player, there are different ways to provide these unit data (for example as plain text file or embedded in a spefific xml file). Technically, the application hosting the player will send the unit data to the player and store the answer.

You can define multiple lines of text. After every line, the player will insert a line break.

If a line follows a certain pattern, the line will be interpreted as parameter to modify design and/or behavior of the player. See [here](docs/parameters.md) to learn more about the parameters.

We provide a [unit generator](https://iqb-berlin.github.io/verona-player-speedtest/): Put in one sentence per line and get unit xml files for the IQB-Testcenter.

## Response Data

The selected button will appear by its value: `A`, `B` or `C`. In addition, you'll get a second variable bearing the time in milliseconds from unit start to selection. If the testtaker is allowed to return later to the unit and change the answer (see [parameters](docs/parameters.md)), the time value will be `0` beginning with the second visit. 

# For developers
Changing the player means editing the html file with embedded styles and javascript. So there is no build needed and therefor there are no dependencies.

But we added some tests. In order to run these tests, we provide a node based environment: A package.json states dev dependencies, and after running npm install you can start the test scripts:

```
npm install
npm run test
```

After any change is made, please update the version of the player. There are a number of places:

* package.json
* player html: metadata
* docs/index.html default value of the form

Every release should carry the player html with the correct file name: `verona-player-speedtest-<version>.html`
