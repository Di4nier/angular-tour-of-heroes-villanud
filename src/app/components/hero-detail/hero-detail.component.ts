import { Component, Input } from '@angular/core';
import { Hero } from '../../data/hero';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { HeroService } from '../../services/hero.service';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent {

  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location
  ) { }
  @Input() hero?: Hero;

  total: number = 0;
  MaxLimitAttack: number = 40;
  MaxLimitEsquive: number = 40;
  MaxLimitDegats: number = 40;
  MaxLimitPV: number = 40;
  classComplet: string = "";

  ngOnInit(): void {
    this.getHero();
  }

  goBack(): void {
    this.location.back();
  }

  getHero(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.heroService.getHero(id).subscribe((hero) => {
        this.hero = hero;
        console.log(hero);
        this.getStats();
      });

    }
  }

  getStats(): void {

    if (this.hero?.attaque && this.hero?.esquive && this.hero?.degats && this.hero?.PV) {
      this.total = this.hero?.attaque + this.hero?.esquive + this.hero?.degats + this.hero?.PV;

      let fourty = 40;

      let detecor = fourty - this.total;

      this.MaxLimitAttack = this.hero!.attaque + detecor;
      this.MaxLimitEsquive = this.hero!.esquive + detecor;
      this.MaxLimitDegats = this.hero!.degats + detecor;
      this.MaxLimitPV = this.hero!.PV + detecor;


      if (this.total >= 40) {
        this.classComplet = "complete";
      }

    }

  }

  handleChange(): void {

    this.total = this.hero!.attaque + this.hero!.esquive + this.hero!.degats + this.hero!.PV;
    let fourty = 40;

    let detecor = fourty - this.total;

    this.MaxLimitAttack = this.hero!.attaque + detecor;
    this.MaxLimitEsquive = this.hero!.esquive + detecor;
    this.MaxLimitDegats = this.hero!.degats + detecor;
    this.MaxLimitPV = this.hero!.PV + detecor;


    if (this.hero!.attaque <= 0) {
      alert("Minimum : 1");
      window.location = window.location;
    }
    if (this.hero!.esquive <= 0) {
      alert("Action Impossible : Dépassement Limite Points");
      window.location = window.location;
    } if (this.hero!.degats <= 0) {
      alert("Action Impossible : Dépassement Limite Points");
      window.location = window.location;
    } if (this.hero!.PV <= 0) {
      alert("Action Impossible : Dépassement Limite Points");
      window.location = window.location;
    }

    if (this.total > 40 || this.total < 4) {
      alert("Action Impossible : Dépassement Points");
      window.location = window.location;
    }

    if (this.total >= 40) {
      this.classComplet = "complete";

    }
    else {
      this.classComplet = "";
    }

    this.getNewSkin(this.hero!.attaque, this.hero!.esquive, this.hero!.degats, this.hero!.PV);

  }

  getNewSkin(attaque: number, esquive: number, degats: number, pv: number): void {

    if (attaque === 10 && esquive === 10 && degats === 10 && pv === 10) {
      this.hero!.skin = "balanced_troll";
    }
    else if (attaque >= 20) {
      this.hero!.skin = "attaque_troll"
    }
    else if (pv >= 20) {
      this.hero!.skin = "pv_troll";
    }
    else if (esquive >= 20) {
      this.hero!.skin = "speed_troll";
    } else if (degats >= 20) {
      this.hero!.skin = "damages_troll";
    } else {
      this.hero!.skin = "normal_troll";
    }
  }


  UpdateTroll(): void {
    try {

      this.heroService.updateHero(this.hero!);
      var x = document.getElementById("snackbar");
      x!.className = "show";
      setTimeout(function () { x!.className = x!.className.replace("show", ""); }, 3000);

    } catch (e) {
      var x = document.getElementById("snackbar2");
      x!.className = "show";
      setTimeout(function () { x!.className = x!.className.replace("show", ""); }, 3000);
    }

  }

  DeleteTroll(): void {
    try {

      if (confirm("Etes vous sur de vouloir supprimer ce Troll ?")) {
        this.heroService.deleteHero(this.hero!.id!);

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




  // setUp(): void {
  //   let inputVal = document.querySelector('input[type=number]') as HTMLInputElement;
  //   let value = Number(inputVal.value);
  //   console.log(value);
  //   // this.parentNode.querySelector('input[type=number]').stepUp()
  //   // document.getElementById('data-filter').value = ++dataValue;
  // }
  // stepUp(id: string): void {
  //   let inputVal = document.getElementById(id) as HTMLInputElement;
  //   let value = Number(inputVal.value);

  //   value = value + 1;


  // this.parentNode.querySelector('input[type=number]').stepUp()
  // document.getElementById('data-filter').value = ++dataValue;
}

// stepDown(id: string): void {
//   let inputVal = document.getElementById(id) as HTMLInputElement;
//   let value = Number(inputVal.value);

//   value = value - 1;

//   this.hero!.esquive = this.hero!.esquive - 1;


//   inputVal.value = value.toString();

// this.parentNode.querySelector('input[type=number]').stepUp()
// document.getElementById('data-filter').value = ++dataValue;



