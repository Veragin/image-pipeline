import { TTechColorConfig, TechColor } from './Tech/TechColor';
import { TTechCropConfig, TechCrop } from './Tech/TechCrop';
import { TTechCutConfig, TechCut } from './Tech/TechCut';
import { TTechDownloadConfig, TechDownload } from './Tech/TechDownload';
import { TTechJoinConfig, TechJoin } from './Tech/TechJoin';
import { TTechMirrorConfig, TechMirror } from './Tech/TechMirror';
import { TTechObjectConfig, TechObject } from './Tech/TechObject';
import { TTechRenameConfig, TechRename } from './Tech/TechRename';
import { TTechRotateConfig, TechRotate } from './Tech/TechRotate';
import { TTechScaleConfig, TechScale } from './Tech/TechScale';
import { TTechSelectConfig, TechSelect } from './Tech/TechSelect';

export const IMAGE_SIZER_TECHS = {
    select: TechSelect,
    color: TechColor,
    rename: TechRename,
    object: TechObject,
    download: TechDownload,
    cut: TechCut,
    crop: TechCrop,
    scale: TechScale,
    rotate: TechRotate,
    mirror: TechMirror,
    join: TechJoin,
} as const;

export type TImageSizerTechConfig =
    | {
          tech: 'select';
          config: DeepPartial<TTechSelectConfig>;
      }
    | {
          tech: 'rename';
          config: DeepPartial<TTechRenameConfig>;
      }
    | {
          tech: 'object';
          config: DeepPartial<TTechObjectConfig>;
      }
    | {
          tech: 'download';
          config: DeepPartial<TTechDownloadConfig>;
      }
    | {
          tech: 'cut';
          config: DeepPartial<TTechCutConfig>;
      }
    | {
          tech: 'crop';
          config: DeepPartial<TTechCropConfig>;
      }
    | {
          tech: 'color';
          config: DeepPartial<TTechColorConfig>;
      }
    | {
          tech: 'scale';
          config: DeepPartial<TTechScaleConfig>;
      }
    | {
          tech: 'rotate';
          config: DeepPartial<TTechRotateConfig>;
      }
    | {
          tech: 'mirror';
          config: DeepPartial<TTechMirrorConfig>;
      }
    | {
          tech: 'join';
          config: DeepPartial<TTechJoinConfig>;
      };

export type TRecept = {
    id: number;
    name: string;
    techs: TImageSizerTechConfig[];
};

export type TImageSizerTechNames = keyof typeof IMAGE_SIZER_TECHS;
export const IMAGE_SIZER_TECH_NAMES = Object.keys(IMAGE_SIZER_TECHS) as TImageSizerTechNames[];
export const IMAGE_SIZER_TECH_CLASSES = Object.values(IMAGE_SIZER_TECHS);
