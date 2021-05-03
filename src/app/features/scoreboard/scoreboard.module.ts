import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ScoreBoardComponent } from "./pages/scoreboard.component";

const routes: Routes = [
    {
        path: "",
        component: ScoreBoardComponent
    }
];

@NgModule({
    declarations: [ScoreBoardComponent],
    imports: [CommonModule, RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ScoreBoardModule {}
