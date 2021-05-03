import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
    {
        path: "game",
        loadChildren: () =>
            import("./features/game/game.module").then((m) => m.GameModule)
    },
    {
        path: "scoreboard",
        loadChildren: () =>
            import("./features/scoreboard/scoreboard.module").then((m) => m.ScoreBoardModule)
    },
    {
        path: "",
        loadChildren: () =>
            import("./features/menu/menu.module").then((m) => m.MenuModule)
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
