import { JSDOM, DOMWindow } from "jsdom";

type MakeUrl = (page: number) => string;

interface NewsSite {
	readonly makeUrl: MakeUrl;
	readonly selector: string;
}

export const newsSite: NewsSite = {
	makeUrl: (page: number) =>
		"https://news.ycombinator.com/news?p=" + page.toString(),
	selector: "a.storylink",
};

export function* counter(start: number) {
	for (let i = start; ; ++i) {
		yield i;
	}
}

export function* head<T>(generator: Generator<T>, limit: number) {
	for (let i = 0; i < limit; ++i) {
		const result = generator.next();

		if (result.done) {
			return;
		}

		yield result.value;
	}
}

export function* makeUrls(makeUrl: MakeUrl) {
	for (const page of counter(1)) {
		yield makeUrl(page);
	}
}

export async function readPage(url: string) {
	const { window } = await JSDOM.fromURL(url);
	return window;
}

export async function* readPages(
	makeUrl: MakeUrl,
): AsyncIterableIterator<DOMWindow> {
	for await (const url of makeUrls(makeUrl)) {
		yield readPage(url);
	}
}

function* getHeadlines(window: DOMWindow, selector: string) {
	for (let node of Array.from(window.document.querySelectorAll(selector))) {
		yield node.textContent;
	}
}

export async function* readHeadlines(site: NewsSite) {
	for await (const window of readPages(site.makeUrl)) {
		for (const headline of getHeadlines(window, site.selector)) {
			yield headline;
		}
	}
}
