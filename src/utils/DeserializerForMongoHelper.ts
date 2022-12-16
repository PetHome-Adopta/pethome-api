

export async function DeserializerForMongoOptions(data) {

    const objectToReturn = {};

    for (let row of Object.keys(data)) {
        // Primero revisamos los que son tipos anidados (GET y UPDATE)
        if (data[row] != null && typeof (data[row]) === "object") {
            objectToReturn[row] = {}; // Inicializa como objeto
            // Empieza a buscar los valores
            for (let values of Object.keys(data[row])) {
                if (data[row][values] !== undefined) {
                    objectToReturn[row][values] = data[row][values];
                }
            }
        } else {
            // En caso de no serlo miramos los tipos basicos (POST y DELETE)
            if(data[row] !== undefined) {
                objectToReturn[row] = data[row];
            }
        }
    }

    return objectToReturn;
}