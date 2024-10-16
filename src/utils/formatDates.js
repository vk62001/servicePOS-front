// recibe:2023-04-01T12:24:28.863Z
// Salida: 01/04/23 12:24:28

export function convertIsoToDateTime(isoString) {
    const date = new Date(isoString);

    const day = date.getUTCDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Los meses comienzan en 0
    const year = date.getFullYear().toString().substr(-2); // Últimos dos dígitos del año

    //const hours = date.getUTCHours().toString().padStart(2, '0');
    let hours = date.getUTCHours();
    const amPm = hours >= 12 ? 'PM' : 'AM';
  
    hours = hours % 12 || 12; // Convertir las horas al formato de 12 horas
    const hoursStr = hours.toString().padStart(2, "0");

    const minutes = date.getUTCMinutes().toString().padStart(2, '0');
    const seconds = date.getUTCSeconds().toString().padStart(2, '0');    
    return `${day}/${month}/${year} ${hoursStr}:${minutes}:${seconds} ${amPm}`;
}
