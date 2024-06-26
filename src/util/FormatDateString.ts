const FormatDate = (dateInput: Date | null) => {
    if (dateInput == null) {
        return null;
    }
    //const dateString = "2024-04-29T13:21:43.000000Z";
    const date = new Date(dateInput);

    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear().toString();

    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const seconds = date.getSeconds().toString().padStart(2, "0");

    const formattedDate = `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
    return formattedDate;
}

export default FormatDate;