import { Component, OnInit } from '@angular/core';

import { NewsService } from '../../services/news.service';
import { Article } from '../../interfaces/interfaces';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  articles: Article[] = [];

  constructor( private news: NewsService ) {}

  ngOnInit() {
    this.loadArticles();
  }

  loadArticlesPage( event ) {
    this.loadArticles( event );
  }

  loadArticles( event? ) {
    // this.news.getTopHeadlines().then( resp => {
    //   // console.log('Noticias', resp);
    //   if (resp.articles.length === 0) {
    //     if (event) {
    //       event.target.disabled = true;
    //     }
    //   } else {
    //     this.articles.push(...resp.articles);
    //   }
    //   if (event) {
    //     event.target.complete();
    //   }
    // });
    this.news.getTopHeadlines()
      .subscribe( resp => {
        // console.log('Noticias', resp);
        if (resp.articles.length === 0) {
          if (event) {
            event.target.disabled = true;
          }
        } else {
          this.articles.push(...resp.articles);
        }
        if (event) {
          event.target.complete();
        }
      });
  }

}
