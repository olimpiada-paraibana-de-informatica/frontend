import { AbstractControl } from '@angular/forms';

export class ValidatorsForm {

    static cpfMask = [/[0-9]/, /[0-9]/, /[0-9]/, '.', /[0-9]/, /[0-9]/, /[0-9]/, '.', /[0-9]/, /[0-9]/, /[0-9]/, '-', /[0-9]/, /[0-9]/];

     
     static MatchEmail(AC: AbstractControl): any {
        const email = AC.get('email').value; // to get value in input tag
        const confirmEmail = AC.get('emailConfirm').value; // to get value in input tag
         if (email != confirmEmail) {
             AC.get('emailConfirm').setErrors( {MatchEmail: true} );
         } else {
             return null;
         }
     }

    static MatchPassword(AC: AbstractControl): any {
        const password = AC.get('password').value; // to get value in input tag
        const confirmPassword = AC.get('passwordConfirm').value; // to get value in input tag
         if (password != confirmPassword) {
             AC.get('passwordConfirm').setErrors({MatchPassword: true});
             AC.get('passwordConfirm').hasError('email');
         } else {
             return null;
         }
     }


}