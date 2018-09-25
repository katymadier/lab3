import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css'],
})

export class HeroesComponent implements OnInit {
  heroes: Hero[]
  // help from scotch.io tutorial https://scotch.io/tutorials/upgrade-angularjs-sorting-filters-to-angular
  sortType: string;
  sortReverse: boolean = false;
  helperSort(property) {
    return function (a, b) {
        let result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
        return result;
    };
  };
  sortButton(property) {
    this.sortType = property;
    this.sortReverse = !this.sortReverse;
    this.heroes.sort(this.helperSort(property));
    if (property == "name") {
      document.getElementById('name-btn').style.display='none';
      document.getElementById('id-btn').style.display='block';
    }
    else {
      document.getElementById('name-btn').style.display='block';
      document.getElementById('id-btn').style.display='none';
    }
  };

  hero: Hero = {
    id: 1,
    name: 'Windstorm'
  };


  constructor(private heroService: HeroService) { }

  ngOnInit() {
    this.getHeroes();
  }
  getHeroes(): void {
    this.heroService.getHeroes()
        .subscribe(heroes => this.heroes = heroes);
  }

}
