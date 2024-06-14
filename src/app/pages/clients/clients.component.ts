import { AfterViewInit, Component, ViewChild } from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
import { ClientModel } from "../../../models/client.model";
import { ClientsService } from "../../services/clients.service";
import { Router } from "@angular/router";
import { SelectionModel } from "@angular/cdk/collections";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatPaginator } from "@angular/material/paginator";

@Component({
  selector: "app-clients",
  templateUrl: "./clients.component.html",
  styleUrl: "./clients.component.scss"
})
export class ClientsComponent implements AfterViewInit {
  displayedColumns: string[] = [
    "select",
    "name",
    "email",
    "birthday",
    "cpf",
    "road",
    "neighborhood",
    "city"
  ];
  dataSource = new MatTableDataSource<ClientModel>([]);
  selection = new SelectionModel<ClientModel>(true, []);
  @ViewChild("paginator") paginator: MatPaginator;

  constructor(
    private clientsService: ClientsService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {

  }

  loadClients(): void {
    this.clientsService.read().then((clients) => {
      this.dataSource = new MatTableDataSource(clients);
    });
  }

  isAllSelected(): boolean {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  toggleAllRows(): void {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  deleteSelectedClients(): void {
    console.log(this.selection.selected);
    const selectedIds = this.selection.selected.map(client => client.id || "");
    this.clientsService.deleteClients(selectedIds).then(() => {
      this.snackBar.open("Clientes deletados com sucesso", "Close", {
        horizontalPosition: "right",
        verticalPosition: "top",
        duration: 2000,
        panelClass: [ "snackbar-success" ]
      });
      this.loadClients();
      this.selection.clear();
    }).catch(() => {
      this.snackBar.open("Erro ao deletar clientes", "Close", {
        horizontalPosition: "right",
        verticalPosition: "top",
        duration: 2000,
        panelClass: [ "snackbar-error" ]
      });
    });
  }

  openRegister(): void {
    this.router.navigate([ "clients-register" ]);
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.loadClients();
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
