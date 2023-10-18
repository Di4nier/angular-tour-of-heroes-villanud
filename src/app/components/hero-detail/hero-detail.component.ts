import { Component, Input, AfterViewInit } from '@angular/core';
import { Hero } from '../../data/hero';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { HeroService } from '../../services/hero.service';

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
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.heroService.getHero(id)
      .subscribe(hero => this.hero = hero);

  }

  getStats(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.heroService.getHero(id)
      .subscribe(hero => this.hero = hero);

    const attak = this.hero?.attaque as number;
    const esquive = this.hero?.esquive as number;
    const degats = this.hero?.degats as number;
    const pv = this.hero?.pv as number;

    let points = document.getElementById("puntos") as HTMLElement;
    let ppuntos = document.getElementById("container-puntos") as HTMLElement;
    const inputs = document.querySelectorAll('input[type="number"]') as NodeListOf<HTMLInputElement>;

    let total = 0;

    if (attak && esquive && degats && pv) {
      total = total + attak + esquive + degats + pv;
      if (total === 40) {
        ppuntos.className = "complete";
        inputs.forEach(item => {
          item.classList.add("complete");
        });
      }

      points.innerHTML = total.toString() + " / 40";
    }

  }

  handleChange(): void {

    alert("hello");
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

    console.log(sum);

    if (sum === 40) {
      ppuntos.className = "complete";
      inputs.forEach(item => {
        item.className = "complete";
      });
    }
    else {
      ppuntos.className = "";
    }
    points.innerHTML = sum.toString() + " / 40";

  }

  // setUp(): void {
  //   let inputVal = document.querySelector('input[type=number]') as HTMLInputElement;
  //   let value = Number(inputVal.value);
  //   console.log(value);
  //   // this.parentNode.querySelector('input[type=number]').stepUp()
  //   // document.getElementById('data-filter').value = ++dataValue;
  // }
  stepUp(id: string): void {
    let inputVal = document.getElementById(id) as HTMLInputElement;
    let value = Number(inputVal.value);

    value = value + 1;


    // this.parentNode.querySelector('input[type=number]').stepUp()
    // document.getElementById('data-filter').value = ++dataValue;
  }

  stepDown(id: string): void {
    let inputVal = document.getElementById(id) as HTMLInputElement;
    let value = Number(inputVal.value);

    value = value - 1;

    this.hero!.esquive = this.hero!.esquive - 1;


    inputVal.value = value.toString();

    // this.parentNode.querySelector('input[type=number]').stepUp()
    // document.getElementById('data-filter').value = ++dataValue;
  }

}

