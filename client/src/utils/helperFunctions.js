// format date to dd/mm/yyyy
export const dateFormat = (date)=>{
    let dateString = String(date)
    let [dateYear, dateDay, dateMonth] = dateString.split('-');
    let formattedDate = `${dateDay}/${dateMonth}/${dateYear}`;
    return formattedDate
}