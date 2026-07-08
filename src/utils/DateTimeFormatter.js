function formatToStandard(dateTime) {
    if (!dateTime) {
        return "";
    }

    const [datePart, timePart] = dateTime.split("T");

    const [year, month, day] = datePart.split("-");
    const [hour, minute, secondWithMillis] = timePart.split(":");

    const second = secondWithMillis.split(".")[0];

    return `${hour}:${minute}:${second}  ${day}-${month}-${year}`;
}

export default formatToStandard;