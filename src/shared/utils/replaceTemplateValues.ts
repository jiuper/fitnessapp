export const replaceTemplateValues = (template: string, values: Record<string, unknown>) =>
    Object.entries(values).reduce<string>((acc, [key, value]) => acc.replaceAll(`{{${key}}}`, String(value)), template);
