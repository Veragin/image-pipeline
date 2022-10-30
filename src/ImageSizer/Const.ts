import { TTubeColorConfig, TubeColor } from "./Tube/TubeColor";
import { TTubeCropConfig, TubeCrop } from "./Tube/TubeCrop";
import { TTubeCutConfig, TubeCut } from "./Tube/TubeCut";
import { TTubeDownloadConfig, TubeDownload } from "./Tube/TubeDownload";
import { TTubeDuplicateConfig, TubeDuplicate } from "./Tube/TubeDuplicate";
import { TTubeJoinConfig, TubeJoin } from "./Tube/TubeJoin";
import { TTubeMirrorConfig, TubeMirror } from "./Tube/TubeMirror";
import { TTubeObjectConfig, TubeObject } from "./Tube/TubeObject";
import { TTubeRenameConfig, TubeRename } from "./Tube/TubeRename";
import { TTubeRotateConfig, TubeRotate } from "./Tube/TubeRotate";
import { TTubeScaleConfig, TubeScale } from "./Tube/TubeScale";
import { TTubeSelectConfig, TubeSelect } from "./Tube/TubeSelect";

export const IMAGE_SIZER_TECHS = {
    select: TubeSelect,
    color: TubeColor,
    rename: TubeRename,
    object: TubeObject,
    download: TubeDownload,
    cut: TubeCut,
    crop: TubeCrop,
    scale: TubeScale,
    rotate: TubeRotate,
    mirror: TubeMirror,
    join: TubeJoin,
    duplicate: TubeDuplicate,
} as const;

export type TImageSizerTubeConfig =
    | {
          tube: "select";
          config: DeepPartial<TTubeSelectConfig>;
      }
    | {
          tube: "rename";
          config: DeepPartial<TTubeRenameConfig>;
      }
    | {
          tube: "object";
          config: DeepPartial<TTubeObjectConfig>;
      }
    | {
          tube: "download";
          config: DeepPartial<TTubeDownloadConfig>;
      }
    | {
          tube: "cut";
          config: DeepPartial<TTubeCutConfig>;
      }
    | {
          tube: "crop";
          config: DeepPartial<TTubeCropConfig>;
      }
    | {
          tube: "color";
          config: DeepPartial<TTubeColorConfig>;
      }
    | {
          tube: "scale";
          config: DeepPartial<TTubeScaleConfig>;
      }
    | {
          tube: "rotate";
          config: DeepPartial<TTubeRotateConfig>;
      }
    | {
          tube: "mirror";
          config: DeepPartial<TTubeMirrorConfig>;
      }
    | {
          tube: "join";
          config: DeepPartial<TTubeJoinConfig>;
      }
    | {
          tube: "duplicate";
          config: DeepPartial<TTubeDuplicateConfig>;
      };

export type TTemplate = {
    id: number;
    name: string;
    version: string;
    tubes: TImageSizerTubeConfig[];
};

export type TImageSizerTubeNames = keyof typeof IMAGE_SIZER_TECHS;
export const IMAGE_SIZER_TECH_NAMES = Object.keys(IMAGE_SIZER_TECHS) as TImageSizerTubeNames[];
export const IMAGE_SIZER_TECH_CLASSES = Object.values(IMAGE_SIZER_TECHS);

export const COLOR_PIPE_DARK = "#9a9ca5";
export const COLOR_PIPE_MEDIUM = "#a3a5ad";
export const COLOR_PRIMARY_MEDIUM = "#D692EF";
