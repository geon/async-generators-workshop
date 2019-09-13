import { counter, head } from "./new";

for (const q of head(counter(1), 10)) {
	console.log(q);
}

// import { newsSite, head, makeUrls } from "./new";

// for (const q of head(makeUrls(newsSite.makeUrl), 100)) {
// 	console.log(q);
// }

// import { newsSite, readHeadlines } from "./new";
// (async () => {
// 	for await (const q of readHeadlines(newsSite)) {
// 		console.log(q);
// 	}
// })();
