var Fansite = function(){ 

  var site = this;

  site.create = function(t, props){
    //console.log('create(',t, props,')');
    var el = document.createElement(t); 
    el.on = site.on;
    el.add = function(c){site.add(c, el)};
    if(props){     
      for(var p in props){ 
        if(p != 'style') el[p] = props[p];
      }    
      props.element = el;
      el.properties = props;
    } else props = {};
    site.add(el, props.parent);
    if(props['style']) {
      var sel = site.css.getSelector(el);
      if(sel) site.css.addRule(sel, props.style);
      else el['style'] = props['style'];
    }
    return el;
  };

  site.add = function(el, parent){
    if(!parent) parent = document.body;
    parent.appendChild(el);
  };

  site.clear = function(el){
    if (el.hasChildNodes()){
      while (el.childNodes.length){
        el.removeChild( el.firstChild );       
      } 
    }
  };

  site.get = function(selector){
    var q = document.querySelector(selector);
    return q;
  };

  site.getAll = function(selector){
    var q = document.querySelectorAll(selector);
    return Array().slice.call(q);
  };

  site.loop = function(f, r){ 
    var animationFrame = window.requestAnimationFrame 
                      || window.mozRequestAnimationFrame 
                      || window.webkitRequestAnimationFrame 
                      || window.msRequestAnimationFrame
                      || window.setTimeout;
    var cancelAnimation  = window.cancelAnimationFrame 
                      || window.mozCancelAnimationFrame
                      || window.webkitCancelRequestAnimationFrame 
                      || window.msCancelRequestAnimationFrame
                      || window.clearTimeout; 
    if(f.timeout) cancelAnimation(f.timeout);
    f.timeout = animationFrame(f, r || this.rate) 
  };

    ///////////////////////////////STYLE///////////////////////////////

  site.css = {
    rules: {},
    resizables: {},
    init: function(props){
      site.width = props.width;
      site.height = props.height;
      this['min-scale'] = props['min-scale'];
      this.el = document.createElement('style');
      this.el.id = 'rules'; 
      site.add(this.el);
      this.animation.el = site.create('style', {id: 'animation'}); 
      site.add(this.animation.el); 
      this.font.el = site.create('style',{id: 'font'}); 
      site.add(this.font.el); 
      this.font();
      this.resize('init');
      site.events.init();
    },
    events: function(){
      window.on('orientationchange', site.css.resize);
      window.on('resize', site.css.resize);
    },
    resize: function(source){ 
      //console.log(source,'(resize)');
      var rate = site.height / site.width;
      var width = window.innerWidth;
      var height = window.innerHeight;

      if(height > width * rate) site.convert = (width / 1000);
      else site.convert = (height / rate / 1000);

      site.convert = Math.max(site.convert, site.css['min-scale']);

      site.window = {
        height: window.innerHeight / site.convert,
        width: window.innerWidth / site.convert
      }

      site.px = function(n){
        return (n * site.convert).toFixed(2) + 'px';
      };  

      site.css.updateRender('resize');
    },
    getSelector: function(el){
      var sel = el.selector;
      if(!sel){
        if(el.id){
          sel = '#' + el.id;
        } else if(el.className){
          sel = '.' + el.className;
        }
      }
      return sel;
    },
    parsePx: function(str){
      if(str){
        var reg = /[0-9]+.{0,1}[0-9]*px/g;
        var arr = str.match(reg);
        var nstr = str.replace(reg, '&**&')
        var narr = [];
        for(i in arr){
          var val = +arr[i].replace('px',''); 
          narr[i] = site.px(val);
          nstr = nstr.replace('&**&', narr[i]);
        }
        return nstr;
      } else return '[parse px error]';
    },
    updateRender: function(source){
      //console.log(source,'(updateRender)');   
      for(var sel in this.resizables){
        var props = this.resizables[sel];
        for(var s in props){
          this.rules[sel][s] = this.parsePx(props[s]);
        }
      }
      this.render();
    },
    addRule: function(sel, obj, fixscale){ 
      //console.log('addRule', sel);
      if(!this.rules[sel]) this.rules[sel] = {};
      for(var s in obj){
        if(!fixscale) {
          if(!this.resizables[sel]) this.resizables[sel] = {};
          this.resizables[sel][s] = obj[s];
          this.rules[sel][s] = this.parsePx(obj[s]);
        } else this.rules[sel][s] = obj[s];
      };
      this.render();
    },
    animation: {
      rules: [],
      add: function(anim, fixscale){ 
        this.rules.push({
          scale: !fixscale,
          anim: anim
        });
        site.css.render();
      },
      render: function(){
        var css = '';
        for(a in this.rules){
          if(this.rules[a].scale) {
            css += site.css.parsePx(this.rules[a].anim) + '\n';
          } else css += this.rules[a].anim + '\n';
        }
        this.el.textContent = css;
      }
    },    
    render: function(){
      var st = '\n';
      for(var selector in this.rules){
        st += selector + ' {\n';
        var props = this.rules[selector];
        for(var s in props){
          st += '  '+ s + ': ' + props[s] + ';\n';
        };
        st += '}\n'
      };
      //console.log(this.el.textContent);
      this.el.textContent = st;
      this.animation.render();
    },
    paint: function(color, el){ 
      if(!el) {
        this.addRule('body', {
          'background': color
        });
      } else {
        if(el.id) {
          this.addRule('#' + el.id, {
            'background': color
          });
        } else {
          el.style.background = color;
        }
      }
    },
    toRGBA: function(color, alpha){
      var inv = 0;
      if(alpha == undefined) alpha = '1';
      else if(alpha == 'darker' || alpha == 'dark') {
        inv = -1;
        alpha = '1';
      } else if(alpha == 'ligher' || alpha == 'light') {
        inv = 1;
        alpha = '1';
      } else if(alpha >= 0 || alpha <= 1) {
        alpha = ''+alpha;
      }
      if(color[0] == '#') color = color.slice(1);
      var l = color.length;
      var ac = [
        color.slice(0,l/3), color.slice(l/3,2*l/3), color.slice(2*l/3,l)
      ]; 
      if(l == 3) for(var a in ac){ ac[a] += ac[a] };
      var c = {
        r: parseInt(ac[0], 16) + (6 * inv),
        g: parseInt(ac[1], 16) + (6 * inv),
        b: parseInt(ac[2], 16) + (6 * inv),
        a: alpha
      }; //console.log(ac, c);
      if(c.r < 0) c.r = 0; if(c.r > 255) c.r = 255; 
      if(c.g < 0) c.g = 0; if(c.g > 255) c.g = 255; 
      if(c.b < 0) c.b = 0; if(c.b > 255) c.b = 255;

      return 'rgba( '+ c.r +', '+ c.g +', '+ c.b + ', '+ c.a +')';

    },
    fonts: ['pixel', 'entypo'],
    font: function() {      
      var css = [];
      for(f in this.fonts){
        var font = this.fonts[f];
        var str = [
          '@font-face{', 
          '  font-family: \''+ font + '\';',
          '  src: url(\'font/'+font+'.eot\' ),',
          '       url(\'font/'+font+'.ttf\' ),',
          '       url(\'font/'+font+'.woff\');',
          '}'
        ];
        css.push(str.join('\n'));
      }
      this.font.el.textContent = css.join('\n');
    }
  };

    ///////////////////////////////STORAGE///////////////////////////////

  site.storage = {
    init: function(){
      this.storageboard = [];
      try { this.storageboard = JSON.parse(localStorage.getItem('storageboard')) }
      catch(e) { /*console.log('No storage detected.'+e)*/ }
      if(this.storageboard && this.storageboard.length){
        this.enable();
      } else this.storageboard = [];
    },
    save: function(){
      try { localStorage.setItem('storageboard', JSON.stringify(this.storageboard)) }
      catch(e) { /*console.log('Not able to save storage.'+e)*/ }
    },
    set: function(name, data){
      this.storageboard.push({name: name, storage: data});
      try { localStorage.setItem('storageboard', JSON.stringify(this.storageboard)) }
      catch(e) { /*console.log('Not able to save storage.'+e)*/ }
      this.enable();
    },
    enable: function(){
      //this.menu.highScore.el.disabled = false;
      //this.menu.highScore.el.on('click', this.menu.highScore);
    } 
  };  

    ///////////////////////////////EVENTS///////////////////////////////

  site.events = {
    init: function(){
      var on;
      if(window.attachEvent) {
        on = function(evt, f){ this.attachEvent('on'+evt, f) }
      } else if(window.addEventListener) {
        on = function(evt, f){ this.addEventListener(evt, f) }
      } else on = function(evt, f){ this['on'+evt] = f };
      this.on = on;
      site.on = on;
      window.on = on;
      document.on = on;
      document.body.on = on;
      site.css.events();
      //this.mouse.events();
      //this.touch.events();
      //this.keyboard.events();
    },
    loop: function(){ 
      this.events.delay = 0;
      while ((new Date).getTime() > this.date) { 
        //this.move(this.key);
        this.date += this.rate;
        ++this.events.delay;
      } 
      if(this.events.delay) {
        //this.el.style['left'] = site.px(this.pad.x); 
      }
      this.loop(this.events.loop)
    },
    noDefault: function(event){
      if(event.stopPropagation) event.stopPropagation();
      if(event.preventDefault) event.preventDefault();
      event.returnValue = false;  
      event.cancelBubble = true;  
    },
  

    ///////////////////////////////MOUSE///////////////////////////////

    mouse: {
      events: function(){
        document.on('mousemove', this.move);
        document.on('click', this.click);
        document.on('mousedown', this.mousedown);
        document.on('mouseup', this.mouseup);
        document.onselectstart = function(){return false};
        document.oncontextmenu = function(){return false};
      },
      mousedown: function(e){  
        site.container.style['background'] = '#fff';
      },  
      mouseup: function(e){  
        site.container.style['background'] = '#ddd';
      },  
      click: function(e){  
        setTimeout(function(){site.get('#mouse').textContent = 'Click'})
      },      
      move: function(e){ 
        var point = {
          x: e.pageX / site.convert,
          y: e.pageY / site.convert
        }
        site.get('#mouse').textContent = point.x.toFixed(2)+', '+point.y.toFixed(2);
      }
    },

    ///////////////////////////////TOUCH///////////////////////////////

    touch: {
      events: function(){
        this.touches = [];
        document.on('touchstart', this.move);
        document.on('touchmove', this.move);
        document.on('touchleave', this.move);
        document.on('touchend', this.move);
      },
      move: function(e){
        if(e.changedTouches && e.changedTouches.length) {
          for (var i=0; i < e.changedTouches.length; i++) {
            var point = {
              x: e.changedTouches[i].pageX / site.convert,
              y: e.changedTouches[i].pageY / site.convert
            }
            site.get('#touch').textContent = point.x.toFixed(2)+', '+point.y.toFixed(2);
          }
        }
      }
    },

    ///////////////////////////////KEYBOARD///////////////////////////////

    keyboard: {
      events: function(){
        document.on('keydown', this.down);
        document.on('keyup', this.up);
      },    
      down: function(e){
        var key = e.which || e.keyCode;
        var str = String.fromCharCode(key);
        if(str != ' ') key = str;
        switch (key) { 
          case 80: // P
            //this.pause();
            //console.log(key)
          break;
          default:
            site.get('#keyboard').textContent = key;
        };
      },
      up: function(e){
        var key = e.which || e.keyCode;
        switch (key) {
          case 37: // Left arrow
          case 65: // A          
          case 39: // Right arrow
          case 68: // D            
            //this.key = 0;
          break;          
        }
      }
    }    
  };

    ///////////////////////////////AUDIO///////////////////////////////

  site.audio = {
    list: [],
    init: function(){
      var a = site.create('audio');
      if(!a.canPlayType) this.enabled = false;
      else {
        if(a.canPlayType('audio/wav;').replace(/no/, '')) {
          this.enabled = true;
          this.format = 'wav';
        }
        if(a.canPlayType('audio/mpeg;').replace(/no/, '')) {
          this.enabled = true;
          this.format = 'mp3';
        }
      }
      if(this.enabled && this.format){
        var l = this.list;
        for (var i = 0; i < l.length; i++) {
          var name = l[i];
          this[name] = site.create('audio', {src: 'audio/'+ name +'.'+this.format});
          site.add(this[name]);          
        }
      }
    }
  };

}