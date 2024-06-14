import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginModel } from '../../models/login.model';
import { firstValueFrom } from 'rxjs';
import { ClientModel } from '../../models/client.model';

@Injectable({
  providedIn: 'root',
})
export class ClientsService {
  private BASE_URL = 'http://localhost:3100';
  constructor(private http: HttpClient) {}
  public name?: string;
  public email?: string;
  public birthday?: string;
  public cpf?: string;
  public road?: string;
  public neighborhood?: string;
  public city?: string;
  async register(clientModel: ClientModel): Promise<void> {
    return await firstValueFrom(
      this.http.post<any>(`${this.BASE_URL}/clients`, {
        name: clientModel.name,
        email: clientModel.email,
        birthday: clientModel.birthday,
        cpf: clientModel.cpf,
        road: clientModel.road,
        neighborhood: clientModel.neighborhood,
        city: clientModel.city,
      })
    );
  }
}
