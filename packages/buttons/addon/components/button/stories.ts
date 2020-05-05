import { hbs } from 'ember-cli-htmlbars';

import { action } from '@storybook/addon-actions';
import { withDesign } from 'storybook-addon-designs';

export default {
  title: 'Components|Buttons/Button'
};

export const basic = () => {
  return {
    template: hbs`
      <Button {{invoke (fn this.invoke)}}>Button</Button>
      <Button disabled={{true}}>Disabled Button</Button>
    `,
    context: {
      invoke: action('button invoked')
    }
  };
};

basic.story = {
  decorators: [withDesign],
  parameters: {
    design: {
      type: 'figma',
      url:
        'https://www.figma.com/file/Fq29S0hD3i38bAjYz3wWwy/Components?node-id=106%3A9'
    }
  }
};

export const sizing = () => {
  return {
    template: hbs`
      <Button {{style fontSize="80%"}}>80% Font Size</Button>
      <Button>Normal</Button>
      <Button {{style fontSize="120%"}}>120% Font Size</Button>
      <Button {{style fontSize="150%"}}>150% Font Size</Button>
    `
  };
};

export const builder = () => {
  return {
    template: hbs`
    <Button {{invoke (fn this.invoke)}} as |b|>
      <b.Prefix>Prefix</b.Prefix>
      <b.Prefix>Prefix</b.Prefix>
      <b.Affix>affix</b.Affix>
      <b.Affix>affix</b.Affix>
      <b.Content>Button</b.Content>
      <b.Affix>affix</b.Affix>
      <b.Affix>affix</b.Affix>
      <b.Suffix>Suffix</b.Suffix>
      <b.Suffix>Suffix</b.Suffix>
    </Button>

    <Button disabled={{true}} as |b|>
      <b.Prefix>Prefix</b.Prefix>
      <b.Prefix>Prefix</b.Prefix>
      <b.Affix>affix</b.Affix>
      <b.Affix>affix</b.Affix>
      <b.Content>Disabled</b.Content>
      <b.Affix>affix</b.Affix>
      <b.Affix>affix</b.Affix>
      <b.Suffix>Suffix</b.Suffix>
      <b.Suffix>Suffix</b.Suffix>
    </Button>
    `,
    context: {
      invoke: action('button invoked')
    }
  };
};