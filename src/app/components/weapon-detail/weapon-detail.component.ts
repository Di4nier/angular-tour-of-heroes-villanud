import { Component, Input } from '@angular/core';
import { Weapon } from '../../data/weapon';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { WeaponService } from '../../services/weapon.service';
import { max } from 'rxjs';

@Component({
  selector: 'app-weapon-detail',
  templateUrl: './weapon-detail.component.html',
  styleUrls: ['./weapon-detail.component.css']
})
export class WeaponDetailComponent {

  constructor(
    private route: ActivatedRoute,
    private weaponService: WeaponService,
    private location: Location
  ) { }
  @Input() weapon?: Weapon;

  bonus: number = 0;

  MaxLimitAttack: number = 5;
  MaxLimitEsquive: number = 5;
  MaxLimitDegats: number = 5;
  MaxLimitPV: number = 5;

  MinLimitAttack: number = -5;
  MinLimitEsquive: number = -5;
  MinLimitDegats: number = -5;
  MinLimitPV: number = -5;

  classComplet: string = "";

  ngOnInit(): void {
    this.getWeapon();
  }

  goBack(): void {
    this.location.back();
  }

  getWeapon(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.weaponService.getWeapon(id).subscribe((weapon) => {
        this.weapon = weapon;
        console.log(weapon);
        this.getStats();
      });

    }
  }


  getStats(): void {
    this.bonus = (this.weapon!.attaque + this.weapon!.esquive + this.weapon!.degats + this.weapon!.PV) * -1;

    if (this.bonus === 0) {
      this.classComplet = "complete";
    }
  }

  handleChange(): void {

    this.bonus = (this.weapon!.attaque + this.weapon!.esquive + this.weapon!.degats + this.weapon!.PV) * -1;


    if (this.bonus === 0) {
      this.classComplet = "complete";
    }
    else {
      this.classComplet = "";
    }

    this.getNewSkin(this.weapon!.attaque, this.weapon!.esquive, this.weapon!.degats, this.weapon!.PV);

  }



  getNewSkin(attaque: number, esquive: number, degats: number, pv: number): void {

    if (attaque === 0 && esquive === 0 && degats === 0 && pv === 0) {
      this.weapon!.skin = "hands_weapon";
    }
    else if (attaque >= 3) {
      this.weapon!.skin = "buddy_weapon"
    }
    else if (pv >= 3) {
      this.weapon!.skin = "shield_weapon";
    }
    else if (esquive >= 3) {
      this.weapon!.skin = "confusing_weapon";
    } else if (degats >= 3) {
      this.weapon!.skin = "sword_weapon";
    } else {
      this.weapon!.skin = "stick_weapon";
    }
  }

  UpdateWeapon(): void {
    try {

      if(this.bonus === 0){
        this.weaponService.updateWeapon(this.weapon!);
        var x = document.getElementById("snackbar");
        x!.className = "show";
        setTimeout(function () { x!.className = x!.className.replace("show", ""); }, 3000);
      }else{
        var x = document.getElementById("snackbar2");
        x!.className = "show";
        setTimeout(function () { x!.className = x!.className.replace("show", ""); }, 3000);
      }

    } catch (e) {
      var x = document.getElementById("snackbar2");
      x!.className = "show";
      setTimeout(function () { x!.className = x!.className.replace("show", ""); }, 3000);
    }

  }

  DeleteWeapon(): void {
    try {

      if (confirm("Etes vous sur de vouloir supprimer cette arme ?")) {
        this.weaponService.deleteWeapon(this.weapon!.id!);

        var x = document.getElementById("snackbar");
        x!.className = "show";
        setTimeout(function () { x!.className = x!.className.replace("show", ""); }, 3000);
        window.location.href = "../weapons";
      } else {
        console.log('Action annuler');
      }
    } catch (e) {
      var x = document.getElementById("snackbar2");
      x!.className = "show";
      setTimeout(function () { x!.className = x!.className.replace("show", ""); }, 3000);
    }

  }

}
