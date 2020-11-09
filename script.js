const DEFAULT_UNSORTED_CHARS = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'Z', 'X', 'C', 'V', 'B', 'N', 'M'];
let unsortedHtml;

const sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const createUnsortedList = () => {
    const SORTED_COLORS = [
        { character: 'A', color: '#c33f3b' },
        { character: 'B', color: '#c85141' },
        { character: 'C', color: '#d07447' },
        { character: 'D', color: '#d79b4f' },
        { character: 'E', color: '#dbb454' },
        { character: 'F', color: '#d9c95a' },
        { character: 'G', color: '#d9db5c' },
        { character: 'H', color: '#cadd59' },
        { character: 'I', color: '#b4dc52' },
        { character: 'J', color: '#93cf4d' },
        { character: 'K', color: '#7dc346' },
        { character: 'L', color: '#5db947' },
        { character: 'M', color: '#48aa4a' },
        { character: 'N', color: '#40a24d' },
        { character: 'O', color: '#429f59' },
        { character: 'P', color: '#439a64' },
        { character: 'Q', color: '#429774' },
        { character: 'R', color: '#439286' },
        { character: 'S', color: '#448d93' },
        { character: 'T', color: '#438aa3' },
        { character: 'U', color: '#4786ae' },
        { character: 'V', color: '#607ab6' },
        { character: 'W', color: '#7371b6' },
        { character: 'X', color: '#8a6cb5' },
        { character: 'Y', color: '#a265b6' },
        { character: 'Z', color: '#b060b2' },
    ]

    unsortedHtml = DEFAULT_UNSORTED_CHARS.map((character) => {
        const { color } = SORTED_COLORS.find((element) => element.character === character);
        return `<div id="sel-sort-${character}" class="element" style="background-color: ${color}">${character}</div>`
    });

    $(".card-illustration-elements").html(unsortedHtml.join(''));
}

const getMidPoint = (character) => {
    const margin = $(".card-illustration-elements").position().left;
    const id = `#sel-sort-${character}`;
    const leftPos = $(id).position().left - margin;
    return leftPos + 11;
    // $('.head-line').css('left', leftPos + 11);
}

async function selectionSort() {
    const localQuery = [...DEFAULT_UNSORTED_CHARS];
    let minIndex;
    const WAIT_TIME = 100;

    async function swapContent(x, y) {
        const xId = `#sel-sort-${localQuery[x]}`;
        const yId = `#sel-sort-${localQuery[y]}`;

        $(xId).fadeTo(1000, 0);
        $(yId).fadeTo(1000, 0);

        await sleep(1000);

        // DATA
        let temp = localQuery[x];
        localQuery[x] = localQuery[y];
        localQuery[y] = temp;

        // VISUALLY
        temp = unsortedHtml[x];
        unsortedHtml[x] = unsortedHtml[y];
        unsortedHtml[y] = temp;

        // Backgorund color
        temp = $(xId)[0].style.backgroundColor;
        $(xId)[0].style.backgroundColor = $(yId)[0].style.backgroundColor;
        $(yId)[0].style.backgroundColor = temp;
        
        temp = $(xId)[0].innerText;
        $(xId)[0].innerText = $(yId)[0].innerText;
        $(yId)[0].innerText = temp;

        $(xId).fadeTo(1000, 1);
        $(yId).fadeTo(1000, 1);
        await sleep(1500);
        $(".card-illustration-elements").html(unsortedHtml.join(''));
    };
    
    for (let i = 0; i < localQuery.length - 1; i++) {
        // setTimeout(() => {
            minIndex = i;
            $('.head-line').css('left', getMidPoint(localQuery[minIndex]));
            $('.tail-line').css('left', getMidPoint(localQuery[minIndex]));
            await sleep(WAIT_TIME);
            for (let j = i + 1; j < localQuery.length; j++) {
                $('.tail-line').css('left', getMidPoint(localQuery[j]));
                await sleep(WAIT_TIME);
                if (localQuery[j] < localQuery[minIndex]) {
                    minIndex = j;
                    $('.head-line').css('left', getMidPoint(localQuery[minIndex]));
            }
        }
        // Swap the found minimum element with the first element
        await swapContent(minIndex, i);
        // }, 2000);
    }
}

createUnsortedList();

$('#sort-btn').click(() => selectionSort());