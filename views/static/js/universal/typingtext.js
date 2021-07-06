var TxtType = function(el, toRotate, period) {
  this.toRotate = toRotate;
  this.el = el;
  this.loopNum = 0;
  this.period = parseInt(period, 10);
  this.txt = '';
  this.tick();
  this.isDeleting = false;
};

TxtType.prototype.tick = function() {
  var i = this.loopNum % this.toRotate.length;
  var fullTxt = this.toRotate[i];

  if (this.isDeleting) {
    if (this.period !== 0) {
      this.txt = fullTxt.substring(0, this.txt.length - 1); // Who'd commented out this??
    }
  } else {
    this.txt = fullTxt.substring(0, this.txt.length + 1);
  }

  this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';

  var that = this;
  var delta = 200 - Math.random() * 100;

  if (this.isDeleting) { delta /= 2; }

  if (!this.isDeleting && this.txt === fullTxt) {
    delta = this.period;
    this.isDeleting = true;
  } else if (this.isDeleting && this.txt === '') {
    this.isDeleting = false;
    this.loopNum++;
    delta = 500;
  }

  setTimeout(function() {
    that.tick();
  }, delta);
};

var Messenger = function(el) {
  'use strict';

  var m = this;

  m.init = function() {
    m.codeletters = "&#*+%?Â£@Â§$";
    m.message = 0;
    m.current_length = 0;
    m.fadeBuffer = false;
    m.messages = JSON.parse(el.getAttribute('messages'))
    setTimeout(m.animateIn, 100);
  };
  m.generateRandomString = function(length) {
    var random_text = '';
    while (random_text.length < length) {
      random_text += m.codeletters.charAt(Math.floor(Math.random() * m.codeletters.length));
    }
    return random_text;
  };
  m.animateIn = function() {
    if (m.current_length < m.messages[m.message].length) {
      m.current_length = m.current_length + 2;
      if (m.current_length > m.messages[m.message].length) {
        m.current_length = m.messages[m.message].length;
      }
      var message = m.generateRandomString(m.current_length);
      el.innerHTML = message
      setTimeout(m.animateIn, 20);
    } else {
      setTimeout(m.animateFadeBuffer, 20);
    }
  };
  m.animateFadeBuffer = function() {
    if (m.fadeBuffer === false) {
      m.fadeBuffer = [];
      for (var i = 0; i < m.messages[m.message].length; i++) {
        m.fadeBuffer.push({
          c: (Math.floor(Math.random() * 12)) + 1,
          l: m.messages[m.message].charAt(i)
        });
      }
    }
    var do_cycles = false;
    var message = '';
    for (var j = 0; j < m.fadeBuffer.length; j++) {
      var fader = m.fadeBuffer[j];
      if (fader.c > 0) {
        do_cycles = true;
        fader.c--;
        message += m.codeletters.charAt(Math.floor(Math.random() * m.codeletters.length));
      } else {
        message += fader.l;
      }
    }
    el.innerHTML = message
    if (do_cycles === true) {
      setTimeout(m.animateFadeBuffer, 50);
    } else {
      el.onclick = m.cycleText
    }
  };
  m.cycleText = function() {
    m.message = m.message + 1;
    if (m.message >= m.messages.length) {
      m.message = 0;
    }
    m.current_length = 0;
    m.fadeBuffer = false;
    el.innerHTML = ''
    setTimeout(m.animateIn, 200);
  };
  m.init();
}
console.clear();

window.onload = function() {
  var elements = document.getElementsByClassName('typewrite');
  for (var i=0; i<elements.length; i++) {
    var toRotate = elements[i].getAttribute('data-type');
    var period = elements[i].getAttribute('data-period');
    console.log(toRotate, period)
    if (toRotate) {
      new TxtType(elements[i], JSON.parse(toRotate), period);
    }
  }
  // INJECT CSS
  var css = document.createElement("style");
  css.type = "text/css";
  css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid}";
  document.body.appendChild(css);

  // Scrambles

  // on window load
  var executed1
  var runOnce1 = (function() {
    executed1 = false;
    return function() {
      if (!executed1) {
        executed1 = true;
        new Messenger(document.querySelector('#enigmamessenger'))
      }
    };
  })();
  runOnce1()

  // on button click
  document.querySelector("#enigma").onclick = new Messenger(document.querySelector('#messengerbottom'))

  var executed

  // get window dimensions
  var width = window.innerWidth
  var height = window.innerHeight
  window.addEventListener('resize', () => {
    if (typeof (window.innerWidth) == 'number') {
      width = window.innerWidth;
      height = window.innerHeight;
    } else {
      if (document.documentElement && (document.documentElement.clientWidth || document.documentElement.clientHeight)) {
        width = document.documentElement.clientWidth;
        height = document.documentElement.clientHeight;
      } else {
        if (document.body && (document.body.clientWidth || document.body.clientHeight)) {
          width = document.body.clientWidth;
          height = document.body.clientHeight;
        }
      }
    }
  });

  // on scroll pos
  window.addEventListener("scroll", (event) => {
    var scroll = this.scrollY; 

    if (scroll > height && scroll < 1.5 * height) {
      runOnce2()
    } else {
      executed = false
    }
  })
  var runOnce2 = (function() {
    executed = false;
    return function() {
      if (!executed) {
        executed = true;
        new Messenger(document.querySelector('#messengertop'))
      }
    };
  })();
};