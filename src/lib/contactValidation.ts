export type ContactFormInput = {
  name: string;
  email: string;
  companyName: string;
  message: string;
  turnstileToken: string;
};

export type ContactFormErrors = Partial<Record<keyof ContactFormInput, string>>;

export const emptyContactFormInput: ContactFormInput = {
  name: "",
  email: "",
  companyName: "",
  message: "",
  turnstileToken: "",
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function normalizeString(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

export function normalizeContactFormInput(input: Partial<ContactFormInput> | Record<string, unknown>): ContactFormInput {
  return {
    name: normalizeString(input.name),
    email: normalizeString(input.email),
    companyName: normalizeString(input.companyName),
    message: normalizeString(input.message),
    turnstileToken: normalizeString(input.turnstileToken),
  } satisfies ContactFormInput;
}

export function validateContactFormInput(
  input: Partial<ContactFormInput> | Record<string, unknown>,
  options?: {
    requireTurnstileToken?: boolean;
  },
) {
  const normalized = normalizeContactFormInput(input);
  const errors: ContactFormErrors = {};

  if (normalized.name.length < 2) {
    errors.name = "Please enter your name.";
  } else if (normalized.name.length > 100) {
    errors.name = "Please keep your name under 100 characters.";
  }

  if (!emailPattern.test(normalized.email)) {
    errors.email = "Please enter a valid email address.";
  }

  if (normalized.companyName.length < 2) {
    errors.companyName = "Please enter your company name.";
  } else if (normalized.companyName.length > 120) {
    errors.companyName = "Please keep the company name under 120 characters.";
  }

  if (normalized.message.length < 20) {
    errors.message = "Please share at least a short description of what you need.";
  } else if (normalized.message.length > 4000) {
    errors.message = "Please keep the message under 4000 characters.";
  }

  if (options?.requireTurnstileToken && normalized.turnstileToken.length === 0) {
    errors.turnstileToken = "Please complete the human verification challenge.";
  }

  return {
    data: normalized,
    errors,
    isValid: Object.keys(errors).length === 0,
  };
}
