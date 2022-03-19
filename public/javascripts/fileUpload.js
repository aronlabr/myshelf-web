const rootStyles = window.getComputedStyle(document.documentElement)

if (rootStyles.getPropertyValue('--book-cover-width-large') != null &&
    rootStyles.getPropertyValue('--book-cover-width-large') != '') {
    ready()
} else {
    window.addEventlistener('load', ready)
}
function ready() {
    const coverwidth = parseFloat(rootStyles.getPropertyValue('--book-cover-width-large'))
    const coverAspectRatio = parseFloat(rootStyles.getPropertyValue('--book-cover-aspect-ratio'))
    const coverHeight = coverwidth / coverAspectRatio

    FilePond.registerPlugin(
        FilePondPluginImagePreview,
        FilePondPluginImageResize,
        FilePondPluginFileEncode,
    )

    FilePond.setOptions({
        stylePanelAspectRatio: 1 / coverAspectRatio,
        imageResizeTargetWidth: coverwidth,
        imageResizeTargetHeight: coverHeight,
    })
    FilePond.parse(document.body)
}