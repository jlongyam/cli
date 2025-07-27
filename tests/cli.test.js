import { describe, it, expect } from 'vitest';
import { args, input } from '../src/cli.js';

describe('cli module exports', () => {
  it('should_export_args_and_input_as_named_exports', () => {
    expect(args).toBeDefined();
    expect(input).toBeDefined();
    expect(typeof args).toBe('object');
    expect(typeof input).toBe('object');
  });

  it('should_expose_ask_method_on_input_object', () => {
    expect(input).toBeDefined();
    expect(typeof input).toBe('object');
    expect(input.ask).toBeDefined();
    expect(typeof input.ask).toBe('function');
  });
});