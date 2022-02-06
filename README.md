# verona-player-speedtest

The Speedtest-pLayer is a (micro-) [Verona-player](https://github.com/verona-interfaces/player) for reading speed tests.
It's units are just strings - mostly simple sentences. The player shows the sentence and two buttons, 
"Richtig" and "Falsch". Clicking the button submits data (`A` or `B`) and provokes the host to proceed to the 
next item. The response-data is given in the [IQB-standard-format](https://github.com/iqb-berlin/verona-data-specifications/blob/main/responses/manual_iqb-standard.md). 

It is developed in behalf of the Institut für Bildungsanalysen Baden-Württemberg (IBBW).

# usage
Load the file `verona-player-speedtest-1.0.0.html` into a Verona-host-application,
like [IQB-Testcenter](https://github.com/iqb-berlin/testcenter-setup) or
[IQB-Teststudio-Lite](https://github.com/iqb-berlin/teststudio-lite-setup).

# creating units
A unit is a simple text string and can be created with any program. When it should be created in the 
[IQB-Teststudio-Lite](https://github.com/iqb-berlin/teststudio-lite-setup),
use the [verona-plaintext-editor](https://github.com/iqb-berlin/verona-editor-plaintext).

## developer information
There is no build process and no dependencies expect for testing.
Testing can be done with
`
npm install
npm run test
`
