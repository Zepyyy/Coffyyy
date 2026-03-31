export type RequiredRuleMap<T extends Record<string, unknown>> = Partial<
	Record<keyof T, string>
>;

function hasValue(value: unknown) {
	if (Array.isArray(value)) return value.length > 0;
	if (typeof value === "string") return value.trim().length > 0;
	return value !== null && value !== undefined;
}

export function validateRequiredFields<T extends Record<string, unknown>>(
	values: T,
	rules: RequiredRuleMap<T>,
) {
	const errors: RequiredRuleMap<T> = {};

	for (const key of Object.keys(rules) as Array<keyof T>) {
		if (!hasValue(values[key])) {
			errors[key] = rules[key];
		}
	}

	return errors;
}
