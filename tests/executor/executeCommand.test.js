import { vi, describe, expect, test } from "vitest";
import { executeCommandSimple, executeCommandCrossEnv } from "./executeCommand.js";
import os from 'os';

describe('executeCommand', ()=> {
  const fn = vi.fn();
  test('test: executeCommandSimple - without argument', ()=> {
    fn.mockReturnValue(executeCommandSimple());
    fn();
    fn.mockReturnValue('Hello');
    fn();
  }),
  test('test: executeCommandSimple - with argument', ()=> {
    fn.mockReturnValue(executeCommandSimple('echo "kk"'));
    fn();
    fn.mockReturnValue('Hi');
    fn()
  }),
  test('test: executeCommandCrossEnv', async ()=> {
    if (os.platform() === 'win32') {
      fn.mockReturnValue(executeCommandCrossEnv('echo "win"'));
      fn();
      fn.mockReturnValue('win');
      fn();
    } else {
      //fn.mockReturnValue(executeCommandCrossEnv('echo "unix"'));
      //fn();
      
      //fn.mockReturnValue('unaaix');
      //fn();
    }
  })
})
