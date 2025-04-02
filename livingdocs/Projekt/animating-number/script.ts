import ArticleLoader from 'nswow/ArticleLoader';

export default class extends ArticleLoader {
  _create() {
    this.itemsBig = this.element.querySelectorAll('.srlp-animating-number-big-number');
    this.itemsSmall = this.element.querySelectorAll('.srlp-animating-number-small-number');

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          this.animateNumber(entry.target);
        }
      });
    }, { threshold: 0.5 }); // 50% des Elements muss sichtbar sein

    this.itemsBig.forEach(itemBig => this.observer.observe(itemBig));
    this.itemsSmall.forEach(itemSmall => this.observer.observe(itemSmall));
  }

  animateNumber(element) {
    let targetValue = element.textContent.replace(',', '.'); // Komma durch Punkt ersetzen
    let targetNumber = parseFloat(targetValue);
    if (isNaN(targetNumber)) return;

    let hasDecimals = targetValue.includes('.') || targetValue.includes(',');
    let targetString = hasDecimals ? targetNumber.toString().replace('.', ',') : targetNumber.toFixed(0);

    let randomOffset = (Math.random() * 10 - 5);
    let startNumber = targetNumber + randomOffset;
    let startTime = null;
    let duration = 1000; // Dauer der Animation in ms

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      let elapsed = timestamp - startTime;
      let progress = Math.min(elapsed / duration, 1);

      let currentNumber = startNumber + (targetNumber - startNumber) * progress;
      let animatedString = hasDecimals ? currentNumber.toFixed(2).replace('.', ',') : Math.round(currentNumber);

      element.textContent = animatedString;

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        element.textContent = targetString; // Endwert sicherstellen
      }
    };

    requestAnimationFrame(animate);
  }
}
