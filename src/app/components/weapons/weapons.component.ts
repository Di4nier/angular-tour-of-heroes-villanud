import { Component, OnInit } from '@angular/core';
import { Weapon } from '../../data/weapon';
import { WeaponService } from '../../services/weapon.service';

@Component({
  selector: 'app-weapons',
  templateUrl: './weapons.component.html',
  styleUrls: ['./weapons.component.css']
})
export class WeaponsComponent implements OnInit {

  weapons: Weapon[] = [];

  constructor(private weaponService: WeaponService) { }

  ngOnInit(): void {
    this.getWeapons();
  }

  
  getWeapons(): void {
    this.weaponService.getWeapons()
    .subscribe(weapons => this.weapons = weapons);
  }
  
  newWeapon(): void{
    this.weaponService.addWeapon();
  }
}
