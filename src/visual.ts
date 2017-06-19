/*
 *  Power BI Visual CLI
 *
 *  Copyright (c) Microsoft Corporation
 *  All rights reserved.
 *  MIT License
 *
 *  Permission is hereby granted, free of charge, to any person obtaining a copy
 *  of this software and associated documentation files (the ""Software""), to deal
 *  in the Software without restriction, including without limitation the rights
 *  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 *  copies of the Software, and to permit persons to whom the Software is
 *  furnished to do so, subject to the following conditions:
 *
 *  The above copyright notice and this permission notice shall be included in
 *  all copies or substantial portions of the Software.
 *
 *  THE SOFTWARE IS PROVIDED *AS IS*, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 *  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 *  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 *  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 *  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 *  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 *  THE SOFTWARE.
 */

module powerbi.extensibility.visual {
    export class Visual implements IVisual {
        private viewModel?: ViewModel;
        private readonly host: IVisualHost;
        private readonly image: HTMLImageElement;

        constructor(options: VisualConstructorOptions) {
            this.image = options.element.ownerDocument.createElement("img");
            options.element.appendChild(this.image);
            this.host = options.host;
        }

        public update(options: VisualUpdateOptions) {
            try {
                const viewModel = this.viewModel = visualTransform(options, this.host);
                const settings = viewModel.settings;

                const width = options.viewport.width;
                const height = options.viewport.height;
                if (settings.behavior.resizeX) {
                    this.image.setAttribute("width", width + "px");
                } else {
                    this.image.removeAttribute("width");
                }

                if (settings.behavior.resizeY) {
                    this.image.setAttribute("height", height + "px");
                } else {
                    this.image.removeAttribute("height");
                }

                this.image.src = viewModel.url;
            }
            catch (ex) {
                console.warn(ex);
                throw ex;
            }
        }

        public enumerateObjectInstances(options: EnumerateVisualObjectInstancesOptions): VisualObjectInstanceEnumeration {
            try {
                const settings = this.viewModel ? this.viewModel.settings : Settings.getDefault() as Settings;
                const instanceEnumeration = Settings.enumerateObjectInstances(settings, options);
                return instanceEnumeration || [];
            }
            catch (ex) {
                console.warn(ex);
                throw ex;
            }
        }

    }
}