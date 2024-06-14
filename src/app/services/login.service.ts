import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { LoginModel } from "../../models/login.model";
import { firstValueFrom } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class LoginService {
  private BASE_URL = "http://localhost:3100";
  public inSession = false;
  constructor(private http: HttpClient) {}

  async login(loginModel: LoginModel): Promise<void> {
    return await firstValueFrom(
      this.http.post<any>(`${this.BASE_URL}/users/login`, {
        email: loginModel.email,
        password: loginModel.password
      })
    );
  }
}
