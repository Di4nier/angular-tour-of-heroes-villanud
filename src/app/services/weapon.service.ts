import { Injectable } from '@angular/core';
import {
  addDoc,
  collection,
  collectionData,
  deleteDoc,
  doc,
  docData,
  Firestore,
  updateDoc
} from "@angular/fire/firestore";
import { map, Observable } from "rxjs";
import { DocumentData } from "rxfire/firestore/interfaces";
import { Weapon } from '../data/weapon';

@Injectable({
  providedIn: 'root'
})
export class WeaponService {

  // URL d'accès aux documents sur Firebase
  private static url = 'Weapons';

  constructor(private firestore: Firestore) {
  }

  getWeapons(): Observable<Weapon[]> {

    // get a reference to the user-profile collection
    const weaponCollection = collection(this.firestore, WeaponService.url);

    ///////////
    // Solution 1 : Transformation en une liste d'objets "prototype" de type Hero
    // get documents (data) from the collection using collectionData
    //return collectionData(heroCollection, { idField: 'id' }) as Observable<Hero[]>;

    ///////////
    // Solution 2 : Transformation en une liste d'objets de type Hero
    return collectionData(weaponCollection, { idField: 'id' }).pipe(
      map((documents) => documents.map((weaponDocumentData) => {
        return WeaponService.transformationToWeapon(weaponDocumentData);
      }))) as Observable<Weapon[]>;
  }

  getWeapon(id: string): Observable<Weapon> {

    // Récupération du DocumentReference
    const weaponDocument = doc(this.firestore, WeaponService.url + "/" + id);

    ///////////
    // Solution 1 : Transformation en un objet "prototype" de type Hero
    // get documents (data) from the collection using collectionData
    //return docData(heroDocument, { idField: 'id' }) as Observable<Hero>;

    ///////////
    // Solution 2 : Transformation en un objet de type Hero
    return docData(weaponDocument, { idField: 'id' }).pipe(     // Ajout de l'id dans le document data
      map((weaponDocumentData) => {
        if (weaponDocumentData) {
          return WeaponService.transformationToWeapon(weaponDocumentData as DocumentData);
        } else {
          // Gérer le cas où heroDocumentData est undefined
          // Par exemple, vous pouvez renvoyer une valeur par défaut ou générer une erreur
          throw new Error('weaponDocumentData is undefined');
        }
      })) as Observable<Weapon>
  }

  addWeapon(): Promise<Weapon> {

    // get a reference to the hero collection
    const weaponCollection = collection(this.firestore, WeaponService.url);
    let weapon: Weapon = new Weapon();

    let weaponPromise: Promise<Weapon> = new Promise((resolve, reject) => {
      addDoc(weaponCollection, WeaponService.transformationToJSON(weapon)).then(
        weaponDocument => { // success
          weapon.id = weaponDocument.id;
          resolve(weapon);
          window.location.href = "../detail/" + weapon.id;
        },
        msg => { // error
          reject(msg);
        });
    });

    //
    return weaponPromise;
  }

  updateWeapon(weapon: Weapon): Promise<void> {

    // Récupération du DocumentReference
    const weaponDocument = doc(this.firestore, WeaponService.url + "/" + weapon.id);

    // Update du document à partir du JSON et du documentReference
    return updateDoc(weaponDocument, WeaponService.transformationToJSON(weapon));
  }

  deleteWeapon(id: string): Promise<void> {

    const weaponDocument = doc(this.firestore, WeaponService.url + "/" + id);
    return deleteDoc(weaponDocument);
  }

  private static transformationToWeapon(weaponDocumentData: DocumentData): Weapon {

    ///////
    // Il est nécessaire de concerver l'id du document dans l'objet de type Hero
    ///////

    // Solution 1 : création de l'objet de type Hero "ad hoc"
    //const data: Hero = heroDocumentData as Hero;
    //return new Hero(data.id, data.name, data.attaque, data.esquive, data.degats, data.PV);

    // Solution 2 : création de l'objet de type Hero en utilisant la méthode fromJSON de la classe Hero
    // Conversion du document data en chaine JSON puis chargment de l'objet par défaut Hero
    let weaponTmp: Weapon = new Weapon();
    weaponTmp.fromJSON(JSON.stringify(weaponDocumentData));
    return weaponTmp;
  }

  private static transformationToJSON(weapon: Weapon): any {

    ///////
    // Il n'est pas nécessaire d'evnoyer l'id dans le corps du document donc suppression de cette information
    ///////

    // Solution 1 : création d'un JSON object "ad hoc" (sans la propriété id)
    //let newHeroJSON = {name: hero.name, attaque: hero.attaque, esquive: hero.esquive, degats: hero.degats, PV: hero.PV};

    // Solution 2 : création d'un JSON object en supprimant la propriété id
    let newWeaponJSON = Object.assign({}, weapon);   // Cette solution met l'id dans firebase au niveau du document
    delete newWeaponJSON.id;

    //
    return newWeaponJSON;
  }

}
