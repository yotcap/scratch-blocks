/**
 *
 * author: jxn
 * date: 2020.03.20
 *
 *
 */

'use strict';

/**
 * @name Blockly.Machine
 * @namespace
 **/
goog.provide('Blockly.Machine');
goog.provide('Blockly.MachineDategory');

goog.require('Blockly.Blocks');
goog.require('Blockly.Variables');
// goog.require('Blockly.Events');
goog.require('Blockly.constants');

/**
 * Constant to separate procedure names from variables and generated functions
 * when running generators.
 * @deprecated Use Blockly.MACHINE_CATEGORY_NAME
 */
Blockly.Machine.NAME_TYPE = Blockly.MACHINE_CATEGORY_NAME;

Blockly.MachineDategory = function(workspace) {
  var xmlList = [];

  Blockly.Machine.addCreateButton(xmlList, workspace);

  var variableModelList = workspace.getVariablesOfType(Blockly.MACHINE_VARIABLE_TYPE_RES);
  
  if (variableModelList.length) {
    Blockly.Machine.addMachineVariableRes(xmlList, variableModelList[0]);
  }

  variableModelList = workspace.getVariablesOfType(Blockly.MACHINE_VARIABLE_TYPE);
  
  if (variableModelList.length) {
    Blockly.Machine.addMachineVariable(xmlList, variableModelList[0]);
    Blockly.Machine.addMachineVariableIs(xmlList, variableModelList[0]);
  }

  return xmlList;
};

Blockly.Machine.addMachineVariableRes = function(xmlList, variable) {
  Blockly.Machine.addBlock(xmlList, variable, 'machine_result', 'MACHINE');
  xmlList[xmlList.length - 1].setAttribute('id', variable.getId());
};

Blockly.Machine.addMachineVariable = function(xmlList, variable) {
  // <block id="variableId" type="machine_var">
  //    <field name="MACHINE">variablename</field>
  // </block>
  Blockly.Machine.addBlock(xmlList, variable, 'machine_var', 'MACHINE');
  xmlList[xmlList.length - 1].setAttribute('id', variable.getId());
};

Blockly.Machine.addMachineVariableIs = function(xmlList, variable) {
  Blockly.Machine.addBlock(xmlList, variable, 'machine_varis', 'MACHINE');
  xmlList[xmlList.length - 1].setAttribute('id', variable.getId());
};

Blockly.Machine.addBlock = function(xmlList, variable, blockType, fieldName) {
  if (Blockly.Blocks[blockType]) {
    var gap = 8;
    var blockText = '<xml>' +
      '<block type="' + blockType + '" gap="' + gap + '">' +
        Blockly.Variables.generateVariableFieldXml_(variable, fieldName) +
      '</block></xml>';
    var block = Blockly.Xml.textToDom(blockText).firstChild;
    xmlList.push(block);
  }
};

Blockly.Machine.init = function(workspace) {
  workspace.registerToolboxCategoryCallback(Blockly.MACHINE_CATEGORY_NAME, Blockly.MachineDategory);
};

/**
 * Construct a create variable button and push it to the xmlList.
 * @param {!Array.<!Element>} xmlList Array of XML block elements.
 * @param {Blockly.Workspace} workspace Workspace to register callback to.
 *
 */
Blockly.Machine.addCreateButton = function(xmlList, workspace) {
  var button = goog.dom.createDom('button');
  var callbackKey = 'CREATE_MACHINE_VARIABLE';
  var callback = function() {
    Blockly.Machine.machineOpenModalCallback();
  };
  button.setAttribute('text', Blockly.Msg.MACHINE_BTN_NAME);
  button.setAttribute('callbackKey', callbackKey);
  workspace.registerButtonCallback(callbackKey, callback);
  xmlList.push(button);
};

Blockly.Machine.createVariable = function(workspace, dmachine) {
  if (dmachine.classes) {
    workspace.createVariable('识别结果', Blockly.MACHINE_VARIABLE_TYPE_RES, null, false, false);
    for (var i = 0; i < dmachine.classes; i++) {
      workspace.createVariable(
          Blockly.Msg.MACHINE_VAR_NAME + (i + 1),
          Blockly.MACHINE_VARIABLE_TYPE, null, false, false);
    }
  }
  
};

/**
 * 打开 model
 * @public
 */
Blockly.Machine.machineOpenModalCallback = function() {
  // alert('External machine editor must be override Blockly.Machine.externalMachineDefCallback');
};
