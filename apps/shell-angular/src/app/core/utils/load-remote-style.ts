export function loadRemoteStyle(url: string): void {
    const exists = document.querySelector(
        `link[data-remote-style="${url}"]`
    );

    if (exists) {
        return;
    }

    const link = document.createElement('link');

    link.rel = 'stylesheet';
    link.href = url;
    link.setAttribute('data-remote-style', url);

    document.head.appendChild(link);
}