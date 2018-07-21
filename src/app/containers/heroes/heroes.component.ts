import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { Store, select } from '@ngrx/store';

import { Observable } from 'rxjs';

import { Hero } from '@appModels/hero';

import { DeleteHero, AddHero } from '@appStore/actions/hero.actions';
import { EntityServices, EntityCollectionService } from 'ngrx-data';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeroesComponent implements OnInit {
  heroes$: Observable<Hero[]>;
  heroesService: EntityCollectionService<Hero>;

  constructor(entityServices: EntityServices) {
    this.heroesService = entityServices.getEntityCollectionService('Hero');
  }

  ngOnInit() {
    this.heroes$ = this.heroesService.entities$;
    this.heroesService.getAll();
  }

  add(name: string): void {
    name = name.trim();
    if (!name) {
      return;
    }

    this.heroesService.add({ name } as Hero);
  }

  delete(hero: Hero): void {
    this.heroesService.delete(hero);
  }
}
