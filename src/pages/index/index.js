import "./main.css";

import '../../images/card.png';
import '../../images/card.jpg';
import '../../images/header-bg.jpg';
import '../../images/link-arrow.svg';

import '../../vendor/fonts/roboto-regular.woff';
import '../../vendor/fonts/roboto-medium.woff';
import '../../vendor/fonts/robotoslab-regular.woff';
import '../../vendor/fonts/sourcesanspro-regular.woff';

import {NewsCard} from '../../js/components/NewsCard.js';
import {NewsApi} from '../../js/modules/NewsApi.js';
import {DataStorage} from "../../js/modules/DataStorage.js";
import {NewsCardsList} from '../../js/components/NewsCardList.js';
import {SearchInput} from '../../js/components/SearchInput.js';

(function () {
  function init() {
    const form = document.news;
    const newsApi = new NewsApi();
    const dataStorage = new DataStorage();
    const newsCard = new NewsCard();
    const newsCardsList = new NewsCardsList(newsApi, dataStorage, newsCard)
    const searchInput = new SearchInput(form, newsCardsList);

    searchInput.setEventListener();
    newsCardsList.addCards();
    
  }
	document.addEventListener("DOMContentLoaded", init);
})();
