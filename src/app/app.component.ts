import { Component } from '@angular/core';
import {HerointerfaceService} from "./services/herointerface.service";
import {HeroInterface} from "./data/heroInterface";
import {first, Observable, Subscription} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'Duel of Trolls';

  hero?: HeroInterface;
  heroes: HeroInterface[] = [];
  heroesAysnc?: Observable<HeroInterface[]>;

  subscriptionGetHeroes?: Subscription;

  constructor(private heroService: HerointerfaceService) {
  }

  ngOnInit(): void {
    console.log("Init heroes component");
    this.getHeroes();
  }

  getHeroes(): void {

    // Subscription "simple"
    this.subscriptionGetHeroes = this.heroService.getHeroes()
      .subscribe(heroes => this.heroes = heroes);

    // Subscription avec les 3 callbacks : next, error et complete
    // this.subscriptionGetHeroes = this.heroService.getHeroes()
    //   .subscribe({
    //     next: (heroes) => {
    //       console.log('Observable de getHeroes() : mise à jour de la liste');
    //       this.heroes = heroes;
    //     },
    //     error: (err: Error) => {
    //       console.error('Observable de getHeroes() : erreurs - ' + err);
    //     },
    //     complete: () => {
    //       console.log('Observable de getHeroes() : complete');
    //     },
    //   });

    this.heroesAysnc = this.heroService.getHeroes();
  }

  getHero(id: string) {

    this.heroService.getHero(id).pipe(first())
      .subscribe(hero => {
        this.hero = hero;
        console.log("getHero by id : " + id);
        console.log("résultat : " + hero);
      });
  }

  deleteHero() {
    if (this.hero && this.hero.id) {
      this.heroService.deleteHero(this.hero.id).then(() => {
          this.hero = undefined;
          console.log("Suppression du hero");
      })
          .catch((error) => console.log("Problème lors de la suppression du hero"));
    }
  }

  newHero() {
    let hero: HeroInterface = {id: "", name: "Doe", attaque: 10, esquive: 10, degats: 10, PV: 10, skin: "balanced_troll", weaponId: ""};
    this.heroService.addHero(hero);
  }

  modifyHero() {
    if (this.hero && this.hero.id) {
      this.hero.attaque = this.hero.attaque + 10;
      this.hero.esquive = this.hero.esquive + 10;
      this.heroService.updateHero(this.hero);
    }
  }

  // Désabonnement de l'observable
  unsubscribeGetHeroes(): void {
    this.subscriptionGetHeroes?.unsubscribe();
  }

  /**
   * The ngDestroy is called in a component’s lifecycle just before the instance of the component is finally destroyed.
   * It is the perfect place to clean the component — for example, to cancel background tasks.
   */
  ngOnDestroy(): void {

    // Utilisation du cycle de vie du composant pour unsubscribe
    console.log("Destroy heroes component");
    this.subscriptionGetHeroes?.unsubscribe();
  }
}
