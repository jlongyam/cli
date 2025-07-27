import { describe, it, expect } from 'vitest';

describe('args', () => {
  it('test_returns_empty_object_no_arguments', async () => {
    const { default: Parse } = await import('args-parser');
    // Simulate no extra command-line arguments (only node and script path)
    const fakeArgv = ['/usr/local/bin/node', '/path/to/script.js'];
    const args = Parse(fakeArgv);
    expect(args).toEqual({});
  });

  it('test_parses_standard_arguments', async () => {
    const { default: Parse } = await import('args-parser');
    // Simulate command-line arguments: --foo=bar --baz=42
    const fakeArgv = [
      '/usr/local/bin/node',
      '/path/to/script.js',
      '--foo=bar',
      '--baz=42'
    ];
    const args = Parse(fakeArgv);
    expect(args).toEqual({ foo: 'bar', baz: 42 });
  });
});
