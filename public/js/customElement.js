class Card extends HTMLElement {
    render() {
        const word = this.getAttribute('word');
    
        this.innerHTML = `<div>${word}</div>`;
    }
    
    connectedCallback() {
        if (!this.rendered) {
            this.render();
            this.rendered = true;
        }
    }
}
  
customElements.define('custom-card', Card);