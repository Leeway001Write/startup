export function simulateMessages(callback) {
    var message = 1;

    const intervalId = setInterval(() => {
        callback(`Message: ${message}`);
        message++;
    }, 5000);

    return () => clearInterval(intervalId); // Returns function to terminate interval
}