import "./analytics.css";
import '../../vendor/fonts/roboto-regular.woff';
import '../../vendor/fonts/roboto-medium.woff';
import '../../vendor/fonts/robotoslab-regular.woff';
import '../../vendor/fonts/sourcesanspro-regular.woff';


import {DataStorage} from "../../js/modules/DataStorage.js";
import {Statistics} from '../../js/components/Statistics.js';

(function() {
  function init() {
    const dataStorage = new DataStorage();
    const statistics = new Statistics();
    statistics.addStatistic(dataStorage);
  }
  document.addEventListener("DOMContentLoaded", init);
})();
