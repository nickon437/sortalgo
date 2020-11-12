import CharacterList from './CharacterList.js';

const charList = new CharacterList();
const FACTOR = 500;
let multiplier = 1;
let waitTime = FACTOR * multiplier;

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const getMidPoint = (character) => {
    const margin = $(".illustration-elements").position().left;
    const id = `#sel-sort-${character}`;
    const leftPos = $(id).position().left - margin;
    return `calc(${leftPos}px + 1rem*2/3)`;
}

async function selectionSort() {
    $('.illustration-line').fadeIn();
    $('button').prop('disabled', true);

    const getIdByIndex = (index) => `#sel-sort-${charList.getChar(index)}`;

    /**
     * To create a seemless swapping effect, 
     * 
     * @param {*} x 
     * @param {*} y 
     */
    async function swapContent(x, y) {
        const xId = getIdByIndex(x);
        const yId = getIdByIndex(y);

        $(xId).fadeTo(waitTime, 0);
        $(yId).fadeTo(waitTime, 0);

        await sleep(waitTime);

        // Swapp background and innerText for the visual fading effect
        let temp = $(xId)[0].style.backgroundColor;
        $(xId)[0].style.backgroundColor = $(yId)[0].style.backgroundColor;
        $(yId)[0].style.backgroundColor = temp;

        temp = $(xId).text();
        $(xId).text($(yId).text());
        $(yId).text(temp);

        $(xId).fadeTo(waitTime, 1);
        $(yId).fadeTo(waitTime, 1);
        await sleep(waitTime);

        // Swapping the div elements because swapping background and innerText is only for the visual effect but the ID is still stay the same.
        charList.swapElements(x, y);
        $(".illustration-elements").html(charList.getHtmlArray().join(''));
    };

    for (let i = 0; i < charList.getLength() - 1; i++) {
        let minIndex = i;

        const midPosI = getMidPoint(charList.getChar(minIndex));
        $('.line-min').css('left', midPosI);
        $('.line-i').css('left', midPosI);
        $('.line-j').css('left', midPosI);
        await sleep(waitTime);
        
        for (let j = i + 1; j < charList.getLength(); j++) {
            waitTime = FACTOR * multiplier; // Update speed
            
            $('.line-j').css('left', getMidPoint(charList.getChar(j)));
            $('.line-j').fadeIn();
            await sleep(waitTime);

            if (charList.getChar(j) < charList.getChar(minIndex)) {
                $('.line-j').css('background-color', 'red');
                await sleep(waitTime);

                minIndex = j;
                $('.line-min').css('left', getMidPoint(charList.getChar(minIndex)));
                await sleep(waitTime);

                $('.line-j').css('background-color', '');
            }
        }

        if (minIndex !== i) {
            await swapContent(minIndex, i); // Swap the found minimum element with the first element
        }

        $('.sorted-marker').css('left', `calc(${getMidPoint(charList.getChar(i + 1))} - 5.5rem)`);
    }

    $('.illustration-line').fadeOut();
    $('button').fadeIn();
    $('button').prop('disabled', false);
    $('#sort-btn').hide();
}

const initElementList = () => {
    $('#reset-btn').hide();
    $('#sort-btn').fadeIn();

    charList.shuffle();
}

$('#sort-btn').click(() => selectionSort());
$('#reset-btn').click(() => initElementList());
$('#speed-slider').on('input', (e) => {
    multiplier = e.target.value;
    $('#delay-value').text(`x${multiplier}`);
});

initElementList();