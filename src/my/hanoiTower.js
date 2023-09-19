function hanoiTower(discs, source, temp, target) {
	if (discs === 1) {
		console.log(`Переместить диск 1 с ${source} на ${target}`);
		return;
	}

	hanoiTower(discs - 1, source, target, temp);
	console.log(`Переместить диск ${discs} с ${source} на ${target}`);
	hanoiTower(discs - 1, temp, source, target);
}


hanoiTower(3, 'A', 'B', 'C');

