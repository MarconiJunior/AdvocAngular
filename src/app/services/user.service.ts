import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { firstValueFrom } from "rxjs";
import { UserModel } from "../../models/user.model";

@Injectable({
  providedIn: "root"
})
export class UserService {
  private BASE_URL = "http://localhost:3100";
  constructor(private http: HttpClient) {}

  async create(userModel: UserModel): Promise<void> {
    return await firstValueFrom(
      this.http.post<any>(`${this.BASE_URL}/users/register`, {
        name: userModel.name,
        email: userModel.email,
        oabSerial: userModel.oabSerial,
        phone: userModel.phone,
        password: userModel.password
      })
    );
  }
}
