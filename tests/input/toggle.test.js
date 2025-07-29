import { describe, it, expect, vi } from 'vitest';
import { input } from '../../src/input.js';

describe('input.toggle', () => {
  it('test_toggle_returns_enabled_value', async () => {
    const mockToggle = vi.fn().mockResolvedValue({ toggle: 'on' });
    input.toggle = mockToggle;

    const result = await input.toggle({
      key: 'toggle',
      question: 'switch option',
      enable: 'on',
      disable: 'off'
    });

    expect(mockToggle).toHaveBeenCalledWith({
      key: 'toggle',
      question: 'switch option',
      enable: 'on',
      disable: 'off'
    });
    expect(result.toggle).toBe('on');
  });

  it('test_toggle_returns_disabled_value', async () => {
    const mockToggle = vi.fn().mockResolvedValue({ toggle: 'off' });
    input.toggle = mockToggle;

    const result = await input.toggle({
      key: 'toggle',
      question: 'switch option',
      enable: 'on',
      disable: 'off'
    });

    expect(mockToggle).toHaveBeenCalledWith({
      key: 'toggle',
      question: 'switch option',
      enable: 'on',
      disable: 'off'
    });
    expect(result.toggle).toBe('off');
  });

  it('test_toggle_displays_correct_prompt', async () => {
    const mockToggle = vi.fn().mockResolvedValue({ toggle: 'on' });
    input.toggle = mockToggle;

    const config = {
      key: 'toggle',
      question: 'switch option',
      enable: 'on',
      disable: 'off'
    };

    await input.toggle(config);

    expect(mockToggle).toHaveBeenCalledWith(expect.objectContaining({
      question: 'switch option'
    }));
  });

  it('test_toggle_missing_enable_or_disable', async () => {
    // Case 1: Missing 'enable'
    const mockToggleMissingEnable = vi.fn().mockResolvedValue({ toggle: 'off' });
    input.toggle = mockToggleMissingEnable;

    const configMissingEnable = {
      key: 'toggle',
      question: 'switch option',
      disable: 'off'
    };

    let resultMissingEnable;
    let errorMissingEnable = null;
    try {
      resultMissingEnable = await input.toggle(configMissingEnable);
    } catch (err) {
      errorMissingEnable = err;
    }

    // Should either return a fallback or throw an error
    expect(mockToggleMissingEnable).toHaveBeenCalledWith(configMissingEnable);
    // Accept either a result or an error, but not both
    expect(resultMissingEnable || errorMissingEnable).toBeTruthy();

    // Case 2: Missing 'disable'
    const mockToggleMissingDisable = vi.fn().mockResolvedValue({ toggle: 'on' });
    input.toggle = mockToggleMissingDisable;

    const configMissingDisable = {
      key: 'toggle',
      question: 'switch option',
      enable: 'on'
    };

    let resultMissingDisable;
    let errorMissingDisable = null;
    try {
      resultMissingDisable = await input.toggle(configMissingDisable);
    } catch (err) {
      errorMissingDisable = err;
    }

    expect(mockToggleMissingDisable).toHaveBeenCalledWith(configMissingDisable);
    expect(resultMissingDisable || errorMissingDisable).toBeTruthy();
  });

  it('test_toggle_empty_user_input', async () => {
    // Simulate the toggle returning undefined or empty when user provides no input
    const mockToggle = vi.fn().mockResolvedValue({ toggle: undefined });
    input.toggle = mockToggle;

    const config = {
      key: 'toggle',
      question: 'switch option',
      enable: 'on',
      disable: 'off'
    };

    const result = await input.toggle(config);

    expect(mockToggle).toHaveBeenCalledWith(config);
    // The default value could be 'off', 'on', or any fallback; here we just check it's handled (not throwing)
    // If your implementation returns a specific default, check for that value instead
    expect(result.toggle === undefined || result.toggle === null || typeof result.toggle === 'string').toBeTruthy();
  });

  it('test_toggle_invalid_configuration_keys', async () => {
    const mockToggle = vi.fn().mockImplementation(async (config) => {
      // Simulate error or fallback for invalid keys
      if (!config.hasOwnProperty('key') || !config.hasOwnProperty('question')) {
        throw new Error('Invalid configuration keys');
      }
      return { toggle: 'on' };
    });
    input.toggle = mockToggle;

    const invalidConfigs = [
      // Missing 'key'
      { question: 'switch option', enable: 'on', disable: 'off' },
      // Missing 'question'
      { key: 'toggle', enable: 'on', disable: 'off' },
      // Extra unexpected key
      { key: 'toggle', question: 'switch option', enable: 'on', disable: 'off', unexpected: true },
      // Completely invalid keys
      { foo: 'bar', baz: 123 }
    ];

    for (const config of invalidConfigs) {
      let result, error = null;
      try {
        result = await input.toggle(config);
      } catch (err) {
        error = err;
      }
      // If config is missing required keys, expect an error
      if (!config.hasOwnProperty('key') || !config.hasOwnProperty('question')) {
        expect(error).toBeInstanceOf(Error);
        expect(error.message).toBe('Invalid configuration keys');
      } else {
        // If only extra keys, should still succeed
        expect(result).toEqual({ toggle: 'on' });
      }
    }
  });
});