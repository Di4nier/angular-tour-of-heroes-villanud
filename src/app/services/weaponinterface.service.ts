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
import {map, Observable} from "rxjs";
import {DocumentData} from "rxfire/firestore/interfaces";
import {WeaponInterface} from "../data/weaponInterface";
import {Weapon} from "../data/weapon";

@Injectable({
  providedIn: 'root'
})
export class WeaponInterfaceService {

  // URL d'accès aux documents sur Firebase
  private static url = 'weapons';

  constructor(private firestore: Firestore) {
  }

  getWeapons(): Observable<WeaponInterface[]> {

    // get a reference to the hero collection
    const weaponCollection = collection(this.firestore, WeaponInterfaceService.url);

    ///////////
    // Solution 1 : Transformation en une liste d'objets "prototype" de type Hero
    // get documents (data) from the collection using collectionData
    return collectionData(weaponCollection, { idField: 'id' }) as Observable<WeaponInterface[]>;
  }

  getWeapon(id: string): Observable<Weapon> {

    // Récupération du DocumentReference
    const weaponDocument = doc(this.firestore, WeaponInterfaceService.url + "/" + id);

    ///////////
    // Solution 1 : Transformation en un objet "prototype" de type Hero
    // get documents (data) from the collection using collectionData
    return docData(weaponDocument, { idField: 'id' }) as Observable<Weapon>;
  }

  deleteWeapon(id: string): Promise<void> {

    // Récupération du DocumentReference
    const weaponDocument = doc(this.firestore, WeaponInterfaceService.url + "/" + id);

    //
    return deleteDoc(weaponDocument);
  }

  addWeapon(weapon: WeaponInterface): void {

    // get a reference to the hero collection
    const weaponCollection = collection(this.firestore, WeaponInterfaceService.url);

    //
    addDoc(weaponCollection, weapon);
  }

  updateWeapon(weapon: WeaponInterface): void {

    // Récupération du DocumentReference
    const weaponDocument = doc(this.firestore, WeaponInterfaceService.url + "/" + weapon.id);

    // Update du document à partir du JSON et du documentReference
    let newWeaponJSON = {name: weapon.name, attaque: weapon.attaque, esquive: weapon.esquive, degats: weapon.degats, PV: weapon.PV};
    updateDoc(weaponDocument, newWeaponJSON);
  }
}
