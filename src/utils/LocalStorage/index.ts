export const localStorageMethod = {
    set(name: string, data) {
        localStorage.setItem(name, JSON.stringify(data));
    },
    get(name: string) {
        return JSON.parse(localStorage.getItem(name)!);
    },
};
