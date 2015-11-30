var component = require('./component');
require('./main.scss');

var app = document.createElement('div');
app.className = 'Test';
document.body.appendChild(app);
app.appendChild(component());
