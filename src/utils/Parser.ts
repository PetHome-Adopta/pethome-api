

export async function JSONParser(data: any) {
    try {
        return await JSON.parse(data);
    }catch {
        return data;
    }
}