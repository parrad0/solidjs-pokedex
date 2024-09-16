export const useUniqueId = (prefix: string): string => {
	const id = `${prefix}-${Math.random().toString(36).substr(2, 9)}`;
	return id;
};
