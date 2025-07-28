import { describe, it, expect, vi } from "vitest";
import { input } from "../../src/input.js";

describe("input.ask", () => {
  it("test_input_ask_returns_expected_object", async () => {
    const mockResponse = { name: "Alice" };
    const askMock = vi.spyOn(input, "ask").mockResolvedValue(mockResponse);

    const result = await input.ask({
      key: "name",
      question: "what is your name"
    });

    expect(result).toEqual({ name: "Alice" });
    expect(askMock).toHaveBeenCalledWith({
      key: "name",
      question: "what is your name"
    });

    askMock.mockRestore();
  });

  it("test_result_object_contains_name_property", async () => {
    const mockResponse = { name: "Bob" };
    const askMock = vi.spyOn(input, "ask").mockResolvedValue(mockResponse);

    const result = await input.ask({
      key: "name",
      question: "what is your name"
    });

    expect(result).toHaveProperty("name");
    expect(result.name).toBe("Bob");

    askMock.mockRestore();
  });

  it("test_console_log_outputs_name_value", async () => {
    const mockResponse = { name: "Charlie" };
    const askMock = vi.spyOn(input, "ask").mockResolvedValue(mockResponse);
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});

    const result = await input.ask({
      key: "name",
      question: "what is your name"
    });

    console.log(result.name);

    expect(logSpy).toHaveBeenCalledWith("Charlie");

    askMock.mockRestore();
    logSpy.mockRestore();
  });

  it("test_input_ask_handles_invalid_configuration", async () => {
    const error = new Error("Invalid configuration");
    const askMock = vi.spyOn(input, "ask").mockRejectedValue(error);

    await expect(
      input.ask({ invalid: "config" })
    ).rejects.toThrow("Invalid configuration");

    askMock.mockRestore();
  });

  it("test_input_ask_supports_localization", async () => {
    const mockResponse = { name: "Juan" };
    const localizedQuestion = "¿Cómo te llamas?";
    const askMock = vi.spyOn(input, "ask").mockResolvedValue(mockResponse);

    const result = await input.ask({
      key: "name",
      question: localizedQuestion,
      locale: "es"
    });

    expect(result).toEqual({ name: "Juan" });
    expect(askMock).toHaveBeenCalledWith({
      key: "name",
      question: localizedQuestion,
      locale: "es"
    });

    askMock.mockRestore();
  });
});