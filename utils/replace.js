export const replaceSale = (sale) => {
    return sale > 10000 ? sale.replace(/\d{4}$/, 'w+') : sale
}
