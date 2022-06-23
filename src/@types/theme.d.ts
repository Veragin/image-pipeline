import * as createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import * as createPalette from "@material-ui/core/styles/createPalette";
import { DarkTheme as DT } from "./theme";
import "styled-components";

declare module "styled-components" {
    interface DarkTheme extends DT {}
}

interface Measurements {
    width: number;
    borderRadius: number;
    fontSize: number;
}
declare module "@mui/material/styles/createTheme" {
    interface Theme {
        measurements: Measurements;
    }
    interface ThemeOptions {
        measurements: Measurements;
    }
}
declare module "@mui/material/styles/createPalette" {
    interface PaletteOptions extends createPalette.PaletteOptions {
        input: {
            selected: string;
            hover: string;
            default: string;
            border: string;
        };
        backgr: {
            default: string;
            dark: string;
        };
    }
    interface Palette extends createPalette.Palette {}
}
export type DarkTheme = createMuiTheme.Theme;
