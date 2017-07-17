function shuffle(a) {
    for (let i = a.length; i; i--) {
        let j = Math.floor(Math.random() * i);
        [a[i - 1], a[j]] = [a[j], a[i - 1]];
    }
}

function clearBoards() {
    $("#bingo-boards").children().remove();
}

function insertBingoBoards(boardsCount, templatePhrases) {
    // todo: random 25 els

    clearBoards();

    for (let i = 0; i < boardsCount; i++) {
        insertBingoBoard(templatePhrases);
    }

    $('.page-break:last').remove();
}

function insertBingoBoard(templatePhrases) {
    let phrases = JSON.parse(JSON.stringify(templatePhrases));
    shuffle(phrases);

    insertLogo();

    let $board = $("<div/>", { "class": "bingo-board" });
    $("#bingo-boards").append($board);

    if (templatePhrases.length < 25) {
        throw "json must contain at least 25 phrases";
    }

    let size = 5;
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

    insertFooter();

    let $pageBreak = $("<div/>", { "class": "page-break" });
    $("#bingo-boards").append($pageBreak);
}

function insertLogo() {
    let $container = $("<div/>", { "class": "logo-container" });
    $("#bingo-boards").append($container);

    let $logo = $("<img/>", { "src": "logo.png", "alt": "Heroes of the Storm" });
    $logo.appendTo($container);
}

function insertFooter() {
    let instructions = "While you watch the <em>Heroes of the Storm</em>, mark each hex as a caster says the indicated phrase. Be the first player to mark five hexes in a row (horizontal, vertical, or diagonal) and shout “<strong>BINGO</strong>” to win!";
    $("#bingo-boards").append(`<div class="instructions">${instructions}</div>`);
}

$(document).ready(() => {
    let boardsCount = 1;
    let phrases = null;
    let phraseSet = null;

    $(document).on('input', '.boards-count input', () => {
        boardsCount = $(".boards-count input").val();
        $(".boards-count span").text(boardsCount);
        insertBingoBoards(boardsCount, phrases);
    });

    let render = () => {
        phraseSet = $(".phrase-set select").val();

        $.getJSON(`phrases/${phraseSet}.json`, json => {
            phrases = json;
            insertBingoBoards(boardsCount, phrases);
        });
    }

    $(document).on('input', '.phrase-set select', () => render());

    render();
});