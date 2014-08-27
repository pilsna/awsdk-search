///////////////////////////////////////////////////////////////////////////
// Copyright © 2014 Esri. All Rights Reserved.
//
// Licensed under the Apache License Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//    http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
///////////////////////////////////////////////////////////////////////////

define([
        'dojo/_base/declare',
        'dijit/_WidgetsInTemplateMixin',
        'jimu/BaseWidgetSetting',
        'dijit/form/NumberTextBox',
        'dijit/form/TextBox'
    ],
    function(
        declare,
        _WidgetsInTemplateMixin,
        BaseWidgetSetting) {
        return declare([BaseWidgetSetting, _WidgetsInTemplateMixin], {
            //these two properties is defined in the BaseWidget
            baseClass: 'jimu-widget-awsdk-search-setting',

            startup: function() {
                this.inherited(arguments);
                this.setConfig(this.config);
            },

            setConfig: function(config) {
                this.config = config;
                if (config.searchHint) {
                    this.searchHint.set('value', config.searchHint);
                }
                if (config.popupTitle) {
                    this.popupTitle.set('value', config.popupTitle);
                }
                if (config.zoomLevel) {
                    this.zoomLevel.set('value', config.zoomLevel);
                }
            },

            getConfig: function() {
                if (!parseInt(this.zoomLevel.value)) {
                    alert(this.nls.warning);
                    return false;
                }
                this.config.zoomLevel = parseInt(this.zoomLevel.value);
                this.config.searchHint = this.searchHint.value;
                this.config.popupTitle = this.popupTitle.value;
                return this.config;
            }

        });
    });
