import { Injectable } from '@angular/core';

import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { ToastController } from '@ionic/angular';

import { Article } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class LocalDataService {

  articles: Article[] = [];

  constructor( private nativeStorage: NativeStorage, private toastController: ToastController ) {
    this.loadFavorites();
  }

  async presentToast( message: string ) {
    const toast = await this.toastController.create({
      message,
      duration: 1500
    });
    toast.present();
  }

  saveArticle( article: Article ) {
    const exists = this.articles.find(art => art.title === article.title);
    if (!exists) {
      this.articles.unshift(article);
      this.nativeStorage.setItem('favorites', this.articles);
      this.presentToast('Added to Favorites');
    }
  }

  removeArticle( article: Article ) {
    this.articles = this.articles.filter(art => art.title !== article.title);
    this.nativeStorage.setItem('favorites', this.articles);
    this.presentToast('Removed from Favorites');
  }

  async loadFavorites() {
    const favorites = await this.nativeStorage.getItem('favorites');
    if ( favorites ) {
      this.articles = favorites;
    }
  }
}
