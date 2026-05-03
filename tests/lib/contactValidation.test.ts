import { describe, expect, it } from "vitest";

import { normalizeContactFormInput, validateContactFormInput } from "../../src/lib/contactValidation";

describe("contactValidation", () => {
  it("normalizes and validates a complete contact form submission", () => {
    const result = validateContactFormInput({
      name: "  Jane Doe  ",
      email: "  jane@example.com ",
      companyName: "  DevilDog Client  ",
      message: "  We need help planning a compliance and monitoring roadmap.  ",
      turnstileToken: "  verification-token  ",
    });

    expect(result.isValid).toBe(true);
    expect(result.errors).toEqual({});
    expect(result.data).toEqual({
      name: "Jane Doe",
      email: "jane@example.com",
      companyName: "DevilDog Client",
      message: "We need help planning a compliance and monitoring roadmap.",
      turnstileToken: "verification-token",
    });
  });

  it("returns field errors for incomplete submissions", () => {
    const result = validateContactFormInput({
      name: "A",
      email: "invalid-email",
      companyName: "",
      message: "Too short",
      turnstileToken: "",
    });

    expect(result.isValid).toBe(false);
    expect(result.errors).toEqual({
      name: "Please enter your name.",
      email: "Please enter a valid email address.",
      companyName: "Please enter your company name.",
      message: "Please share at least a short description of what you need.",
    });
  });

  it("normalizes unknown values to empty strings", () => {
    expect(
      normalizeContactFormInput({
        name: null,
        email: 42,
        companyName: undefined,
        message: {},
        turnstileToken: null,
      } as Record<string, unknown>),
    ).toEqual({
      name: "",
      email: "",
      companyName: "",
      message: "",
      turnstileToken: "",
    });
  });

  it("requires a Turnstile token when verification is mandatory", () => {
    const result = validateContactFormInput(
      {
        name: "Jane Doe",
        email: "jane@example.com",
        companyName: "DevilDog Client",
        message: "We need help planning a compliance and monitoring roadmap.",
        turnstileToken: "",
      },
      { requireTurnstileToken: true },
    );

    expect(result.isValid).toBe(false);
    expect(result.errors.turnstileToken).toBe("Please complete the human verification challenge.");
  });
});
