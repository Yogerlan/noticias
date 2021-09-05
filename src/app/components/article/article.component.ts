import { Component, Input, OnInit } from '@angular/core';

import { ActionSheetController, ToastController } from '@ionic/angular';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';

import { Article } from '../../interfaces/interfaces';
import { LocalDataService } from 'src/app/services/local-data.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
})
export class ArticleComponent implements OnInit {

  @Input() article: Article = null;
  @Input() index: Number = 0;
  @Input() onFavorites: Boolean;

  constructor(
    private iab: InAppBrowser,
    private socialSharing: SocialSharing,
    private actionSheetController: ActionSheetController,
    private localDataService: LocalDataService
  ) { }

  ngOnInit() {}

  openArticle() {
    const browser = this.iab.create(this.article.url, '_system');
  }

  async showMenu() {
    const favoriteButton = this.onFavorites ?
      {
        text: 'Remove',
        icon: 'trash',
        cssClass: 'action-dark',
        handler: async () => {
          // console.log('Remove clicked!');
          this.localDataService.removeArticle(this.article);
        }
      } : {
        text: 'Favorite',
        icon: 'star',
        cssClass: 'action-dark',
        handler: async () => {
          // console.log('Favorite clicked!');
          this.localDataService.saveArticle(this.article);
        }
      };
    const actionSheet = await this.actionSheetController.create({
      buttons: [
        {
          text: 'Share',
          icon: 'share-social',
          cssClass: 'action-dark',
          handler: () => {
            // console.log('Share clicked!');
            this.socialSharing.share(
              this.article.title,
              this.article.source.name,
              '',
              this.article.url
            )
          }
        }, favoriteButton, {
          text: 'Cancel',
          icon: 'close',
          role: 'cancel',
          cssClass: 'action-dark',
          handler: () => {
            // console.log('Cancel clicked!');
          }
        }
      ]
    });

    await actionSheet.present();
  }

}
