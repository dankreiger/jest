/**
 * Copyright (c) 2014-present, Facebook, Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */
'use strict';
import runJest from '../runJest';
import path from 'path';

const {cleanup, writeFiles} = require('../Utils');
const DIR = path.resolve('../promise-reject');

beforeEach(() => cleanup(DIR));
afterEach(() => cleanup(DIR));

test('', () => {
  writeFiles(DIR, {
    'package.json': '{}',
    'promise_reject.test.js': `
     test('test', () => {
       return Promise.reject(null)
     });
   `,
  });
  const {stdout, stderr, status} = runJest(DIR);
  expect(stdout).toBe('');
  expect(stderr).toMatch(/(Failed|thrown): null/);
  expect(status).toBe(1);
});
