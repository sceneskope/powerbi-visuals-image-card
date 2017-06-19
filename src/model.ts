module powerbi.extensibility.visual {
    export interface ViewModel {
        url: string|undefined;
        settings: Settings;
    }

    export function visualTransform(options: VisualUpdateOptions, host: IVisualHost): ViewModel {
        const dataViews = options.dataViews;
        if (!options.dataViews
            || !options.dataViews[0]
            || !options.dataViews[0].single
            || !options.dataViews[0].single.value) {
            return {
                url: undefined,
                settings: Settings.getDefault() as Settings
            };
        }

        const dataView = options.dataViews[0];
        const single = dataView.single;
        const url = single.value + "";
        const settings = Settings.parse<Settings>(dataView);
        return {
            settings: settings,
            url: url
        };

    }
}