class CharacterSet {
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
    this.characterSet = [];
    this.generate();
  }

  generate = function () {
    let htmlArray = [];
    this.characterSet = CharacterSet.DEFAULT_UNSORTED_CHARS.map((character) => {
      const { color } = CharacterSet.SORTED_COLORS.find((element) => element.character === character);
      const htmlFormat = `<div id="sel-sort-${character}" class="element" style="background-color: ${color}">${character}</div>`;
      htmlArray.push(htmlFormat);
      return { character, color, htmlFormat };
    });

    $(".illustration-elements").html(htmlArray.join(''));

    return this.characterSet;
  }

  getList = () => {
    return this.characterSet;
  }

  getLength = () => {
    return this.characterSet.length;
  }

  getChar = (index) => {
    return this.characterSet[index].character;
  }

  getHtmlArray = () => {
    return this.characterSet.map((element) => element.htmlFormat);
  }

  swapElements = (x, y) => {
    const temp = this.characterSet[x];
    this.characterSet[x] = this.characterSet[y];
    this.characterSet[y] = temp;
  }

  shuffle = () => {
    for (let i = this.characterSet.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.characterSet[i], this.characterSet[j]] = [this.characterSet[j], this.characterSet[i]];
    }

    $(".illustration-elements").html(this.getHtmlArray().join(''));

    return this.characterSet;
  }
}

export default CharacterSet;