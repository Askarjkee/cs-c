export async function* filter(iter, predicate) {
	for await (const value of iter) {
		if (predicate(value)) {
			yield value;
		}
	}
}
