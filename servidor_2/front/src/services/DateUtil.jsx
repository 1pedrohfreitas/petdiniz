export function formatDateDDMMYYYYHHMMss(dateString){
    let date = dateString.split('T')[0].split('-')
    let hours = dateString.split('T')[1].split('-')[0]

    return `${date[2]}/${date[1]}/${date[0]} ${hours}`
}

export function formataDurationMin(hourString){
    let hours = `${hourString/60} h`
    let min = `0 m`
    if(hourString % 60 > 0){
        min = `${hourString % 60} m`
    }
    return `${hours} ${min}`
}