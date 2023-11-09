import { Component, OnInit } from '@angular/core';
import { Hero } from '../../data/hero';
import { Weapon } from '../../data/weapon';

// import { HEROES } from '../mock-heroes';
import { HeroService } from '../../services/hero.service';
import { MessageService } from '../../services/message.service';
import { WeaponService } from '../../services/weapon.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {


  heroes: Hero[] = [];



  constructor(private heroService: HeroService, private weaponService: WeaponService) { }

  ngOnInit(): void {
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroService.getHeroes()
      .subscribe(heroes => {
        this.heroes = heroes;
        this.getTroll(); // Call getTroll() after the data is fetched
      });
  }

  getTroll(): void {
    this.heroes.forEach(item => {
      let weaponid = item.weaponId;

      // let backupattack = item.attaque;
      // let backupesquive = item.esquive;
      // let backupdegats = item.degats;
      // let backuppv = item.PV;

      // console.log(backupattack);

      if (weaponid) {
        this.weaponService.getWeapon(weaponid).subscribe((weapon) => {

          item.weaponId = weapon.skin;

          item.attaque = weapon.attaque + item.attaque;
          item.esquive = weapon.esquive + item.esquive;
          item.degats = weapon.degats + item.degats;
          item.PV = weapon.PV + item.PV;
          
        })
      }
    });
  }

  newHero(): void {
    this.heroService.addHero();
  }


}
