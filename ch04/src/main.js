// The Lycanthrope's Log
//
// # Examples
//
// ```
// $ node src/main.js
// $ n src/main.js
// first run:
// 	weekend: 0.13719886811400708
// 	brushed teeth: -0.3805211953235953
// 	candy: 0.12964074471043288
// 	work: -0.13719886811400708
// 	spaghetti: 0.242535625036333
// 	reading: 0.11068280537595927
// 	peanuts: 0.59026798116852
//
// second run:
// 	peanuts: 0.59026798116852
// 	peanuts teeth: 1
// ```

function main(journal) {
	console.log('first run:');
	printCorrelation(journal);

	// Adds the peanuts teeth event.
	for (let entry of journal) {
		if (
			entry.events.includes('peanuts') &&
			!entry.events.includes('brushed teeth')
		) {
			entry.events.push('peanuts teeth');
		}
	}

	// Just shows the peanuts teeth events.
	console.log('\nsecond run:');
	printCorrelation(journal, [-0.5, 0.5]);
}

// Phi coefficient
//
// https://en.wikipedia.org/wiki/Phi_coefficient
function phi([n00, n01, n10, n11]) {
	// (n00 * n11 - n10 * n01) / sqrt(n1* x n0* x n*0 x n*1)
	return (
		(n00 * n11 - n10 * n01) /
		Math.sqrt((n10 + n11) * (n00 + n01) * (n00 + n10) * (n01 + n11))
	);
}

// Creates the coefficient table for each event.
function tableFor(event, journal) {
	let table = [0, 0, 0, 0];
	for (let entry of journal) {
		let index = 0;
		if (entry.events.includes(event)) index += 1;
		if (entry.squirrel) index += 2;
		table[index] += 1;
	}
	return table;
}

// Creates a hash set of the events from the journal array.
function journalEvents(journal) {
	let events = [];
	for (let entry of journal) {
		for (let event of entry.events) {
			if (!events.includes(event)) {
				events.push(event);
			}
		}
	}
	return events;
}

// Prints the correlation.
function printCorrelation(journal, [below, above] = [-0.1, 0.1]) {
	for (let event of journalEvents(journal)) {
		let correlation = phi(tableFor(event, journal));
		if (correlation < below || correlation > above) {
			console.log('\t' + event + ':', correlation);
		}
	}
}

