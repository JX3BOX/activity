import KatexAutoRender from 'katex/dist/contrib/auto-render'
import 'katex/dist/katex.min.css';

const defaultOptions = {
    delimiters: [
        { left: "$$", right: "$$", display: true },
        { left: "$", right: "$", display: false },
        { left: "\\(", right: "\\)", display: false },
        { left: "\\[", right: "\\]", display: true }
    ]
};

const render = (el, binding) => {
    let options = defaultOptions;
    if (binding.value) {
        options = { ...defaultOptions, ...binding.value };
    }
    el.style.position = 'relative';
    KatexAutoRender(el, options);
}

export default {
    mounted(el, binding) {
        render(el, binding);
    },
    updated(el, binding) {
        render(el, binding);
    }
}
