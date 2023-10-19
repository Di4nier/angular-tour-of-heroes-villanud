import { Component, Input, AfterViewInit } from '@angular/core';
import { Hero } from '../../data/hero';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { HeroService } from '../../services/hero.service';
import { fakeAsync } from '@angular/core/testing';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements AfterViewInit {

  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location
  ) { }
  @Input() hero?: Hero;

  ngAfterViewInit(): void {
    this.getStats();
  }

  ngOnInit(): void {
    this.getHero();
  }

  goBack(): void {
    this.location.back();
  }

  getHero(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if(id)
    this.heroService.getHero(id)
      .subscribe(hero => this.hero = hero);

  }

  getStats(): void {

    const attak = this.hero?.attaque as number;
    const esquive = this.hero?.esquive as number;
    const degats = this.hero?.degats as number;
    const pv = this.hero?.PV as number;

    let points = document.getElementById("puntos") as HTMLElement;
    let ppuntos = document.getElementById("container-puntos") as HTMLElement;
    const inputs = document.querySelectorAll('input[type="number"]') as NodeListOf<HTMLInputElement>;

    let total = 0;

    if (attak && esquive && degats && pv) {
      total = total + attak + esquive + degats + pv;
      if (total >= 40) {
        ppuntos.className = "complete";
        inputs.forEach(item => {
          item.classList.add("complete");
        });
      }

      points.innerHTML = total.toString() + " / 40";
    }

  }

  handleChange(): void {

    let points = document.getElementById("puntos") as HTMLElement;
    let ppuntos = document.getElementById("container-puntos") as HTMLElement;
    const inputs = document.querySelectorAll('input[type="number"]') as NodeListOf<HTMLInputElement>;

    let attak = document.getElementById("hero-attaque") as HTMLInputElement;
    let esquive = document.getElementById("hero-esquive") as HTMLInputElement;
    let degats = document.getElementById("hero-degats") as HTMLInputElement;
    let pv = document.getElementById("hero-pv") as HTMLInputElement;

    let attackvalue = Number(attak.value);
    let esquivevalue = Number(esquive.value);
    let degatsvalue = Number(degats.value);
    let pvvalue = Number(pv.value);


    const sum = attackvalue + esquivevalue + degatsvalue + pvvalue;

    
    if(attackvalue <= 0){
      alert("Minimum : 1");
      window.location = window.location;
    }
    if(esquivevalue <= 0){
      alert("Action Impossible : Dépassement Limite Points");
      window.location = window.location;
    }if(degatsvalue <= 0){
      alert("Action Impossible : Dépassement Limite Points");
      window.location = window.location;
    }if(pvvalue <= 0){
      alert("Action Impossible : Dépassement Limite Points");
      window.location = window.location;
    }

    if(sum > 40 || sum < 4){
      alert("Action Impossible : Dépassement Points");
      window.location = window.location;
    }

    if (sum >= 40) {
      ppuntos.className = "complete";
      inputs.forEach(item => {
        item.classList.add("complete");
      });
    }
    else {
      ppuntos.className = "";
      inputs.forEach(item => {
        item.classList.remove("complete");
      });
    }
    points.innerHTML = sum.toString() + " / 40";

    this.getNewSkin(attackvalue, esquivevalue, degatsvalue, pvvalue );


  }

  getNewSkin(attaque: number, esquive: number, degats: number, pv: number): void{

    if(attaque === 10 && esquive === 10 && degats===10 && pv === 10){
      this.hero!.skin = "balanced_troll";
    }
    else if(pv >= 20){
      this.hero!.skin = "pv_troll";
    }
    else if(esquive >= 20){
      this.hero!.skin = "speed_troll";
    }else if (degats >= 20){
      this.hero!.skin = "damages_troll";
    }else{
      this.hero!.skin = "speed_troll2";
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
  


