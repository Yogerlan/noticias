import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { IonSegment } from '@ionic/angular';

import { NewsService } from '../../services/news.service';
import { Article } from '../../interfaces/interfaces';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit, AfterViewInit {

  @ViewChild(IonSegment) segment: IonSegment;
  categories = ['business', 'entertainment', 'general', 'health', 'science', 'sports', 'technology'];

  articles: Article[] = [];

  constructor( private news: NewsService ) {}

  ngOnInit() {
    this.loadCategoryArticles(this.categories[0]);
  }

  ngAfterViewInit() {
    this.segment.value = this.categories[0];
  }

  changeCategory( event ) {
    this.articles = [];
    this.loadCategoryArticles(event.detail.value);
  }

  loadCategoryArticlesPage( event ) {
    this.loadCategoryArticles(this.segment.value, event);
  }

  loadCategoryArticles( category: string, event? ) {
    this.news.getTopHeadlinesCategory(category)
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
