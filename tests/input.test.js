import { describe, it, expect, vi } from 'vitest';
import { input } from '../src/input.js';

// Mock Enquirer
vi.mock('enquirer', () => ({
  default: vi.fn().mockImplementation(() => ({
    prompt: vi.fn().mockImplementation((questions) => {
      const response = {};
      questions.forEach(q => {
        response[q.name] = `Test ${q.name}`;
      });
      return Promise.resolve(response);
    })
  }))
}));

describe('input.ask', () => {
  // == [1] == //
  it('test_ask_prompts_single_question_and_logs_response', async () => {
    // Arrange
    const options = [
      { key: 'name', question: 'What is your other name?' }
    ];

    // Spy on console.log to capture output
    const logSpy = vi.spyOn(console, 'log').mockImplementation(() => {});

    // Act
    await input.ask(options);

    // Assert
    expect(logSpy).toHaveBeenCalledTimes(1);
    expect(logSpy).toHaveBeenCalledWith({ name: 'Test name' });

    logSpy.mockRestore();
  });
  //== [2] ==//
  it('test_ask_prompts_multiple_questions_and_logs_responses', async () => {
    // Arrange
    const options = [
      { key: 'firstName', question: 'What is your first name?' },
      { key: 'lastName', question: 'What is your last name?' }
    ];

    // Spy on console.log to capture output
    const logSpy = vi.spyOn(console, 'log').mockImplementation(() => {});

    // Act
    await input.ask(options);

    // Assert
    expect(logSpy).toHaveBeenCalledTimes(1);
    expect(logSpy).toHaveBeenCalledWith({ 
      firstName: 'Test firstName', 
      lastName: 'Test lastName' 
    });

    logSpy.mockRestore();
  });
});
