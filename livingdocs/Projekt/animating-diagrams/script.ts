import ArticleLoader from 'nswow/ArticleLoader';

export default class extends ArticleLoader {
  _create() {
    let items = this.element.querySelectorAll('.diagram-col');



    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.animateBars(entry.target);
          observer.unobserve(entry.target); // Beobachtung beenden, um unnötige Berechnungen zu vermeiden
        }
      });
    }, { threshold: 0.3 }); // Startet Animation, wenn 30% sichtbar sind

    items.forEach(item => observer.observe(item));
  }

  animateBars(item) {
    let itemValueArea = item.querySelector('.value-area');
    let itemValueAreaSize = item.querySelector('.diagram-value-number')?.textContent.trim();

    if (itemValueArea && itemValueAreaSize && !isNaN(itemValueAreaSize)) {
      let targetHeight = parseFloat(itemValueAreaSize);
      let currentHeight = 0;

      const animate = () => {
        currentHeight += (targetHeight - currentHeight) * 0.1; // Sanfte Interpolation
        itemValueArea.style.height = `${currentHeight}%`;

        if (Math.abs(currentHeight - targetHeight) > 0.5) {
          requestAnimationFrame(animate);
        } else {
          itemValueArea.style.height = `${targetHeight}%`; // Finale Korrektur
        }
      };

      requestAnimationFrame(animate);
    }
  }
}
