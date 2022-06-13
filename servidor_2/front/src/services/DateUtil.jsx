export function formatDateDDMMYYYYHHMMss(dateString){
    let date = dateString.split('T')[0].split('-')
    let hours = dateString.split('T')[1].split('-')[0]

    return `${date[2]}/${date[1]}/${date[0]} ${hours.replace('Z','')}`
}

export function formataDurationMin(hourString){
    let duration = ''
    let hours = (hourString/60).toFixed(0)
    let days = (hours/24).toFixed(0)
    
    if(hourString >= 1440){
        duration = `${days} d `
    }

    if(hourString >= 60 && hourString % 1440 != 0){
        duration = duration + `${hours %24} h `
    }

    if(hourString % 60 != 0){
        duration = duration + `${hourString % 60} m`
    }

    return duration
}