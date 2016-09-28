
export default class Network {

    static ajax(url) {
        return new Promise((resolve) => {
            let xhr = new XMLHttpRequest();
            xhr.onreadystatechange = () => {
                if (xhr.readyState === XMLHttpRequest.DONE && xhr.status !== 200) {
                    throw new Error('Ajax error status' + xhr.status);

                } else if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
                    resolve(JSON.parse(xhr.responseText));
                }
            };
            xhr.ontimeout = () => {
                throw new Error('Ajax timeout');
            };
            xhr.timeout = 1000;
            xhr.open('GET', url, true);
            xhr.send(null);
        });

    }
}