'use strict';

goog.provide('Blockly.Blocks.machine');

goog.require('Blockly.Blocks');
goog.require('Blockly.constants');
goog.require('Blockly.Colours');
goog.require('Blockly.ScratchBlocks.VerticalExtensions');

Blockly.Blocks['machine_result'] = {
  init: function() {
    this.jsonInit({
      message0: '%1',
      args0: [
        {
          type: 'field_variable_getter',
          text: '',
          name: 'MACHINE',
          variableTypes: [Blockly.MACHINE_VARIABLE_TYPE_RES]
        }
      ],
      colour: 210,
      category: Blockly.Categories.machine,
      extensions: ['colours_machine', 'output_string', 'contextMenu_getVariableBlock']
    });
  }
};

Blockly.Blocks['machine_var'] = {
  init: function() {
    this.jsonInit({
      // type: 'my_machine', // 积木标识符，如果和 Blockly.Blocks['my_machine'] 一致，则可以忽略
      message0: '%1 的相似度',
      lastDummyAlign0: 'CENTER',
      args0: [
        {
          // 参数类型，input_ 开头表示包含了一个 shadow block
          // 需要在 xml 中指明 shadow block 的 type
          type: 'field_variable',
          name: 'MACHINE', // 参数的名称
          variableTypes: [Blockly.MACHINE_VARIABLE_TYPE]
        }
      ],
      // checkboxInFlyout: true,
      colour: 210,
      category: Blockly.Categories.machine,   // 积木所属的分类，对应 xml 中 category 标签的 id
      extensions: ['colours_machine', 'output_string']
    });
  }
};

Blockly.Blocks['machine_varis'] = {
  init: function() {
    this.jsonInit({
      message0: '识别结果为 %1 ？',
      args0: [
        {
          type: 'field_variable',
          name: 'MACHINE',
          variableTypes: [Blockly.MACHINE_VARIABLE_TYPE]
        }
      ],
      colour: 210,
      category: Blockly.Categories.machine,
      extensions: ['colours_machine', 'output_boolean']
    });
  }
};
