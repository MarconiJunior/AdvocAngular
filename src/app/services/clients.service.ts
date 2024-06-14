import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { firstValueFrom } from "rxjs";
import { ClientModel } from "../../models/client.model";

@Injectable({
  providedIn: "root"
})
export class ClientsService {
  private BASE_URL = "http://localhost:3100";
  constructor(private http: HttpClient) {}
  async register(clientModel: ClientModel): Promise<void> {
    return await firstValueFrom(
      this.http.post<any>(`${this.BASE_URL}/clients`, {
        name: clientModel.name,
        email: clientModel.email,
        birthday: clientModel.birthday,
        cpf: clientModel.cpf,
        road: clientModel.road,
        neighborhood: clientModel.neighborhood,
        city: clientModel.city
      })
    );
  }

  async read(): Promise<ClientModel[]> {
    return await firstValueFrom(
      this.http.get<ClientModel[]>(`${this.BASE_URL}/clients`)
    );
  }

  deleteClients(ids: string[]): Promise<void[]> {
    const deleteRequests =
      ids.map(id => this.http.delete<void>(`${this.BASE_URL}/clients/${id}`).toPromise());
    return Promise.all(deleteRequests);
  }
}
