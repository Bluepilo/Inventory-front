import { useEffect, useState } from "react";

export const UseDebounce = <T>(value: T, delay = 500) => {
	const [debounceValue, setDebounceValue] = useState<T>(value);

	useEffect(() => {
		const timeout = setTimeout(() => {
			setDebounceValue(value);
		}, delay);

		return () => clearTimeout(timeout);
	}, [value, delay]);

	return debounceValue;
};
