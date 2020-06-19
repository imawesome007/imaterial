import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { DashboardComponent } from "./features/dashboard/dashboard.component";
import { BomResolver } from "./features/dashboard/bom/bom.resolver";
import { AuthLayoutComponent } from "./shared/layout/auth-layout/auth-layout.component";
import { MainLayoutComponent } from "./shared/layout/main-layout/main-layout.component";
import { NotFoundComponent } from "./features/not-found/not-found.component";
import { SupplierBidLayoutComponent } from "./shared/layout/supplier-bid-layout/supplier-bid-layout.component";
import { AppDashboardComponent } from './features/app-dashboard/app-dashboard.component';
import { AuthGuardService } from './shared/guards/auth.guards';
import { UserDataGuardService } from './shared/guards/user-data.guards';
import { ProfileLayoutComponent } from './shared/layout/profile-layout/profile-layout.component';
import { AfterSignUpGuardService } from './shared/guards/afterSignUpGaurd';
import { ProfileComponent } from './features/profile/profile.component';
import { CountryResolver } from './shared/resolver/country.resolver';

const routes: Routes = [
  {
    path: "",
    redirectTo: "auth/login",
    pathMatch: "full"
  },

  {
    path: "",
    component: SupplierBidLayoutComponent,
    children: [
      {
        path: "rfq-bids",
        loadChildren: () =>
          import(
            "./features/rfq-supplier-template/rfq-supplier-detail-template.module"
          ).then(m => m.RFQSupplierDetailTemplateModule)
      }
    ]
  },

  {
    path: "",
    component: AuthLayoutComponent,
    children: [
      {
        path: "auth",
        loadChildren: () =>
          import("./features/auth/auth.module").then(m => m.AuthModule)
      }
    ]
  },

  {
    path: "",
    component: ProfileLayoutComponent,
    canActivate: [ AuthGuardService, UserDataGuardService ],
    children: [
      {
        path: "profile",
        loadChildren: () =>
          import("./features/first-login/first-login.module").then(m => m.FirstLoginModule)
      }
    ]
  },

  {
    path: "",
    component: MainLayoutComponent,
    canActivate: [ AuthGuardService, AfterSignUpGuardService ],
    children: [
      {
        path: "project-dashboard",
        data: { title: 'Project Dashboard', breadcrumb: 'Project Store' },
        loadChildren: () =>
          import("./features/dashboard/dashboard.module").then(m => m.DashboardModule)
      },
      // resolve: { dashBoardData: DashBoardResolver }
      {
        path: 'profile-account',
        component: ProfileComponent,
        data: { title: 'profile' }
      },
      {
        path: 'dashboard',
        component: AppDashboardComponent,
        data: { title: 'Dashboard', breadcrumb: 'Dashboard' }
      },
      // {
      //   path: "bom/:id",
      //   resolve: { bomCategory: BomResolver },
      //   data: { breadcrumb: 'BOM' },
      //   loadChildren: () =>
      //     import("./features/bom/bom.module").then(m => m.BomModule)
      // },
      {
        path: "indent/:id",
        data: { breadcrumb: 'Indent' },
        loadChildren: () =>
          import("./features/indent/indent-dashboard.module").then(
            m => m.IndentDashboardModule
          )
      },
      {
        path: "globalStore/:id",
        data: { breadcrumb: 'Global Store' },
        loadChildren: () =>
          import("./features/global-store/global-store.module").then(
            m => m.GlobalStoreModule
          )
      },
      {
        path: "rfq",
        data: { breadcrumb: 'RFQ' },
        loadChildren: () =>
          import("./features/rfq/rfq.module").then(m => m.RFQModule)
      },
      {
        path: "po",
        data: { breadcrumb: 'PO' },
        loadChildren: () =>
          import("./features/po/po.module").then(m => m.POModule)
      },
      {
        path: "users",
        resolve: {
          countryList: CountryResolver
        },
        data: { breadcrumb: 'Users' },
        loadChildren: () =>
          import("./features/users/user-dashboard.module").then(
            m => m.UserDashboardModule
          )
      },
      {
        path: "supplier",
        resolve: {
          countryList: CountryResolver
        },
        data: { breadcrumb: 'Supplier' },
        loadChildren: () =>
          import("./features/supplier/supplier.module").then(
            m => m.SupplierDashboardModule
          )
      },
      {
        path: "myMaterial",
        data: { breadcrumb: 'My Materials ' },
        loadChildren: () =>
          import("./features/my-material/myMaterial.module").then(
            m => m.MyMaterialModule
          )
      },
      {
        path: "reports",
        data: { breadcrumb: 'Reports' },
        loadChildren: () =>
          import("./features/reports/report-dashboard.module").then(
            m => m.ReportDashboardModule
          )
      }
    ]
  },
  {
    path: "404",
    component: NotFoundComponent
  },
  {
    path: "**",
    redirectTo: "404"
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' }) ],
  exports: [ RouterModule ],
  providers: [ CountryResolver ]
})

export class AppRoutingModule { }