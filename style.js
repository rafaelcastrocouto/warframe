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

site.css.addRule('.button', {
  'color': 'white',
  'cursor': 'pointer',
  'vertical-align': 'middle'
});
site.css.addRule('button[DISABLED]', {
  'cursor': 'default'
});

/* BLUE */
site.css.addRule('.blue', {
  'font': '21px sans-serif',
  'text-shadow': '0px 2px 0px rgba(0,0,0,0.4)',
  'background': '#308cca',
  'background-image': '-webkit-linear-gradient(top,#169af7,#0c56ab)',
  'box-shadow':  '0px 0px 15px 0px rgba(0,153,255,1), inset 0px 1px 0px rgba(255,255,255,0.5)',
  'padding': '6px',
  'margin': '12px',
  'width': '200px',
  'display': 'inline-block'
});
site.css.addRule('.blue', {
  'border-radius': '4px',
  'border': '1px solid #4eb3f2' 
}, 'fixscale');

site.css.addRule('.blue[DISABLED]', {
  'color': '#ccc',
});
site.css.addRule('.blue:hover:not([DISABLED])', {
  'box-shadow':  '0px 0px 25px 0px rgba(50,203,255,1), inset 0px 5px 25px rgba(255,255,255,0.5)'
});

site.css.addRule('.blue:active:not([DISABLED])', {
  'box-shadow':  '0px 0px 15px 0px rgba(0,153,255,1), inset 0px 1px 0px rgba(255,255,255,0.5)',
  'text-shadow': '-3px -2px rgba(0,0,0,0.4)'
});

/* GREY */
site.css.addRule('.grey', {
  'font': '16px sans-serif',
  'text-shadow': '0px 2px 0px rgba(0,0,0,0.4)',
  'background': '#cacaca',
  'background-image': '-webkit-linear-gradient(top,#444,#111)',
  'padding': '6px',
  'margin': '4px',
  'width': '100px',
  'display': 'inline-block'
});
site.css.addRule('.grey', {
  'border-radius': '4px',
  'border': '1px solid #666' 
}, 'fixscale');

site.css.addRule('.grey[DISABLED]', {
  'color': '#ccc',
});
site.css.addRule('.grey:hover:not([DISABLED])', {
  'box-shadow':  '0px 0px 25px 0px rgba(100,100,100,1), inset 0px 5px 25px rgba(255,255,255,0.3)'
});

site.css.addRule('.grey:active:not([DISABLED])', {
  'box-shadow':  '0px 0px 10px rgba(255,255,255,0.4)',
  'text-shadow': '-3px -2px rgba(0,0,0,0.4)'
});

site.css.addRule('.grey_blue', {
  'background' : 'rgba(30, 30, 30, 0.75)',
  'box-shadow': '0 0 0 4px black,'+
                '0 0 0 5px #1a9ce8',
  'border': '1px solid #444',
  'border-radius': '4px',
  'padding': '5px'
}, 'fixscale');



