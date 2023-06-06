import { Component, AfterViewInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/auth/login.service';
import Swal from 'sweetalert2';

declare const google:any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [ './login.component.css' ]
})
export class LoginComponent implements AfterViewInit{
  
  @ViewChild('googleBtn') googleBtn!: ElementRef;
  formSubmitted:boolean = false;

  public loginForm = this.fb.group({
    email:[ localStorage.getItem('email') || '', [ Validators.required, Validators.email ] ],
    password:[ '', Validators.required ],
    remember:[ false ]
  },{Validators})

  constructor( private router: Router,
              private fb: FormBuilder,
              private loginService:LoginService,
              private ngzone:NgZone ) { }


    ngAfterViewInit(): void {
      this.googleInit();
    }


  googleInit(){
    google.accounts.id.initialize({
      client_id: "659336502163-uo1l9l4k2maoskr9uk3jklou1i5q1g0k.apps.googleusercontent.com",
      callback: ( response:any ) => this.handleCredentialResponse( response )
    });

    google.accounts.id.renderButton(
      // document.getElementById("buttonDiv"),
      this.googleBtn.nativeElement,
      { theme: "outline", size: "large" }
    );
  }

  handleCredentialResponse( response:any ){
    // console.log("Encoded JWT ID token: " + response.credential);
      this.loginService.loginGoogle(response.credential)
        .subscribe(res=>{
          this.ngzone.run(()=>{
            localStorage.setItem('email',res.email);
            this.router.navigateByUrl('/');
          })
        },(err)=>{
          Swal.fire('Error',err?.error?.msg,'error')
        })
  }

  login() {
    this.router.navigateByUrl('/');
    this.loginService.login( this.loginForm.value )
      .subscribe(res=>{

        if( this.loginForm.get('remember')?.value ){
            localStorage.setItem('email',this.loginForm.get('email')?.value);
        }else{
          localStorage.removeItem('email');
        }
                   
        this.router.navigateByUrl('/');
        
      },(err)=>{
          Swal.fire('Error',err?.error?.msg,'error')
        })

  }

}
