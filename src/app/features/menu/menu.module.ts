import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { MenuComponent } from "./pages/menu.component";

const routes: Routes = [
    {
        path: "",
        component: MenuComponent
    }
];

@NgModule({
    declarations: [MenuComponent],
    imports: [CommonModule, RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MenuModule {}
