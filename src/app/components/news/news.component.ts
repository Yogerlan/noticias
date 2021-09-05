import { Component, Input, OnInit } from '@angular/core';

import { Article } from '../../interfaces/interfaces';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss'],
})
export class NewsComponent implements OnInit {

  @Input() articles: Article[] = [];
  @Input() onFavorites = false;

  constructor() { }

  ngOnInit() {}

}
