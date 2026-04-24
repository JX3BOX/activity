export function installViewport(){
    if (isMiniProgram() || isApp()) {
        const viewportMeta = document.createElement("meta");
        viewportMeta.name = "viewport";
        viewportMeta.content = "width=device-width,initial-scale=1.0, maximum-scale=1.0, user-scalable=no";
        document.head.appendChild(viewportMeta);
    }
}
