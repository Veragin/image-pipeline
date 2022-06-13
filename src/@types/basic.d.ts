declare type TPoint = {
    x: number;
    y: number;
};

declare type TRect = {
    x: number;
    y: number;
    width: number;
    height: number;
};

declare type TSize = {
    width: number;
    height: number;
};

declare type TColor = {
    r: number;
    g: number;
    b: number;
    a: number;
};

declare type DeepPartial<T> = T extends object
    ? {
          [P in keyof T]?: DeepPartial<T[P]>;
      }
    : T;
