import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';

import { NewsComponent } from './news/news.component';
import { ArticleComponent } from './article/article.component';

@NgModule({
  declarations: [NewsComponent, ArticleComponent],
  imports: [CommonModule, IonicModule],
  exports: [NewsComponent]
})
export class ComponentsModule { }
