app.component('accessibility-controls', {
    template: $TEMPLATES['accessibility-controls'],
    emits: [],

    setup(props, { slots }) {
        const hasSlot = name => !!slots[name]
        return { hasSlot }
    },

    data() {
        return {
            minTamanhoFont: 8,
            maxTamanhoFont: 30,
            elements: "p, span, li, h1, h2, h3, h4, h5, h6, a",
            _originalFontSizes: [],
            open: false
        }
    },
    mounted() {
        this.originalFontSizes();
    },

    methods: {
        toggleCrontols() {
            this.open = !this.open;
        },
        ajustContrast() {
            document.body.classList.toggle("pojo-a11y-negative-contrast");
        },
        adjustFontSize(change) {
            const elements = document.querySelectorAll(this.elements);
            elements.forEach(el => {
                let fontSize = window.getComputedStyle(el).fontSize;
                fontSize = parseInt(fontSize) + change;
                if (fontSize >= this.minTamanhoFont && fontSize <= this.maxTamanhoFont) {
                    el.style.fontSize = fontSize + "px";
                }
                if (fontSize > 19 && el.tagName.toLowerCase() === "p") {
                    el.style.lineHeight = 1.2;
                } else if (el.tagName.toLowerCase() === "p") {
                    el.style.lineHeight = "";
                }
            });
        },
        ajustFontPlus() {
            this.adjustFontSize(1);
        },
        adjustFontMinus() {
            this.adjustFontSize(-1);
        },
        originalFontSizes() {
            const elements = document.querySelectorAll(this.elements);
            elements.forEach(el => {
                this._originalFontSizes.push({
                    element: el,
                    fontSize: window.getComputedStyle(el).fontSize,
                    lineHeight: window.getComputedStyle(el).lineHeight
                });
            });
        },
        resetFontSize() {
            this.ajustContrast();
            
            this._originalFontSizes.forEach(item => {
                item.element.style.fontSize = item.fontSize;
                item.element.style.lineHeight = item.lineHeight;
            });
        }

    }
});
