export const roundNumber = (n: number) => {
  return Math.round(n * 100) / 100;
};

export const convertToPercentString = (percent: number) =>
  roundNumber(percent * 100) + "%";

export const parsePercentFromString = (s: string) =>
  Number(/(\d+(\.\d+)?)/.exec(s)?.[0] ?? 0) / 100;

export const getPropertyNiceName = (propName: string) => {
  switch (propName) {
    case "x":
      return _("X");
    case "y":
      return _("Y");
    case "width":
      return _("Width");
    case "height":
      return _("Height");
    case "opacity":
      return _("Opacity");

    case "text":
      return _("Text");
    case "font":
      return _("Font");
    case "lineHeight":
      return _("Line height");
    case "fontSize":
      return _("Font size");
    case "strokeWidth":
      return _("Stroke width");

    default:
      _("Unknown");
  }
};
