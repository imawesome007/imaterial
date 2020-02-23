import { NgModule } from "@angular/core";
import { MaterialModule } from "src/app/shared/material-modules";
import { LayoutModule } from "src/app/shared/layout/layout-module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { AppSharedModule } from "src/app/shared/app-shared-module";
import { MatInputModule } from "@angular/material/input";
import { RouterModule } from "@angular/router";
import { UserDetailComponent } from './user-details/user-details.component';
import { UserRoutingModule } from './user-dashboard-routing.module';
import { UpdateInfoComponent } from './update-info/update-info.component';
import { AddUserComponent } from './add-user/add-user.component';

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
    UserRoutingModule
  ],
  declarations: [
    UserDetailComponent, 
    UpdateInfoComponent,
    AddUserComponent
  ]
})

export class UserDashboardModule { }