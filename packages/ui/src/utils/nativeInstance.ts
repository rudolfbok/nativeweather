/** Extract the target type used by a React Native component's ref. */
export type NativeInstance<T> = T extends abstract new (...args: any[]) => infer Instance
	? Instance
	: T extends (...args: any[]) => any
		? Parameters<T>[0] extends { ref?: infer RefType }
			? RefType extends { current: infer Instance | null }
				? Instance
				: RefType extends (instance: infer Instance | null) => any
					? Instance
					: never
			: never
		: never;
