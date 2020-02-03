import { NgModule } from "@angular/core";
import { MaterialModule } from "src/app/shared/material-modules";
import { LayoutModule } from "src/app/shared/layout/layout-module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { AppSharedModule } from "src/app/shared/app-shared-module";
import { MatInputModule } from "@angular/material/input";
import { RouterModule } from "@angular/router";
import { IndentRoutingModule } from "./user-dashboard-routing.module";
import { UserResolver } from './resolver/user.resolver';
import { AddEditUserComponent } from 'src/app/shared/dialogs/add-edit-user/add-edit-user.component';
import { UserDetailComponent } from './user-details/user-details.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    LayoutModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    RouterModule,
    AppSharedModule,
    IndentRoutingModule
  ],
  providers: [UserResolver],
  declarations: [UserDetailComponent]
})
export class UserDashboardModule {}
