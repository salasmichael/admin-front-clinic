import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import { Hospital } from '../../models/hospital.model';

const base_url = environment.base_url;


@Injectable({
  providedIn: 'root'
})
export class HospitalService {


  constructor( private http: HttpClient ) { }
 

  cargarHospitales() {

    const url = `${ base_url }/hospitales`;
    return this.http.get<any>( url )
              .pipe(
                map( (resp: {ok: boolean, hospitales: Hospital[] }) => resp.hospitales )
              );
  }

  crearHospital( nombre: string ) {

    const url = `${ base_url }/hospitales`;
    return this.http.post( url, { nombre } );
  }
  
  actualizarHospital( _id: string, nombre: string  ) {

    const url = `${ base_url }/hospitales/${ _id }`;
    return this.http.put( url, { nombre } );
  }

  borrarHospital( _id: string ) {

    const url = `${ base_url }/hospitales/${ _id }`;
    return this.http.delete( url );
  }

}
