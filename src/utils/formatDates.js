// recibe:2023-04-01T12:24:28.863Z
// Salida: 01/04/23 12:24:28

export function convertIsoToDateTime(isoString) {
    const date = new Date(isoString);

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = String(date.getFullYear()).slice(-2);
    const hours = date.getHours() % 12 || 12;
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    const ampm = date.getHours() >= 12 ? 'PM' : 'AM';
  
    return `${day}/${month}/${year} ${hours}:${minutes}:${seconds} ${ampm}`;
  
}