// From https://eloquentjavascript.net/code/chapter/04_data.zip
const JOURNAL = [
	{ events: ['carrot', 'exercise', 'weekend'], squirrel: false },
	{
		events: ['bread', 'pudding', 'brushed teeth', 'weekend', 'touched tree'],
		squirrel: false
	},
	{
		events: ['carrot', 'nachos', 'brushed teeth', 'cycling', 'weekend'],
		squirrel: false
	},
	{
		events: [
			'brussel sprouts',
			'ice cream',
			'brushed teeth',
			'computer',
			'weekend'
		],
		squirrel: false
	},
	{
		events: [
			'potatoes',
			'candy',
			'brushed teeth',
			'exercise',
			'weekend',
			'dentist'
		],
		squirrel: false
	},
	{
		events: [
			'brussel sprouts',
			'pudding',
			'brushed teeth',
			'running',
			'weekend'
		],
		squirrel: false
	},
	{
		events: ['pizza', 'brushed teeth', 'computer', 'work', 'touched tree'],
		squirrel: false
	},
	{
		events: ['bread', 'beer', 'brushed teeth', 'cycling', 'work'],
		squirrel: false
	},
	{ events: ['cauliflower', 'brushed teeth', 'work'], squirrel: false },
	{ events: ['pizza', 'brushed teeth', 'cycling', 'work'], squirrel: false },
	{ events: ['lasagna', 'nachos', 'brushed teeth', 'work'], squirrel: false },
	{ events: ['brushed teeth', 'weekend', 'touched tree'], squirrel: false },
	{
		events: ['lettuce', 'brushed teeth', 'television', 'weekend'],
		squirrel: false
	},
	{ events: ['spaghetti', 'brushed teeth', 'work'], squirrel: false },
	{ events: ['brushed teeth', 'computer', 'work'], squirrel: false },
	{ events: ['lettuce', 'nachos', 'brushed teeth', 'work'], squirrel: false },
	{ events: ['carrot', 'brushed teeth', 'running', 'work'], squirrel: false },
	{ events: ['brushed teeth', 'work'], squirrel: false },
	{ events: ['cauliflower', 'reading', 'weekend'], squirrel: false },
	{ events: ['bread', 'brushed teeth', 'weekend'], squirrel: false },
	{ events: ['lasagna', 'brushed teeth', 'exercise', 'work'], squirrel: false },
	{
		events: ['spaghetti', 'brushed teeth', 'reading', 'work'],
		squirrel: false
	},
	{
		events: ['carrot', 'ice cream', 'brushed teeth', 'television', 'work'],
		squirrel: false
	},
	{ events: ['spaghetti', 'nachos', 'work'], squirrel: false },
	{
		events: ['cauliflower', 'ice cream', 'brushed teeth', 'cycling', 'work'],
		squirrel: false
	},
	{ events: ['spaghetti', 'peanuts', 'computer', 'weekend'], squirrel: true },
	{
		events: ['potatoes', 'ice cream', 'brushed teeth', 'computer', 'weekend'],
		squirrel: false
	},
	{
		events: ['potatoes', 'ice cream', 'brushed teeth', 'work'],
		squirrel: false
	},
	{ events: ['peanuts', 'brushed teeth', 'running', 'work'], squirrel: false },
	{ events: ['potatoes', 'exercise', 'work'], squirrel: false },
	{ events: ['pizza', 'ice cream', 'computer', 'work'], squirrel: false },
	{ events: ['lasagna', 'ice cream', 'work'], squirrel: false },
	{ events: ['cauliflower', 'candy', 'reading', 'weekend'], squirrel: false },
	{
		events: ['lasagna', 'nachos', 'brushed teeth', 'running', 'weekend'],
		squirrel: false
	},
	{ events: ['potatoes', 'brushed teeth', 'work'], squirrel: false },
	{ events: ['carrot', 'work'], squirrel: false },
	{ events: ['pizza', 'beer', 'work', 'dentist'], squirrel: false },
	{ events: ['lasagna', 'pudding', 'cycling', 'work'], squirrel: false },
	{
		events: ['spaghetti', 'brushed teeth', 'reading', 'work'],
		squirrel: false
	},
	{
		events: ['spaghetti', 'pudding', 'television', 'weekend'],
		squirrel: false
	},
	{
		events: ['bread', 'brushed teeth', 'exercise', 'weekend'],
		squirrel: false
	},
	{ events: ['lasagna', 'peanuts', 'work'], squirrel: true },
	{ events: ['pizza', 'work'], squirrel: false },
	{ events: ['potatoes', 'exercise', 'work'], squirrel: false },
	{ events: ['brushed teeth', 'exercise', 'work'], squirrel: false },
	{
		events: ['spaghetti', 'brushed teeth', 'television', 'work'],
		squirrel: false
	},
	{ events: ['pizza', 'cycling', 'weekend'], squirrel: false },
	{ events: ['carrot', 'brushed teeth', 'weekend'], squirrel: false },
	{ events: ['carrot', 'beer', 'brushed teeth', 'work'], squirrel: false },
	{ events: ['pizza', 'peanuts', 'candy', 'work'], squirrel: true },
	{
		events: ['carrot', 'peanuts', 'brushed teeth', 'reading', 'work'],
		squirrel: false
	},
	{ events: ['potatoes', 'peanuts', 'brushed teeth', 'work'], squirrel: false },
	{
		events: ['carrot', 'nachos', 'brushed teeth', 'exercise', 'work'],
		squirrel: false
	},
	{
		events: ['pizza', 'peanuts', 'brushed teeth', 'television', 'weekend'],
		squirrel: false
	},
	{
		events: ['lasagna', 'brushed teeth', 'cycling', 'weekend'],
		squirrel: false
	},
	{
		events: [
			'cauliflower',
			'peanuts',
			'brushed teeth',
			'computer',
			'work',
			'touched tree'
		],
		squirrel: false
	},
	{
		events: ['lettuce', 'brushed teeth', 'television', 'work'],
		squirrel: false
	},
	{
		events: ['potatoes', 'brushed teeth', 'computer', 'work'],
		squirrel: false
	},
	{ events: ['bread', 'candy', 'work'], squirrel: false },
	{ events: ['potatoes', 'nachos', 'work'], squirrel: false },
	{
		events: ['carrot', 'pudding', 'brushed teeth', 'weekend'],
		squirrel: false
	},
	{
		events: ['carrot', 'brushed teeth', 'exercise', 'weekend', 'touched tree'],
		squirrel: false
	},
	{ events: ['brussel sprouts', 'running', 'work'], squirrel: false },
	{ events: ['brushed teeth', 'work'], squirrel: false },
	{ events: ['lettuce', 'brushed teeth', 'running', 'work'], squirrel: false },
	{ events: ['candy', 'brushed teeth', 'work'], squirrel: false },
	{
		events: ['brussel sprouts', 'brushed teeth', 'computer', 'work'],
		squirrel: false
	},
	{ events: ['bread', 'brushed teeth', 'weekend'], squirrel: false },
	{ events: ['cauliflower', 'brushed teeth', 'weekend'], squirrel: false },
	{
		events: ['spaghetti', 'candy', 'television', 'work', 'touched tree'],
		squirrel: false
	},
	{ events: ['carrot', 'pudding', 'brushed teeth', 'work'], squirrel: false },
	{ events: ['lettuce', 'brushed teeth', 'work'], squirrel: false },
	{
		events: ['carrot', 'ice cream', 'brushed teeth', 'cycling', 'work'],
		squirrel: false
	},
	{ events: ['pizza', 'brushed teeth', 'work'], squirrel: false },
	{ events: ['spaghetti', 'peanuts', 'exercise', 'weekend'], squirrel: true },
	{
		events: ['bread', 'beer', 'computer', 'weekend', 'touched tree'],
		squirrel: false
	},
	{ events: ['brushed teeth', 'running', 'work'], squirrel: false },
	{
		events: ['lettuce', 'peanuts', 'brushed teeth', 'work', 'touched tree'],
		squirrel: false
	},
	{
		events: ['lasagna', 'brushed teeth', 'television', 'work'],
		squirrel: false
	},
	{
		events: ['cauliflower', 'brushed teeth', 'running', 'work'],
		squirrel: false
	},
	{ events: ['carrot', 'brushed teeth', 'running', 'work'], squirrel: false },
	{ events: ['carrot', 'reading', 'weekend'], squirrel: false },
	{ events: ['carrot', 'peanuts', 'reading', 'weekend'], squirrel: true },
	{ events: ['potatoes', 'brushed teeth', 'running', 'work'], squirrel: false },
	{ events: ['lasagna', 'ice cream', 'work', 'touched tree'], squirrel: false },
	{
		events: ['cauliflower', 'peanuts', 'brushed teeth', 'cycling', 'work'],
		squirrel: false
	},
	{ events: ['pizza', 'brushed teeth', 'running', 'work'], squirrel: false },
	{ events: ['lettuce', 'brushed teeth', 'work'], squirrel: false },
	{
		events: ['bread', 'brushed teeth', 'television', 'weekend'],
		squirrel: false
	},
	{
		events: ['cauliflower', 'peanuts', 'brushed teeth', 'weekend'],
		squirrel: false
	}
];

main(JOURNAL);
