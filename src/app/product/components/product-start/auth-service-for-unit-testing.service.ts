import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthServiceForUnitTesting {
    isAuthenticated(): boolean {
        return !!localStorage.getItem('token');
    }
}