import { HeroeModel } from './../../models/heroe.model';
import { HeroesService } from './../../services/heroes.service';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  heroes: HeroeModel[] = [];
  cargando = false;

  constructor( private heroesService: HeroesService ) { }

  ngOnInit() {

    this.cargando = true;
    this.heroesService.getHeroes()
      .subscribe( resp => {
        this.heroes = resp,
        this.cargando = false
      } );
  }

  borrarHeroe( heroe: HeroeModel, i: number ) {

    Swal.fire({
      icon: 'question',
      title: '¿Esta Seguro?',
      text: `¿Esta seguro de borrar heroe ${ heroe.nombre }?`,
      showConfirmButton: true,
      showCancelButton: true
    }).then( resp => {
      if ( resp.value ) {
        this.heroes.splice(i, 1);
        this.heroesService.borrarHeroe( heroe.id ).subscribe();
      }
    })

  }

}
