module powerbi.extensibility.visual {
    import DataViewObjectsParser = powerbi.extensibility.utils.dataview.DataViewObjectsParser;

    export class BehaviorSettings {
        public resizeX = true;
        public resizeY = true;
    }

    export class Settings extends DataViewObjectsParser {
        public behavior = new BehaviorSettings();
    }

}
