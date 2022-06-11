declare interface Window {
    editor: import('Service/Editor/Editor').default;
}

declare var _lang: import('LanguageStore').TLanguage;
declare var _: (s: string, ...args: (number | string)[]) => string;
