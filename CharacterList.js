class CharacterList {
  static DEFAULT_UNSORTED_CHARS = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'Z', 'X', 'C', 'V', 'B', 'N', 'M'];
  static SORTED_COLORS = [
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
  ];

  constructor() {
    this.characterList = [];
    this.generate();
  }

  generate = function () {
    let htmlArray = [];
    this.characterList = CharacterList.DEFAULT_UNSORTED_CHARS.map((character) => {
      const { color } = CharacterList.SORTED_COLORS.find((element) => element.character === character);
      const htmlFormat = `<div id="sel-sort-${character}" class="element" style="background-color: ${color}">${character}</div>`;
      htmlArray.push(htmlFormat);
      return { character, color, htmlFormat };
    });

    $(".illustration-elements").html(htmlArray.join(''));

    return this.characterList;
  }

  getList = () => {
    return this.characterList;
  }

  getLength = () => {
    return this.characterList.length;
  }

  getChar = (index) => {
    return this.characterList[index].character;
  }

  // setChar = (index, value) => {
  //   this.characterList[index] = value
  // } 

  getHtmlArray = () => {
    return this.characterList.map((element) => element.htmlFormat);
  }

  swapElements = (x, y) => {
    const temp = this.characterList[x];
    this.characterList[x] = this.characterList[y];
    this.characterList[y] = temp;
  }

  shuffle = () => {
    for (let i = this.characterList.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.characterList[i], this.characterList[j]] = [this.characterList[j], this.characterList[i]];
    }

    $(".illustration-elements").html(this.getHtmlArray().join(''));

    return this.characterList;
  }
}

export default CharacterList;