let Watcher = require('./watcher');
let { stdout } = process;

let data = Watcher({ time: 0 }, render);

function render () {
    stdout.write(`\rTime Elapsed: ${data.time}`);
}

setInterval(() => {
    data.time++;
}, 1000);