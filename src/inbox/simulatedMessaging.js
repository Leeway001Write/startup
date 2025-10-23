export function simulateMessages(callback) {
    let message = 1;

    const intervalId = setInterval(() => {
        callback(
            {
                sender: "Sender number " + message,
                content: "Message number " + message,
                isUnread: true
            }
        );
        message++;
    }, 5000);

    return () => clearInterval(intervalId); // Returns function to terminate interval
}