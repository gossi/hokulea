import fetch from 'node-fetch';
import Referencer from '../referencer';

interface StyleRef {
  from: {
    id: string;
    name: string;
  };
  to: {
    id: string;
    name: string;
  };
}

interface RefNode {
  node: string;
  fill?: StyleRef;
  stroke?: StyleRef;
  effect?: StyleRef;
}

interface ReferenceDoc {
  document: {
    id: string;
    name: string;
  };
  nodes: RefNode[];
}

interface Options {
  jsonbinFile: string;
  jsonbinSecret: string;
}

export default class StyleReferencer implements Referencer {
  private options: Options;
  private references!: ReferenceDoc;

  constructor(options: object) {
    this.options = options as Options;
  }

  async setup() {
    if (!this.references) {
      // read references from jsonbin.io
      const response = await fetch(
        `https://api.jsonbin.io/b/${this.options.jsonbinFile}`,
        {
          headers: {
            'secret-key': this.options.jsonbinSecret
          }
        }
      );
      this.references = await response.json();
    }
  }

  find(name: string, type: string): string | undefined {
    const nodeReference = this.references.nodes.find(node => {
      return (
        node[type as keyof RefNode] &&
        (node[type as keyof RefNode] as StyleRef)?.to.name === name
      );
    });

    if (nodeReference) {
      return (nodeReference[type as keyof RefNode] as StyleRef)?.from.name;
    }

    return undefined;
  }
}
