The Speedtest-Player is a [Verona-player](https://github.com/verona-interfaces/player) for reading speed tests.
It's units are just strings - mostly simple sentences. The player shows the sentence and two buttons. Clicking one button submits response data (value `A` or value `B`) and requests the host to navigate to the 
next unit/page. The response-data is given in the [IQB-Standard-Format](https://github.com/iqb-berlin/verona-data-specifications/blob/main/responses/manual_iqb-standard.md). 

It is developed in behalf of the Institut für Bildungsanalysen Baden-Württemberg (IBBW).

Starting in nov 2022, the IQB - Institute for Educational Quality Improvement maintains this player.

# Usage
Every release contains of a html file. In order to use it, you need to upload it into the web application acting as the host of the player. For example, to use it in assessments you put it into the workspace of a [IQB-Testcenter](https://github.com/iqb-berlin/testcenter).

# Unit data
Because the unit definition is only a short text or sentence, you do not need a sophisticated editor to specify the unit for the player. Depending on your workflow it might be sufficient to use a text file editor. In the context of a [IQB-Studio](https://github.com/iqb-berlin/studio-lite), you can use the [IQB Verona Editor Plain Text](https://github.com/iqb-berlin/verona-editor-plaintext).

You can set some parameters to adapt layout and/or behavior. See [here](docs/parameters.md) for details.

We provide a [unit generator](https://iqb-berlin.github.io/verona-player-speedtest/): Put in one sentence per line and get unit xml files for the IQB-Testcenter. 

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