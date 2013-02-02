var container = document.body.children.container;

site.create('div', {
    id: 'home',
    parent: document.body,
    style: {
      'width': '100%',
      'height': '100%',
      'position': 'relative'
    }
});

var home = document.body.children.home;

site.create('div', {
  id: 'menu',
  parent: home,
  style: {
  	'text-align': 'center'
  }
});

var menu = home.children.menu;


site.create('button', {
  id: 'back',
  className: 'grey',
  parent: menu,
  textContent: 'HOME'
});

site.create('button', {
  id: 'links',
  className: 'grey',
  parent: menu,
  textContent: 'LINKS'
});

site.create('button', {
  id: 'guides',
  className: 'grey',
  parent: menu,
  textContent: 'GUIDES'
});


site.create('button', {
  id: 'online',
  className: 'blue',
  parent: menu,
  textContent: 'ONLINE'
});

site.create('button', {
  id: 'arsenal',
  className: 'grey',
  parent: menu,
  textContent: 'ARSENAL'
});

site.create('button', {
  id: 'missions',
  className: 'grey',
  parent: menu,
  textContent: 'MISSIONS'
});


site.create('button', {
  id: 'foundry',
  className: 'grey',
  parent: menu,
  textContent: 'FOUNDRY'
});

site.create('div', {
  id: 'news',
  className: 'news_alerts',
  parent: home,
  textContent: 'News'
});

site.create('div', {
  id: 'alerts',
  className: 'news_alerts',
  parent: home,
  textContent: 'Alerts'
});

site.create('div', {
  id: 'desciption',
  className: 'grey_blue',
  parent: home,
  textContent: 'Description',
  style: {
    'position': 'absolute',
    'font': '16px "pixel"',
    'right': '50px',
    'width': '200px',
    'top': '100px',
    'display': 'none'
  }
});

site.css.addRule('.news_alerts', {
  'display': 'none',
  'text-align': 'left',
  'font': '14px "pixel"',
  'width': '200px',
  'padding': '5px',
  'margin': '20px'
});

site.system = {
  current: 'Sol',
  render: function(system){
    var home = document.body.children.home;
    site.create('div', {
      id: 'system',
      parent: home,
      style: {
        'display': 'none',
        'position': 'relative',
        'top': '200px',
        '-webkit-transform-style': 'preserve-3d'
      }
    });
    var system = home.children.system;
    var system_name = site.system.current;
    var r = 25;
    site.system.nucleus = site.create('div', {
      id: 'Nucleus',
      parent: system,
      className: 'planet',
      style: {
        'position': 'absolute',
        'margin': '0',
        'height': 2*r+'px',
        'width': 2*r+'px',
        'margin-left': (500-r)+'px',
        'top': '-15px',
        'border-radius': r+'px',
        'background-image': 'url("img/planet/Nucleus.jpg")',
        'background-size': '100% 100%',
        'box-shadow': '0px 0px 50px #fca, 0px 0px 100px #fca'
      }
    });
    var planets = site['Missions']['Systems'][system_name]['Planets'];
    var i = 0;
    for(var name in planets){ ++i;
      var planet = planets[name]; 
      var o = planet['Orbit'];
      r = planet['Radius'];
      site.create('div', {
        id: name+'_orbit',
        className: 'planet_orbit',
        parent: system,
        style:{
          'position': 'absolute',
          'width':  o+'px',
          'margin': '0px '+(1000-o)/2+'px',
          'height': r+'px'
        }
      });  
      site.create('div', {
        id: name,
        className: 'planet',
        parent: system.children[name+'_orbit'],
        style:{
          'height': (2*r)+'px',
          'width': (2*r)+'px',
          'border-radius': r+'px',
          'position': 'absolute',
          'top': (-r)+'px',
          'left': (-r)+'px',
          'background': 'url("img/planet/'+ name +'.jpg") repeat',
          'background-size': '300% 100%',
          'box-shadow': '0px 0px '+(r)+'px ' + site.css.toRGBA(planet['Color'], 0.5) + ', ' +
                        '0px -'+(r/8)+'px '+(r/4)+'px rgba(255, 255, 250, 0.4) inset, ' +
                        '0px '+(r)+'px '+(r)+'px rgba(0, 0, 15, 0.9) inset'         
        }
      });

      site.css.addRule('#'+name+'_orbit', {
        '-webkit-transform-origin-y':        '-400px',
        '-webkit-transform-style':           'preserve-3d',
        '-webkit-animation-name':            'orbitLoop',
        '-webkit-animation-duration':         i*40+'s',
        '-webkit-animation-iteration-count': 'infinite',
        '-webkit-animation-timing-function': 'linear',
        '-webkit-animation-delay': (r*-5)+'s'
      });

      site.css.addRule('#'+name, {
        '-webkit-backface-visibility':       'hidden',
        '-webkit-animation-name':            'planetLoop, bkgLoop',
        '-webkit-animation-duration':         i*40+'s, 200s',
        '-webkit-animation-iteration-count': 'infinite',
        '-webkit-animation-timing-function': 'linear',
        '-webkit-animation-delay': (r*-5)+'s'
      }); 

      site.css.addRule('#'+name+':hover', {
          'box-shadow': '0px 0px '+(r)+'px white, ' +
                        '0px -'+(r/8)+'px '+(r/4)+'px rgba(255, 255, 250, 0.4) inset, ' +
                        '0px '+(r)+'px '+(r)+'px rgba(0, 0, 0, 0.8) inset' 
      });
    }
  }
};

site.system.render(site.system.current);

site.css.animation.add([

  '@-webkit-keyframes orbitLoop {',
  '  from { -webkit-transform: perspective(1000px) rotateY(0deg);}',
  '  to   { -webkit-transform: perspective(1000px) rotateY(360deg); }',
  '}',

  '@-webkit-keyframes planetLoop {',
  '  from { -webkit-transform: rotateY(0deg) rotateZ(-90deg);}',
  '  to   { -webkit-transform: rotateY(-360deg) rotateZ(-450deg); }',
  '}'].join('\n')
);

site.css.animation.add([
  '@-webkit-keyframes bkgLoop {',
  '  from { background-position: 0 0, }',
  '  to   { background-position: 1200px 0; }',
  '}'].join('\n'),
  'noscale'
);

site.css.addRule('html',{
  'background': 'black',
  'background-image': 'url("img/space-bkg.jpg")',
  '-webkit-animation': 'bkgLoop 60s linear infinite'
});