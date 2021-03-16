export const countNumbers = (duration = 2000, from = 0, to = 0, delay = 500) => {
    return {
        config: { duration: duration ? duration : 2000 },
        number: to,
        from: { number: from },
        delay: delay === 0 ? 0 : 500
    }
}