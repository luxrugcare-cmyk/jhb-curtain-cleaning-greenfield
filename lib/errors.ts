export class LeadValidationError extends Error { status = 400; }
export class LeadProcessingError extends Error { status = 503; }
