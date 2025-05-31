export class FileUtility {
    static async asDataURL(file) {
        return new Promise((resolve) => {
            const fileReader = new FileReader();
            fileReader.onloadend = () => resolve(fileReader.result);
            fileReader.readAsDataURL(file);
        });
    }
}
