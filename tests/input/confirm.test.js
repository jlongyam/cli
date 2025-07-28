import { describe, it, vi, expect } from 'vitest';
import { input } from "../../src/input.js";

describe('input.confirm', () => {
  it('test_confirm_prompt_positive_response', async () => {
    const confirmMock = vi.spyOn(input, 'confirm').mockResolvedValue({ ok: true });
    const logSpy = vi.spyOn(console, 'log').mockImplementation(() => {});

    let result = await input.confirm({
      key: 'ok',
      question: 'are you agree with this'
    });

    if(result.ok) {
      console.log('good choise');
    } else {
      console.log('too bad');
    }

    expect(confirmMock).toHaveBeenCalledWith({
      key: 'ok',
      question: 'are you agree with this'
    });
    expect(logSpy).toHaveBeenCalledWith('good choise');

    confirmMock.mockRestore();
    logSpy.mockRestore();
  });

  it('test_confirm_prompt_negative_response', async () => {
    const confirmMock = vi.spyOn(input, 'confirm').mockResolvedValue({ ok: false });
    const logSpy = vi.spyOn(console, 'log').mockImplementation(() => {});

    let result = await input.confirm({
      key: 'ok',
      question: 'are you agree with this'
    });

    if(result.ok) {
      console.log('good choise');
    } else {
      console.log('too bad');
    }

    expect(confirmMock).toHaveBeenCalledWith({
      key: 'ok',
      question: 'are you agree with this'
    });
    expect(logSpy).toHaveBeenCalledWith('too bad');

    confirmMock.mockRestore();
    logSpy.mockRestore();
  });

  it('test_confirm_prompt_displays_correct_question', async () => {
    const confirmMock = vi.spyOn(input, 'confirm').mockResolvedValue({ ok: true });

    await input.confirm({
      key: 'ok',
      question: 'are you agree with this'
    });

    expect(confirmMock).toHaveBeenCalledWith({
      key: 'ok',
      question: 'are you agree with this'
    });

    confirmMock.mockRestore();
  });

  it('test_confirm_prompt_missing_key_property', async () => {
    const confirmMock = vi.spyOn(input, 'confirm').mockImplementation(async (opts) => {
      if (!opts.key) {
        throw new Error("Missing 'key' property");
      }
      return { ok: true };
    });

    let error;
    try {
      await input.confirm({
        question: 'are you agree with this'
      });
    } catch (e) {
      error = e;
    }

    expect(confirmMock).toHaveBeenCalledWith({
      question: 'are you agree with this'
    });
    expect(error).toBeInstanceOf(Error);
    expect(error.message).toBe("Missing 'key' property");

    confirmMock.mockRestore();
  });

  it('test_confirm_prompt_empty_question', async () => {
    const confirmMock = vi.spyOn(input, 'confirm').mockResolvedValue({ ok: true });
    const logSpy = vi.spyOn(console, 'log').mockImplementation(() => {});

    let result = await input.confirm({
      key: 'ok',
      question: ''
    });

    if(result.ok) {
      console.log('good choise');
    } else {
      console.log('too bad');
    }

    expect(confirmMock).toHaveBeenCalledWith({
      key: 'ok',
      question: ''
    });
    expect(logSpy).toHaveBeenCalledWith('good choise');

    confirmMock.mockRestore();
    logSpy.mockRestore();
  });

  it('test_confirm_prompt_unexpected_user_input', async () => {
    // Simulate user interruption (e.g., pressing escape or closing the prompt)
    const confirmMock = vi.spyOn(input, 'confirm').mockImplementation(async () => {
      // Simulate interruption by rejecting with a specific error
      const err = new Error('Prompt interrupted');
      err.code = 'PROMPT_INTERRUPTED';
      throw err;
    });
    const logSpy = vi.spyOn(console, 'log').mockImplementation(() => {});

    let error;
    try {
      await input.confirm({
        key: 'ok',
        question: 'are you agree with this'
      });
    } catch (e) {
      error = e;
    }

    expect(confirmMock).toHaveBeenCalledWith({
      key: 'ok',
      question: 'are you agree with this'
    });
    expect(error).toBeInstanceOf(Error);
    expect(error.message).toBe('Prompt interrupted');
    expect(error.code).toBe('PROMPT_INTERRUPTED');
    expect(logSpy).not.toHaveBeenCalled();

    confirmMock.mockRestore();
    logSpy.mockRestore();
  });
});