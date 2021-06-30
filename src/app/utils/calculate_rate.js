export default function calculate_rate(rate){
    let num = isNaN(rate) ? Number(rate) : rate
    let val = (num * 5) / 100 
    if(Number(val) === val && val % 1 !== 0){
        let fix_number = val.toFixed(1)
        let result_rate = Number(fix_number / 1) === fix_number / 1 && (fix_number / 1) % 1 === 0 ? fix_number / 1 : fix_number 
        return result_rate
    }
    return val
}