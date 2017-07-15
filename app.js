function shuffle(a) {
    for (let i = a.length; i; i--) {
        let j = Math.floor(Math.random() * i);
        [a[i - 1], a[j]] = [a[j], a[i - 1]];
    }
}

function insertBingoBoard(templatePhrases) {
    let phrases = JSON.parse(JSON.stringify(templatePhrases));
    shuffle(phrases);

    insertLogo();

    let $board = $("<div/>", { "class": "bingo-board" });
    $("body").append($board);

    let size = Math.floor(Math.sqrt(phrases.length));

    for (let row = 0; row < size; row++) {
        let $row = $('<ul/>', { "class": 'bingo-row' });
        $row.appendTo($board);

        for (let col = 0; col < size; col++) {
            let $col = $('<li/>');
            $col.appendTo($row);

            let idx = row * size + col;
            $(`<div class="hexagon-container"><div class="hexagon-text"><span>${phrases[idx]}</span></div><div class="hexagon"></div></div>`).appendTo($col);
        }
    }

    let $pageBreak = $("<div/>", { "class": "page-break" });
    $("body").append($pageBreak);
}

function insertLogo() {
    let $container = $("<div/>", { "class": "logo-container" });
    $("body").append($container);

    let $logo = $("<img/>", { "src": "logo.png", "alt": "Heroes of the Storm" });
    $logo.appendTo($container);
}

$(document).ready(() => {
    $.getJSON("phrases.json", phrases => {
        insertBingoBoard(phrases);
        insertBingoBoard(phrases);
        insertBingoBoard(phrases);
    });
});