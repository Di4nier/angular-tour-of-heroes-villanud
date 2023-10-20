import { Component, Input } from '@angular/core';
import { Weapon } from '../../data/weapon';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { WeaponService } from '../../services/weapon.service';

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

  total: number = 0;
  MaxLimitAttack: number = 5;
  MaxLimitEsquive: number = 5;
  MaxLimitDegats: number = 5;
  MaxLimitPV: number = 5;
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
        this.getStats();
      });

    }
  }

  getStats(): void {

    if (this.weapon?.attaque && this.weapon?.esquive && this.weapon?.degats && this.weapon?.PV) {
      this.total = this.weapon?.attaque + this.weapon?.esquive + this.weapon?.degats + this.weapon?.PV;

      let fourty = 40;

      let detecor = fourty - this.total;

      this.MaxLimitAttack = this.weapon!.attaque + detecor;
      this.MaxLimitEsquive = this.weapon!.esquive + detecor;
      this.MaxLimitDegats = this.weapon!.degats + detecor;
      this.MaxLimitPV = this.weapon!.PV + detecor;


      if (this.total >= 0) {
        this.classComplet = "complete";
      }

    }

  }

  handleChange(): void {

    this.total = this.weapon!.attaque + this.weapon!.esquive + this.weapon!.degats + this.weapon!.PV;
    let fourty = 5;

    let detecor = fourty - this.total;

    this.MaxLimitAttack = this.weapon!.attaque + detecor;
    this.MaxLimitEsquive = this.weapon!.esquive + detecor;
    this.MaxLimitDegats = this.weapon!.degats + detecor;
    this.MaxLimitPV = this.weapon!.PV + detecor;


    // if (this.weapon!.attaque <= 0) {
    //   alert("Minimum : 1");
    //   window.location.reload();
    // }
    // if (this.weapon!.esquive <= 0) {
    //   alert("Action Impossible : Dépassement Limite Points");
    //   window.location.reload();
    // } if (this.weapon!.degats <= 0) {
    //   alert("Action Impossible : Dépassement Limite Points");
    //   window.location.reload();
    // } if (this.weapon!.PV <= 0) {
    //   alert("Action Impossible : Dépassement Limite Points");
    //   window.location.reload();
    // }

    // if (this.total > 40 || this.total < 4) {
    //   alert("Action Impossible : Dépassement Points");
    //   window.location.reload();
    // }

    if (this.total >= 0) {
      this.classComplet = "complete";

    }
    else {
      this.classComplet = "";
    }

    this.getNewSkin(this.weapon!.attaque, this.weapon!.esquive, this.weapon!.degats, this.weapon!.PV);

  }



  getNewSkin(attaque: number, esquive: number, degats: number, pv: number): void {

    if (attaque === 10 && esquive === 10 && degats === 10 && pv === 10) {
      this.weapon!.skin = "balanced_troll";
    }
    else if (attaque >= 20) {
      this.weapon!.skin = "attaque_troll"
    }
    else if (pv >= 3) {
      this.weapon!.skin = "shield_weapon";
    }
    else if (esquive >= 20) {
      this.weapon!.skin = "speed_troll";
    } else if (degats >= 20) {
      this.weapon!.skin = "damages_troll";
    } else {
      this.weapon!.skin = "normal_troll";
    }
  }

  UpdateWeapon(): void {
    try {

      this.weaponService.updateWeapon(this.weapon!);
      var x = document.getElementById("snackbar");
      x!.className = "show";
      setTimeout(function () { x!.className = x!.className.replace("show", ""); }, 3000);

    } catch (e) {
      var x = document.getElementById("snackbar2");
      x!.className = "show";
      setTimeout(function () { x!.className = x!.className.replace("show", ""); }, 3000);
    }

  }

  DeleteWeapon(): void {
    try {

      if (confirm("Etes vous sur de vouloir supprimer ce Troll ?")) {
        this.weaponService.deleteWeapon(this.weapon!.id!);

        var x = document.getElementById("snackbar");
        x!.className = "show";
        setTimeout(function () { x!.className = x!.className.replace("show", ""); }, 3000);
        window.location.href = "../heroes";
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
