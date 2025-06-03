export function UTCNow() {
    const date = new Date();
    let utcDate = `${date.getUTCFullYear()}-${date.getUTCMonth()}-${date.getUTCDay()} ${date.getUTCHours()}:${date.getUTCMinutes()}:${date.getUTCSeconds()}.${date.getUTCMilliseconds()} UTC`
    return utcDate;
}