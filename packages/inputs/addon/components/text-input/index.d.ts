import Component from '@glimmer/component';

import { InputControl } from '@hokulea/inputs/components/input-builder';

export interface TextInputArgs extends InputControl {
  value: string;
  update: (value: string) => void;
}

export default class TextInputComponent extends Component<TextInputArgs> {}