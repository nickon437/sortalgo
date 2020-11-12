var $jscomp=$jscomp||{};$jscomp.scope={};$jscomp.createTemplateTagFirstArg=function(a){return a.raw=a};$jscomp.createTemplateTagFirstArgWithRaw=function(a,b){a.raw=b;return a};$jscomp.arrayIteratorImpl=function(a){var b=0;return function(){return b<a.length?{done:!1,value:a[b++]}:{done:!0}}};$jscomp.arrayIterator=function(a){return{next:$jscomp.arrayIteratorImpl(a)}};$jscomp.makeIterator=function(a){var b="undefined"!=typeof Symbol&&Symbol.iterator&&a[Symbol.iterator];return b?b.call(a):$jscomp.arrayIterator(a)};
var CharacterSet$$module$Input_0=function(){this.characterSet=[];this.DEFAULT_UNSORTED_CHARS="QWERTYUIOPASDFGHJKLZXCVBNM".split("");this.SORTED_COLORS=[{character:"A",color:"#c33f3b"},{character:"B",color:"#c85141"},{character:"C",color:"#d07447"},{character:"D",color:"#d79b4f"},{character:"E",color:"#dbb454"},{character:"F",color:"#d9c95a"},{character:"G",color:"#d9db5c"},{character:"H",color:"#cadd59"},{character:"I",color:"#b4dc52"},{character:"J",color:"#93cf4d"},{character:"K",color:"#7dc346"},
{character:"L",color:"#5db947"},{character:"M",color:"#48aa4a"},{character:"N",color:"#40a24d"},{character:"O",color:"#429f59"},{character:"P",color:"#439a64"},{character:"Q",color:"#429774"},{character:"R",color:"#439286"},{character:"S",color:"#448d93"},{character:"T",color:"#438aa3"},{character:"U",color:"#4786ae"},{character:"V",color:"#607ab6"},{character:"W",color:"#7371b6"},{character:"X",color:"#8a6cb5"},{character:"Y",color:"#a265b6"},{character:"Z",color:"#b060b2"}];this.generate()};
CharacterSet$$module$Input_0.prototype.generate=function(){var a=this,b=[];this.characterSet=this.DEFAULT_UNSORTED_CHARS.map(function(c){var d=a.SORTED_COLORS.find(function(f){return f.character===c}).color,e='<div id="sel-sort-'+c+'" class="element" style="background-color: '+d+'">'+c+"</div>";b.push(e);return{character:c,color:d,htmlFormat:e}});$(".illustration-elements").html(b.join(""));return this.characterSet};CharacterSet$$module$Input_0.prototype.getList=function(){return this.characterSet};
CharacterSet$$module$Input_0.prototype.getLength=function(){return this.characterSet.length};CharacterSet$$module$Input_0.prototype.getChar=function(a){return this.characterSet[a].character};CharacterSet$$module$Input_0.prototype.getHtmlArray=function(){return this.characterSet.map(function(a){return a.htmlFormat})};CharacterSet$$module$Input_0.prototype.swapElements=function(a,b){var c=this.characterSet[a];this.characterSet[a]=this.characterSet[b];this.characterSet[b]=c};
CharacterSet$$module$Input_0.prototype.shuffle=function(){for(var a=this.characterSet.length-1;0<a;a--){var b=Math.floor(Math.random()*(a+1)),c=$jscomp.makeIterator([this.characterSet[b],this.characterSet[a]]);this.characterSet[a]=c.next().value;this.characterSet[b]=c.next().value}$(".illustration-elements").html(this.getHtmlArray().join(""));return this.characterSet};var $jscompDefaultExport$$module$Input_0=CharacterSet$$module$Input_0,module$Input_0={};module$Input_0["default"]=$jscompDefaultExport$$module$Input_0;