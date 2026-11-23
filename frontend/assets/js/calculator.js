/* Калькулятор ориентировочной стоимости поездки для каталога MELLDRIVE */
export function calculateTripCost({ minutes = 30, hours = 0, days = 0, pricePerMin = 12, pricePerDay = 2500, extraCasco = false }) {
    const safeMin = Math.max(0, Number(minutes) || 0);
    const safeHours = Math.max(0, Number(hours) || 0);
    const safeDays = Math.max(0, Number(days) || 0);

    let total = safeDays * Number(pricePerDay) + safeHours * (Number(pricePerMin) * 45) + safeMin * Number(pricePerMin);
    if (extraCasco && total > 0) {
        total += 490;
    }
    return Math.round(total);
}
