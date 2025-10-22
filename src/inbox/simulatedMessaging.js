export function simulateMessages(callback) {
    let message = "Hello World!";

    const intervalId = setInterval(() => {
        callback(message);
    }, 5000);

    return () => clearInterval(intervalId);
}