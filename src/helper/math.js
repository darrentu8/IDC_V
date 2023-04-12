export const getMaxCommonDivisor = (n1, n2) => {
    const n3 = n1 % n2
    if (n3 === 0) {
        return n2
    }
    return getMaxCommonDivisor(n2, n3)
}
