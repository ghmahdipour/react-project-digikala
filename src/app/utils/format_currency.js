export default function format_currency(val1, val2, toman_part){
    let num
    let num1
    let num2

    if(val1 !== undefined){
        num = Number(Math.floor(val1 / 10))
        num1 = num > 9 ? String(num) : ''
    }
    if(val2 !== undefined){
        num = Number(Math.floor(val2 / 10))
        num2 = num > 9 ? String(num) : ''
    }

    let is_pecent
    let calculate_percent = false

    if( val1 !== undefined && val2 !== undefined ){
        num1 = Number(Math.floor(val1 / 10))
        num2 = Number(Math.floor(val2 / 10))
        calculate_percent = true
        is_pecent = Math.floor(Math.floor((num1 - num2) / Math.floor(num1 / 1000)) / 10)   
    }
    
    if(calculate_percent){
        return "%" + Number (is_pecent.toFixed(1)).toLocaleString() + " ";
    } else if( num2 && num2 !== undefined && toman_part)
        return num2.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') + ' تومان ' + ''
    else if(num1 && num1 !== undefined)  
        return num1.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}