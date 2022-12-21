/* eslint-disable no-undef,no-console */ // TODO find a solution to import it, describe etc. in a way eslint can see
require('selenium-webdriver');
const jasmine = require('jasmine');
const { Options } = require('selenium-webdriver/firefox');
const { Builder, By } = require('selenium-webdriver');
const { MessageRecorder } = require('iqb-dev-components');
const testConfig = require('./config.json');

jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
MessageRecorder.defaultWaitingTime = 500;

let driver;

const options = new Options();
if (testConfig.headless) {
  options.addArguments('-headless');
}

const playerPath = `${__dirname}/../verona-player-speedtest.html`;

const send = async message => {
  await driver.executeScript(`window.postMessage(${JSON.stringify(message)}, '*');`);
};

const loadPlayer = async playerSettings => {
  const query = playerSettings
    ? Object.keys(playerSettings).reduce((carry, item) => `${carry}&${item}=${playerSettings[item]}`, '?')
    : '';

  await driver.get(`file:${playerPath}${query}`);
};

describe('speedtest player', () => {
  beforeAll(async () => {
    try {
      driver = await new Builder()
        .forBrowser('firefox')
        .setFirefoxOptions(options)
        .build();
    } catch (e) {
      console.error(e);
    }
  });

  beforeEach(async () => {
    await loadPlayer();
  });

  afterAll(async () => {
    if (!testConfig.keepOpen) {
      await driver.quit();
    }
  });

  it('should load an unit on `vopStartCommand`', async () => {
    await send({
      type: 'vopStartCommand',
      unitDefinition: 'Dies ist ein Beispielsatz!',
      sessionId: '1'
    });

    const text = await driver.findElement(By.css('#text'));

    expect(await text.getText()).toBe('Dies ist ein Beispielsatz!');
  });

  it('reload previous value', async () => {
    await send({
      type: 'vopStartCommand',
      unitDefinition: 'Dies ist ein Beispielsatz!',
      sessionId: '1',
      unitState: {
        dataParts: {
          main: '[{"id":"speedtest","value":"A"}]'
        }
      }
    });

    const wrong = await driver.findElement(By.css('[value="A"]'));
    const right = await driver.findElement(By.css('[value="B"]'));

    expect(await wrong.isSelected()).toBeTruthy();
    expect(await right.isSelected()).toBeFalsy();
  });

  it('send state and navigation request on click', async () => {
    await send({
      type: 'vopStartCommand',
      unitDefinition: 'Dies ist ein Beispielsatz!',
      sessionId: '1',
      unitState: {
        dataParts: {
          main: '[{"id":"speedtest","value":"B"}]'
        }
      }
    });

    await MessageRecorder.recordMessages(driver);

    const wrong = await driver.findElement(By.css('label'));
    await wrong.click();

    const message1 = await MessageRecorder.getLastMessage(driver, 'vopStateChangedNotification');
    delete message1.timeStamp;
    let mainData = message1?.unitState?.dataParts?.main;
    expect(mainData).toBeDefined();
    const mainDataParsed = JSON.parse(mainData);
    const mainDataSpeedTime = mainDataParsed.find(varData => varData.id === 'speedtest_time');
    expect(mainDataSpeedTime).toBeDefined();
    mainDataSpeedTime.value = 0;
    message1.unitState.dataParts.main = JSON.stringify(mainDataParsed);
    expect(message1).toEqual({
      type: 'vopStateChangedNotification',
      sessionId: '1',
      unitState: {
        presentationProgress: 'complete',
        responseProgress: 'complete',
        unitStateDataType: 'iqb-standard@1.0',
        dataParts: {
          main: '[{"id":"speedtest","status":"VALUE_CHANGED","value":"A"},{"id":"speedtest_time","status":"VALUE_CHANGED","value":0}]'
        }
      }
    });

    const message2 = await MessageRecorder.getLastMessage(driver, 'vopUnitNavigationRequestedNotification');
    expect(message2).toEqual({
      type: 'vopUnitNavigationRequestedNotification',
      sessionId: '1',
      target: 'next'
    });
  });
});
