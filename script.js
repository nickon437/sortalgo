import CharacterList from './CharacterList.js';

const charList = new CharacterList();
const FACTOR = 500;
let waitTime = FACTOR;

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const getMidPos = (character) => {
    const margin = $(".illustration-elements").position().left;
    const id = `#sel-sort-${character}`;
    const leftPos = $(id).position().left - margin;
    return `calc(${leftPos}px + 1rem*2/3)`;
}

const getIdByIndex = (index) => `#sel-sort-${charList.getChar(index)}`;

async function swapContent(x, y) {
    const xId = getIdByIndex(x);
    const yId = getIdByIndex(y);

    $(xId).fadeTo(waitTime, 0);
    $(yId).fadeTo(waitTime, 0);
    await sleep(waitTime);

    charList.swapElements(x, y);
    $(".illustration-elements").html(charList.getHtmlArray().join(''));
    $(xId).hide().fadeTo(waitTime, 1);
    $(yId).hide().fadeTo(waitTime, 1);
    await sleep(waitTime);
}

function updateUiStartSorting() {
    $('.illustration-line').fadeIn();
    $('button').prop('disabled', true);
}

function updateUiEndSorting() {
    $('.illustration-line').fadeOut();
    $('button').fadeIn();
    $('button').prop('disabled', false);
    $('#sort-btn').hide();
}

async function selectionSort() {
    updateUiStartSorting();

    for (let i = 0; i < charList.getLength() - 1; i++) {
        let minIndex = i;

        const midPosI = getMidPos(charList.getChar(minIndex));
        $('.line-min').css('left', midPosI);
        $('.line-i').css('left', midPosI);
        $('.line-j').css('left', midPosI);
        await sleep(waitTime);
        
        for (let j = i + 1; j < charList.getLength(); j++) {
            $('.line-j').css('left', getMidPos(charList.getChar(j)));
            await sleep(waitTime);

            if (charList.getChar(j) < charList.getChar(minIndex)) {
                $('.line-j').css('background-color', 'red');
                await sleep(waitTime);

                minIndex = j;
                $('.line-min').css('left', getMidPos(charList.getChar(minIndex)));
                await sleep(waitTime);

                $('.line-j').css('background-color', '');
            }
        }

        if (minIndex !== i) {
            await swapContent(minIndex, i); // Swap the found minimum element with the first element
        }

        $('.sorted-marker').css('left', `calc(${getMidPos(charList.getChar(i + 1))} - 5.5rem)`);
    }

    updateUiEndSorting();
}

const initElementList = () => {
    $('#reset-btn').hide();
    $('#sort-btn').fadeIn();
    charList.shuffle();
}

$('#sort-btn').click(() => selectionSort());
$('#reset-btn').click(() => initElementList());
$('#speed-slider').on('input', (e) => {
    waitTime = FACTOR * e.target.value; // Update speed
    $('#delay-value').text(`x${e.target.value}`);
});

initElementList();