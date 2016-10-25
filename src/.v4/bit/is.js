export function object(item) {
    return (item && typeof item === 'object' && !Array.isArray(item) && item !== null);
}

export function array(input) {
	return Array.isArray(input)
}

export function bit(input) {
	return object(input) && input.bits
}
