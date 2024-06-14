import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class AuthService {

  constructor() { }

  isLoggedIn(): boolean {
    return !!localStorage.getItem("token");
  }

  login(): void {
    localStorage.setItem("token", "test");
  }

  logout(): void {
    localStorage.removeItem("token");
  }
}
