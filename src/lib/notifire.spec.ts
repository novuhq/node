import test from 'ava';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import { Notifire } from './notifire';

test('should create a valid request with API Keys', async (t) => {
  const mock = new MockAdapter(axios);
  const adapter = mock.onPost(/\.*\/events\/trigger/).reply(200, {
    success: true
  })

  const notifire = new Notifire('TEST_KEY');

  await notifire.trigger('test-event', {
    $user_id: 'Test'
  });

  t.assert(adapter.history.post[0].headers.Authorization, 'ApiKey TEST_KEY');
});

test('should pass the trigger contents successfully', async (t) => {
  const mock = new MockAdapter(axios);
  const adapter = mock.onPost(/\.*\/events\/trigger/).reply(200, {
    success: true
  });

  const notifire = new Notifire('TEST_KEY');

  await notifire.trigger('test-event', {
    $user_id: '123',
    name: 'Test'
  });

  const body = JSON.parse(adapter.history.post[0].data);

  t.is(body.name, 'test-event');
  t.is(body.payload.$user_id, '123');
  t.is(body.payload.name, 'Test');
});

test('should throw if no API key provided', async (t) => {
  const error = t.throws(() => {
    // @ts-ignore
    new Notifire();
  }, { instanceOf: Error });

  t.is(error.message, 'API_KEY must be provided during initialization');
});


test('should throw if no event name found', async (t) => {
  const error = await t.throwsAsync(async () => {
    const notifire = new Notifire('TEST_KEY');
    // @ts-ignore
    return await notifire.trigger();
  }, { instanceOf: Error });

  t.is(error.message, 'eventName must be specified');
});
