import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { TopHeadlinesResponse } from '../interfaces/interfaces';
import { environment } from '../../environments/environment';

const apiKey = environment.apiKey;
const apiUrl = environment.apiUrl;

const headers = new HttpHeaders({
  'X-Api-key': apiKey
});

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  topHeadlinesPage = 0;
  currentCategory = '';
  currentCategoryPage = 0;

  constructor( private http: HttpClient ) { }

  private executeQuery<T>( apiQuery: string ) {
    const apiUri = apiUrl + apiQuery;
    return this.http.get<T>(apiUri, { headers })
  }

  getTopHeadlines() {
    this.topHeadlinesPage++;
    return this.executeQuery<TopHeadlinesResponse>(`/top-headlines?country=us&page=${this.topHeadlinesPage}`);
  }

  getTopHeadlinesCategory( category: string ) {
    if (this.currentCategory === category) {
      this.currentCategoryPage++;
    } else {
      this.currentCategoryPage = 1;
      this.currentCategory = category;
    }
    return this.executeQuery<TopHeadlinesResponse>(`/top-headlines?country=us&category=${category}&page=${this.currentCategoryPage}`);
  }

}
