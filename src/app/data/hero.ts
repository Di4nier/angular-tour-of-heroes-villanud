import {HeroInterface} from "./heroInterface";

export class Hero implements HeroInterface{

  id: string | undefined;
  name: string;
  attaque: number;
  esquive: number;
  degats: number;
  PV: number;
  skin: string;
  weaponId :string;

  constructor(id: string = "id_test", name: string = "Doe", attaque: number = 10, esquive: number = 10, degats: number = 10, PV: number = 10, skin: string = "balanced_troll", weaponId: string = "") {
    this.id = id;
    this.name = name;
    this.attaque = attaque;
    this.esquive = esquive;
    this.degats = degats;
    this.PV = PV;
    this.skin = skin;
    this.weaponId = weaponId
  }

  isValide(): boolean {
    return  (this.attaque >= 1)
            && (this.esquive >= 1)
            && (this.degats >= 1)
            && (this.PV >= 1)
            && (this.attaque + this.esquive + this.degats + this.PV) <= 40 ;
  }


  fromJSON(jsonStr: string): void {

    let jsonObj = JSON.parse(jsonStr);
    for (const propName in jsonObj) {
      (this as any)[propName] = jsonObj[propName];
    }
  }
}
