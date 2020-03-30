import "./about.css";
import '../../vendor/fonts/roboto-regular.woff';
import '../../vendor/fonts/roboto-medium.woff';
import '../../vendor/fonts/robotoslab-regular.woff';
import '../../vendor/fonts/sourcesanspro-regular.woff';
import '../../images/link-arrow.svg';
import '../../images/slider-arrow.svg';

import Glide from '@glidejs/glide'


(function () {
  function init() {

    const glide = new Glide('.glide', {
      classes: {
        activeNav: 'glide__bullet_active'
      },
      type: 'carousel',
      perView: 3,
      peek: 88,
      focusAt: 'center',
      breakpoints: {
        995: {
          perView: 2,
          peek: 40
        },
        767: {
          perView: 1,
          peek: 0
        }
      }
    })
    glide.mount()
    }
  document.addEventListener("DOMContentLoaded", init);
})();
