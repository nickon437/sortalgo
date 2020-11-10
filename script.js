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
    const FADING_TIME = 500;
    const DELAY_AFTER_FADE = 500;


    const getIdByIndex = (index) => {
        return `#sel-sort-${localQuery[index]}`
    }

    /**
     * To create a seemless swapping effect, 
     * 
     * @param {*} x 
     * @param {*} y 
     */
    async function swapContent(x, y) {
        const xId = getIdByIndex(x);
        const yId = getIdByIndex(y);

        $(xId).fadeTo(FADING_TIME, 0);
        $(yId).fadeTo(FADING_TIME, 0);

        await sleep(FADING_TIME);

        // DATA
        let temp = localQuery[x];
        localQuery[x] = localQuery[y];
        localQuery[y] = temp;
        
        // Swapp background and innerText for the visual fading effect
        temp = $(xId)[0].style.backgroundColor;
        $(xId)[0].style.backgroundColor = $(yId)[0].style.backgroundColor;
        $(yId)[0].style.backgroundColor = temp;
        
        temp = $(xId).text();
        $(xId).text($(yId).text());
        $(yId).text(temp);
        
        $(xId).fadeTo(FADING_TIME, 1);
        $(yId).fadeTo(FADING_TIME, 1);
        await sleep(DELAY_AFTER_FADE);

        // Swapping the div elements because swapping background and innerText is only for the visual effect but the ID is still stay the same.
        temp = unsortedHtml[x];
        unsortedHtml[x] = unsortedHtml[y];
        unsortedHtml[y] = temp;
        $(".card-illustration-elements").html(unsortedHtml.join(''));
    };


    // $('.sorted-marker').css('left', getMidPoint(localQuery[0]) - 100);
    
    for (let i = 0; i < localQuery.length - 1; i++) {
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
        $('.sorted-marker').css('left', getMidPoint(localQuery[i + 1]) - 90);
        
    }
}

createUnsortedList();

$('#sort-btn').click(() => selectionSort());
$('#reset-btn').click(() => createUnsortedList());