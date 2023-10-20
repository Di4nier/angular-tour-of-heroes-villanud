import { WeaponInterface } from "./weaponInterface";

export class Weapon implements WeaponInterface{

  id: string | undefined;
  name: string;
  attaque: number;
  esquive: number;
  degats: number;
  PV: number;
  skin: string;

  constructor(id: string = "id_test", name: string = "The Stick", attaque: number = 0, esquive: number = 0, degats: number = 0, PV: number = 0, skin: string = "stick_weapon") {
    this.id = id;
    this.name = name;
    this.attaque = attaque;
    this.esquive = esquive;
    this.degats = degats;
    this.PV = PV;
    this.skin = skin;
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
