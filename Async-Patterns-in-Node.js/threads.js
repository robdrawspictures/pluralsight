const { Worker, isMainThread, parentPort, workerData } = require('worker_threads');

if(isMainThread) {

    console.log('Starting the main thread.');

    const worker = new Worker(__filename, {
        workerData: {
            outputPrefix: 'Received message',
            timeToWaste: 500
        }
    });

    worker.on('message', (msg) => {
        console.log(`DIO: ${msg}`);
    });

    worker.postMessage('Yare yare daze.');

    console.log('Still in the main thread.');

} else {

    parentPort.on('message', (msg) => {
        console.log(`${workerData.outputPrefix}: ${msg}`);
    });

    parentPort.postMessage('ZA WARUDO!!!');
    wasteTime(workerData.timeToWaste);
    parentPort.postMessage('How fast can you move within the stopped time, Jotaro?');
    wasteTime(workerData.timeToWaste);
    parentPort.postMessage('4 seconds is my current limit!');

}



function wasteTime(delay) {
    const end = Date.now() + delay;
    while (Date.now() < end) {}
}
