$ = q => document.querySelector(q);
$$ = (el, q) => el.querySelector(q);

class Pzaz {
  constructor() {
    this.el = document.createElement('div');
    this.el.className = 'pzaz';
    //this.el.innerText = ' foobar';
    //
  }
  /*
  attach(root) {
    this.root = root;
    return this.el;
  } //meh?
  */
  //maybe generate DOM here?
}

class PzazBlank extends Pzaz {
  constructor() {
    super();
    this.type = 'blank';
  }
}

class PzazSym extends Pzaz {
  constructor(value) {
    super();
    this.type = 'sym';
    this.atomic = true;
    this.el.innerText = value; 
  }
}

class PzazList extends Pzaz {
  constructor(...members) {
    super();
    this.type = 'list';
    this.atomic = false;
    this.members = members;
    this.el.appendChild(document.createTextNode('('));
    for (let i in members) {
      let mel = this.el.appendChild(members[i].el);
      if (i < members.length - 1) {
        //vertical formatting logic here
        let sep = document.createElement('br');
        this.el.appendChild(sep);
      }
      if (i != 0) {
        mel.style.marginLeft = '10px';
      }
    }
    this.el.appendChild(document.createTextNode(')'));
  }
}


//sampleGlyph can be made generic
//attach root after the init

class PzazEd {
  sampleGlyph() {
    const sg = document.createElement('span');
    sg.innerText = 'a';
    this.el.appendChild(sg);
    const r = sg.getBoundingClientRect();
    this.glyph = {w: r.width, h: r.height};
    sg.remove(); //return value or set field?
  }
  constructor(el) {
    this.el = el;
    el.state = this;
    this.sampleGlyph();
    this.root = new PzazSym(this, 'barfoo');
  }
}

const car = x => x[0];
const cdr = x => x[1];
const atomp = x => x === null || typeof(x) !== 'object';
const nullp = x => x === null;
const end = x => atomp(x) ? x : end(cdr(x));
const properp = x => end(x) === null;

const lstri = x => `${sstri(car(x))}${atomp(cdr(x)) ? (nullp(cdr(x)) ? '' : ` . ${cdr(x)}`) : ` ${lstri(cdr(x))}`}`;
//nullp implies atomicity
//that said, is prettifying it further, really making it prettier?
const sstri = x => atomp(x) ? `${x}` : `(${lstri(x)})`;


//TODO ilists

// ([] === []) == false?

//cannonical rendering
//check if proper

/*
function renderSexp(x) {
  if 
}
*/

const ltoa = x => {
  let f = (x, res) => atomp(x) ? res : res.append(car(x))
  //'this' in lambdas?
  //  'this' of parent lexical scope
  //is that stupid?
  //isn't an imperative way clearer?
    //do it both ways to find out!
}

function init() { 
  //pzaz = $('.pzaz');
  //init all components by mapping queried element with a constructor
  //[... document.querySelectorAll('.pzaz-ed')].map(el => new PzazEd(el));
  a = new PzazSym("abc");
  b = new PzazList(a, new PzazList(new PzazSym('bcd'), new PzazList(new PzazSym('efg'), new PzazSym('foo'))));
  l = ['abc', [['bcd', ['foo', null]], ['efg', null]]]
  //diamonds?
  document.body.appendChild(b.el);
}

