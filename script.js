const DEFAULT_UNSORTED_CHARS = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'Z', 'X', 'C', 'V', 'B', 'N', 'M'];
let unsortedHtml;
let multiplier = 1;

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

    $(".illustration-elements").html(unsortedHtml.join(''));
}

const getMidPoint = (character) => {
    const margin = $(".illustration-elements").position().left;
    const id = `#sel-sort-${character}`;
    const leftPos = $(id).position().left - margin;
    return `calc(${leftPos}px + 1rem*2/3)`;
    // $('.line-min').css('left', leftPos + 11);
}

async function selectionSort() {
    const localQuery = [...DEFAULT_UNSORTED_CHARS];
    let minIndex;
    
    const FACTOR = 500;
    let waitTime = FACTOR * multiplier;

    $('.illustration-line').fadeIn();
    $('button').prop('disabled', true);

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

        $(xId).fadeTo(waitTime, 0);
        $(yId).fadeTo(waitTime, 0);

        await sleep(waitTime);

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
        
        $(xId).fadeTo(waitTime, 1);
        $(yId).fadeTo(waitTime, 1);
        await sleep(waitTime);

        // Swapping the div elements because swapping background and innerText is only for the visual effect but the ID is still stay the same.
        temp = unsortedHtml[x];
        unsortedHtml[x] = unsortedHtml[y];
        unsortedHtml[y] = temp;
        $(".illustration-elements").html(unsortedHtml.join(''));
    };

    for (let i = 0; i < localQuery.length - 1; i++) {
        minIndex = i;
        $('.line-min').css('left', getMidPoint(localQuery[minIndex]));
        $('.line-i').css('left', getMidPoint(localQuery[minIndex]));
        
        await sleep(waitTime);
        for (let j = i + 1; j < localQuery.length; j++) {
            
            // Update speed        
            waitTime = FACTOR * multiplier;

            $('.line-j').fadeIn();
            $('.line-j').css('left', getMidPoint(localQuery[j]));
            await sleep(waitTime);

            if (localQuery[j] < localQuery[minIndex]) {
                $('.line-j').css('background-color', 'red');
                await sleep(waitTime);

                minIndex = j;
                $('.line-min').css('left', getMidPoint(localQuery[minIndex]));
                await sleep(waitTime);

                $('.line-j').css('background-color', '');
            }
        }


        if (minIndex !== i) {
            // Swap the found minimum element with the first element
            await swapContent(minIndex, i);
        }

        $('.sorted-marker').css('left', `calc(${getMidPoint(localQuery[i + 1])} - 5.5rem)`);
        
    }
    
    $('.illustration-line').fadeOut();
    $('button').fadeIn();
    $('#sort-btn').hide();
    $('button').prop('disabled', false);
}

const initElementList = () => {
    $('#reset-btn').hide();
    $('#sort-btn').fadeIn();

    createUnsortedList();
    const startingPos = getMidPoint(DEFAULT_UNSORTED_CHARS[0]);
    $('.sorted-marker').css('left', `calc(${startingPos} - 5.5rem)`);
    $('.line-min').css('left', startingPos);
    $('.line-i').css('left', startingPos);
    $('.line-j').css('left', startingPos);
}

$('#sort-btn').click(() => selectionSort());
$('#reset-btn').click(() => initElementList());
$('#speed-slider').on('input', (e) => {
    multiplier = e.target.value;
    $('#delay-value').text(`x${multiplier}`);
});

initElementList();