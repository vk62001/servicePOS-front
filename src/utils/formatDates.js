// recibe:2023-04-01T12:24:28.863Z
// Salida: 01/04/23 12:24:28

export function convertIsoToDateTime(isoString) {
    const date = new Date(isoString);

    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Los meses comienzan en 0
    const year = date.getFullYear().toString().substr(-2); // Últimos dos dígitos del año

    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');

    return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
}
