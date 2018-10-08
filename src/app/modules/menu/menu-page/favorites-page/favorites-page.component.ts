import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../../../services/auth/auth.service';
import {User} from '../../../../models/user.model';

@Component({
  selector: 'app-favorites-page',
  templateUrl: './favorites-page.component.html',
  styleUrls: ['./favorites-page.component.scss']
})
export class FavoritesPageComponent implements OnInit {
  public isLoading = true;
  public favorites: any[];
  public user: User;
  public hasFavorites: boolean;
  public variant: string
  constructor(private auth: AuthService) { }

  ngOnInit() {
    this.user = new User();
    this.auth.user.subscribe(user => {
      this.user = user;
      this.isLoading = false;
      this.hasFavorites = this.user.favorites.length > 0;
    });
    this.variant = 'favorite';
  }

  private initFavorites() {
    if (!this.user.favorites) {
      this.user.favorites = [];
    }
    this.favorites = this.user.favorites;
  }

}
