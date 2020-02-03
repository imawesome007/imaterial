import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Routes, RouterModule } from "@angular/router";
import { UserResolver } from './resolver/user.resolver';
import { UserDetailComponent } from './user-details/user-details.component';
const routes: Routes = [
  {
    path: "user-detail",
    resolve: { indentList: UserResolver },
    component: UserDetailComponent
  }
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)]
})
export class IndentRoutingModule {}
