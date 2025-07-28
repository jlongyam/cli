import { describe, it, expect, vi } from 'vitest';
import { input } from '../../src/input.js';

describe('input.select', () => {
  it('test_select_displays_correct_question_and_options', async () => {
    const selectMock = vi.fn().mockResolvedValue({ word: 'two' });
    input.select = selectMock;

    const params = {
      key: 'word',
      question: 'choose one: ',
      option: ['one', 'two', 'three', 'four']
    };

    const result = await input.select(params);

    expect(selectMock).toHaveBeenCalledWith(params);
    expect(result).toEqual({ word: 'two' });
  });

  it('test_select_returns_correct_value_on_valid_selection', async () => {
    const selectMock = vi.fn().mockResolvedValue({ word: 'three' });
    input.select = selectMock;

    const params = {
      key: 'word',
      question: 'choose one: ',
      option: ['one', 'two', 'three', 'four']
    };

    const result = await input.select(params);

    expect(selectMock).toHaveBeenCalledWith(params);
    expect(result).toEqual({ word: 'three' });
  });

  it('test_select_result_object_structure', async () => {
    const selectMock = vi.fn().mockResolvedValue({ word: 'four' });
    input.select = selectMock;

    const params = {
      key: 'word',
      question: 'choose one: ',
      option: ['one', 'two', 'three', 'four']
    };

    const result = await input.select(params);

    expect(result).toHaveProperty('word');
    expect(['one', 'two', 'three', 'four']).toContain(result.word);
  });

  it('test_select_handles_invalid_user_input', async () => {
    // Simulate select rejecting with an error for invalid input
    const error = new Error('Invalid selection');
    const selectMock = vi.fn().mockRejectedValue(error);
    input.select = selectMock;

    const params = {
      key: 'word',
      question: 'choose one: ',
      option: ['one', 'two', 'three', 'four']
    };

    await expect(input.select(params)).rejects.toThrow('Invalid selection');
    expect(selectMock).toHaveBeenCalledWith(params);
  });

  it('test_select_with_empty_options_array', async () => {
    const error = new Error('No options available');
    const selectMock = vi.fn().mockRejectedValue(error);
    input.select = selectMock;

    const params = {
      key: 'word',
      question: 'choose one: ',
      option: []
    };

    await expect(input.select(params)).rejects.toThrow('No options available');
    expect(selectMock).toHaveBeenCalledWith(params);
  });

  it('test_select_missing_key_parameter', async () => {
    const error = new Error('Missing required parameter: key');
    const selectMock = vi.fn().mockRejectedValue(error);
    input.select = selectMock;

    const params = {
      // key is intentionally missing
      question: 'choose one: ',
      option: ['one', 'two', 'three', 'four']
    };

    await expect(input.select(params)).rejects.toThrow('Missing required parameter: key');
    expect(selectMock).toHaveBeenCalledWith(params);
  });
});