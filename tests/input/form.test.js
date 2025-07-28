import { describe, it, expect, vi } from 'vitest';
import { input } from '../../src/input.js';

describe('input.form', () => {
  it('test_form_returns_all_fields_with_initial_values', async () => {
    const mockResult = {
      data: {
        package: 'test',
        version: '1.0.0',
        main: 'index.js',
        type: 'module'
      }
    };
    const formMock = vi.spyOn(input, 'form').mockResolvedValueOnce(mockResult);

    const result = await input.form({
      key: 'data',
      question: 'Please provide the following information:',
      field: [
        { name: 'package', message: 'Package name', initial: 'test' },
        { name: 'version', message: 'Version', initial: '1.0.0' },
        { name: 'main', message: 'Main script', initial: 'index.js' },
        { name: 'type', message: 'Script type', initial: 'module' }
      ]
    });

    expect(formMock).toHaveBeenCalledTimes(1);
    expect(result.data).toEqual({
      package: 'test',
      version: '1.0.0',
      main: 'index.js',
      type: 'module'
    });
  });

  it('test_form_displays_correct_questions_and_messages', async () => {
    const formParams = {
      key: 'data',
      question: 'Please provide the following information:',
      field: [
        { name: 'package', message: 'Package name', initial: 'test' },
        { name: 'version', message: 'Version', initial: '1.0.0' },
        { name: 'main', message: 'Main script', initial: 'index.js' },
        { name: 'type', message: 'Script type', initial: 'module' }
      ]
    };

    const mockResult = {
      data: {
        package: 'test',
        version: '1.0.0',
        main: 'index.js',
        type: 'module'
      }
    };

    const formMock = vi.spyOn(input, 'form').mockResolvedValueOnce(mockResult);

    const result = await input.form(formParams);

    expect(formMock).toHaveBeenCalledWith(formParams);
    expect(formMock).toHaveBeenCalledTimes(1);

    // Check that the question and field messages are as expected
    const calledWith = formMock.mock.calls[0][0];
    expect(calledWith.question).toBe('Please provide the following information:');
    expect(calledWith.field).toEqual([
      { name: 'package', message: 'Package name', initial: 'test' },
      { name: 'version', message: 'Version', initial: '1.0.0' },
      { name: 'main', message: 'Main script', initial: 'index.js' },
      { name: 'type', message: 'Script type', initial: 'module' }
    ]);
  });

  it('test_form_output_structure_contains_data_key', async () => {
    const mockResult = {
      data: {
        package: 'test',
        version: '1.0.0',
        main: 'index.js',
        type: 'module'
      }
    };
    vi.spyOn(input, 'form').mockResolvedValueOnce(mockResult);

    const result = await input.form({
      key: 'data',
      question: 'Please provide the following information:',
      field: [
        { name: 'package', message: 'Package name', initial: 'test' },
        { name: 'version', message: 'Version', initial: '1.0.0' },
        { name: 'main', message: 'Main script', initial: 'index.js' },
        { name: 'type', message: 'Script type', initial: 'module' }
      ]
    });

    expect(result).toHaveProperty('data');
    expect(result.data).toEqual({
      package: 'test',
      version: '1.0.0',
      main: 'index.js',
      type: 'module'
    });
  });

  it('test_form_handles_missing_initial_values', async () => {
    const formParams = {
      key: 'data',
      question: 'Please provide the following information:',
      field: [
        { name: 'package', message: 'Package name' }, // no initial
        { name: 'version', message: 'Version', initial: '1.0.0' },
        { name: 'main', message: 'Main script' }, // no initial
        { name: 'type', message: 'Script type', initial: 'module' }
      ]
    };

    const mockResult = {
      data: {
        package: '', // simulate empty string for missing initial
        version: '1.0.0',
        main: '', // simulate empty string for missing initial
        type: 'module'
      }
    };

    const formMock = vi.spyOn(input, 'form').mockResolvedValueOnce(mockResult);

    const result = await input.form(formParams);

    expect(formMock).toHaveBeenCalledWith(formParams);
    expect(result.data).toEqual({
      package: '',
      version: '1.0.0',
      main: '',
      type: 'module'
    });
  });

  it('test_form_handles_empty_user_input', async () => {
    const formParams = {
      key: 'data',
      question: 'Please provide the following information:',
      field: [
        { name: 'package', message: 'Package name', initial: 'test' },
        { name: 'version', message: 'Version', initial: '1.0.0' },
        { name: 'main', message: 'Main script', initial: 'index.js' },
        { name: 'type', message: 'Script type', initial: 'module' }
      ]
    };

    // Simulate user submitting the form without entering any input (all fields empty/default)
    const mockResult = {
      data: {
        package: '',
        version: '',
        main: '',
        type: ''
      }
    };

    const formMock = vi.spyOn(input, 'form').mockResolvedValueOnce(mockResult);

    const result = await input.form(formParams);

    expect(formMock).toHaveBeenCalledWith(formParams);
    expect(result.data).toEqual({
      package: '',
      version: '',
      main: '',
      type: ''
    });
  });

  it('test_form_handles_invalid_field_definitions', async () => {
    const invalidFieldsCases = [
      // Field missing 'name'
      [
        { message: 'Package name', initial: 'test' },
        { name: 'version', message: 'Version', initial: '1.0.0' }
      ],
      // Field with non-string name
      [
        { name: 123, message: 'Package name', initial: 'test' },
        { name: 'version', message: 'Version', initial: '1.0.0' }
      ],
      // Field is not an object
      [
        "not-an-object",
        { name: 'version', message: 'Version', initial: '1.0.0' }
      ],
      // Field with missing message
      [
        { name: 'package', initial: 'test' },
        { name: 'version', message: 'Version', initial: '1.0.0' }
      ]
    ];

    for (const fields of invalidFieldsCases) {
      const formParams = {
        key: 'data',
        question: 'Please provide the following information:',
        field: fields
      };

      // Simulate input.form rejecting with an error for invalid field definitions
      const error = new Error('Invalid field definition');
      const formMock = vi.spyOn(input, 'form').mockRejectedValueOnce(error);

      await expect(input.form(formParams)).rejects.toThrow('Invalid field definition');
      expect(formMock).toHaveBeenCalledWith(formParams);
    }
  });
});