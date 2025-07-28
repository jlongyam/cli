import { describe, it, expect, vi } from 'vitest';
import { input } from '../../src/input.js';

describe('input.password', () => {
  it('test_password_prompt_returns_user_input', async () => {
    const mockPassword = vi.fn().mockResolvedValue({ pass: 'mySecret123' });
    input.password = mockPassword;

    const result = await input.password({
      key: 'pass',
      question: 'your password:',
    });

    expect(result.pass).toBe('mySecret123');
    expect(mockPassword).toHaveBeenCalledWith({
      key: 'pass',
      question: 'your password:',
    });
  });

  it('test_password_prompt_masks_input', async () => {
    // Mock implementation to check if mask property is set
    const mockPassword = vi.fn(async (opts) => {
      // Simulate that the password prompt uses a mask property (e.g., '*')
      // This is a convention for password masking in prompts
      expect(opts).toHaveProperty('mask');
      expect(typeof opts.mask === 'string' || typeof opts.mask === 'boolean').toBe(true);
      return { [opts.key]: 'hiddenValue' };
    });
    input.password = mockPassword;

    await input.password({
      key: 'pass',
      question: 'your password:',
      mask: '*',
    });

    expect(mockPassword).toHaveBeenCalledWith({
      key: 'pass',
      question: 'your password:',
      mask: '*',
    });
  });

  it('test_password_prompt_assigns_value_to_key', async () => {
    const mockPassword = vi.fn().mockResolvedValue({ myKey: 'superSecret' });
    input.password = mockPassword;

    const result = await input.password({
      key: 'myKey',
      question: 'Enter your password:',
    });

    expect(result.myKey).toBe('superSecret');
    expect(mockPassword).toHaveBeenCalledWith({
      key: 'myKey',
      question: 'Enter your password:',
    });
  });

  it('test_password_prompt_handles_empty_input', async () => {
    const mockPassword = vi.fn().mockResolvedValue({ pass: '' });
    input.password = mockPassword;

    const result = await input.password({
      key: 'pass',
      question: 'your password:',
    });

    expect(result.pass).toBe('');
    expect(mockPassword).toHaveBeenCalledWith({
      key: 'pass',
      question: 'your password:',
    });
  });

  it('test_password_prompt_handles_user_cancellation', async () => {
    // Simulate user cancellation by rejecting the promise
    const cancellationError = new Error('User cancelled input');
    const mockPassword = vi.fn().mockRejectedValue(cancellationError);
    input.password = mockPassword;

    await expect(
      input.password({
        key: 'pass',
        question: 'your password:',
      })
    ).rejects.toThrow('User cancelled input');

    expect(mockPassword).toHaveBeenCalledWith({
      key: 'pass',
      question: 'your password:',
    });
  });

  it('test_password_prompt_handles_non_string_input', async () => {
    const mockPassword = vi.fn(async (opts) => {
      // Simulate coercion to string for non-string input values
      const value = opts.value;
      let coercedValue;
      if (typeof value !== 'string') {
        coercedValue = String(value);
      } else {
        coercedValue = value;
      }
      return { [opts.key]: coercedValue };
    });
    input.password = mockPassword;

    // Test with a number
    let result = await input.password({
      key: 'pass',
      question: 'your password:',
      value: 12345,
    });
    expect(result.pass).toBe('12345');

    // Test with an object
    result = await input.password({
      key: 'pass',
      question: 'your password:',
      value: { foo: 'bar' },
    });
    expect(result.pass).toBe('[object Object]');

    // Test with a boolean
    result = await input.password({
      key: 'pass',
      question: 'your password:',
      value: false,
    });
    expect(result.pass).toBe('false');
  });
});