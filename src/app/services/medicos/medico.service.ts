import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';

import { Medico } from '../../models/medico.model';

const base_url = environment.base_url;


@Injectable({
  providedIn: 'root'
})
export class MedicoService {

  constructor( private http: HttpClient ) { }

 
  cargarMedicos() {

    const url = `${ base_url }/medicos`;
    return this.http.get<any>( url)
              .pipe(
                map( (resp: {ok: boolean, medicos: Medico[] }) => resp.medicos )
              );
  }

  obtenerMedicoPorId( id: string ) {

    const url = `${ base_url }/medicos/${ id }`;
    return this.http.get<any>( url)
              .pipe(
                map( (resp: {ok: boolean, medico: Medico }) => resp.medico )
              );
  }

  crearMedico( medico: { nombre: string, hospital: string } ) {

    const url = `${ base_url }/medicos`;
    return this.http.post( url, medico);
  }
  
  actualizarMedico( medico: Medico  ) {

    const url = `${ base_url }/medicos/${ medico._id }`;
    return this.http.put( url, medico);
  }

  borrarMedico( _id: string ) {

    const url = `${ base_url }/medicos/${ _id }`;
    return this.http.delete( url);
  }

}
