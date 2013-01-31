site.css.init({
  'width': 1000,
  'height': 750,
  'min-scale': 0.5
});

site.css.addRule('html',{
  'background': 'black',
  'color': 'white',
  'width': '100%',
  'height': '100%'
});

site.css.addRule('body',{
  'margin': '1px auto',
  'width': '998px',
  'height': '748px',
  'font-family': '"Lucida Grande", "Lucida Sans Unicode", Helvetica, Arial, Verdana, sans-serif',
});

site.css.addRule('button', {
  'color': 'white',
  'margin':  '5px',
  'text-shadow': '3px 2px black',
  'cursor': 'pointer'
});
site.css.addRule('button[DISABLED]', {
  'cursor': 'default'
});

/* BLUE */
var color1 = '#0b479c',
    color2 = '#109be6',
    color3 = '#47d4ff',
    color4 = 'rgba( 15, 155, 235, 0.9)';
site.css.addRule('.blue', {
  'font': '21px/22px sans-serif',
  'background-color': color2,
  'box-shadow':  '0px 0px 45px ' + color4 + ',' +
                 '0px -15px 35px ' + color1 + ' inset,'+ 
                 '0px 2px 6px ' + color3 + ' inset',
  'border-radius': '10px',
  'padding': '8px',
  'margin': '16px',
  'width': '200px',
});
site.css.addRule('.blue', {
  'border': '2px solid ' + color4 
}, 'fixscale');

site.css.addRule('.blue[DISABLED]', {
  'color': '#ccc',
});
site.css.addRule('.blue:hover:not([DISABLED])', {
  'background-color': color2,
  'box-shadow': '0px 0px 60px ' + color4 + ',' +
                '0px -5px 25px ' + color1 + ' inset,' +
                '0px 2px 8px white inset',
});

site.css.addRule('.blue:active:not([DISABLED])', {
  'background-color': color1,
  'box-shadow': '0px 10px 45px ' + color1 + ',' +
                '0px 30px 35px ' + color2 + ' inset,' +
                '0px 0px 2px ' + color3 + ' inset',
  'text-shadow': '-3px -2px black'
});

/* GREY */
color1 = '#0c0d0a',
color2 = '#404242',
color3 = '#676767',
color4 = 'rgba( 61, 66, 66, 0.9)';

site.css.addRule('.grey', {
  'font': '15px/16px sans-serif',
  'color': '#ddd',
  'background-color': color2,
  'box-shadow':  '0px 0px 45px ' + color4 + ',' +
                 '0px -5px 25px ' + color1 + ' inset,'+ 
                 '0px 2px 6px ' + color3 + ' inset',
  'border-radius': '6px',
  'padding': '6px',
  'width': '100px',
});
site.css.addRule('.grey', {
  'border': '2px solid ' + color4 
}, 'fixscale');

site.css.addRule('.grey[DISABLED]', {
  'color': '#ccc',
});
site.css.addRule('.grey:hover:not([DISABLED])', {
  'background-color': color2,
  'box-shadow': '0px 0px 45px ' + color4 + ',' +
                '0px -5px 25px ' + color1 + ' inset,' +
                '0px 0px 6px white inset',
});

site.css.addRule('.grey:active:not([DISABLED])', {
  'background-color': color1,
  'box-shadow': '0px 10px 45px ' + color1 + ',' +
                '0px 30px 35px ' + color3 + ' inset,' +
                '0px 0px 2px ' + color4 + ' inset',
  'text-shadow': '-3px -2px black'
});

site.css.addRule('.grey_blue', {
  'background' : 'rgba(30, 30, 30, 0.75)',
  'box-shadow': '0 0 0 4px black,'+
                '0 0 0 5px #1a9ce8',
  'border': '1px solid #444',
  'border-radius': '5px',
  'padding': '5px'
}, 'fixscale');



