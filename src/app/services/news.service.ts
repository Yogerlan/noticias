import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

// import { HTTP } from '@ionic-native/http/ngx';

import { TopHeadlinesResponse } from '../interfaces/interfaces';
import { environment } from '../../environments/environment';

const apiKey = environment.apiKey;
const apiUrl = environment.apiUrl;

// const params = {}
// const headers = {
//   'X-Api-Key': apiKey
// }
const headers = new HttpHeaders({
  'X-Api-Key': apiKey
});

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  topHeadlinesPage = 0;
  currentCategory = '';
  currentCategoryPage = 0;

  constructor(
    // private http: HTTP
    private http: HttpClient
  ) { }

  private executeQuery<T>( query: string ) {
    const apiUri = apiUrl + query;
    return this.http.get<T>(apiUri, { headers });
    // const response = await this.http.get(apiUri, params, headers);
    // console.log(response);
    // if (response.status === 200) {
    //   return JSON.parse(response.data);
    // } else {
    //   return [];
    // }
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
