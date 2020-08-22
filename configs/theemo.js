module.exports = {
  sync: {
    reader: {
      tool: 'figma',
      figmaFile: process.env.FIGMA_FILE,
      figmaSecret: process.env.FIGMA_SECRET,

      // referencer
      referencer: {
        type: 'figma-plugin',
        plugin: 'theemo',
        pluginConfig: {
          jsonbinFile: process.env.JSONBIN_FILE,
          jsonbinSecret: process.env.JSONBIN_SECRET,
          formats: {
            color: 'hex',
            colorAlpha: 'rgb'
          }
        }
      },

      // parser
      isTokenByStyle(style) {
        return style.name.includes('.') && style.name.includes('/');
      },

      isTokenByText(node) {
        return node.name.includes('[token]');
      },

      getNameFromText(node) {
        return node.name.replace('[token]', '').trim();
      }
    },
  
    // lexer
    lexer: {
      classifyToken(token) {
        const t = { ...token };
        t.type = t.name.startsWith('.') ? 'basic' : 'purpose';

        const contextIndex = t.name.indexOf('.$');
        if (contextIndex !== -1) {
          t.colorScheme = t.name.slice(contextIndex + 2);
          t.name = t.name.slice(0, contextIndex);
        }
        
        return t;
      },
      filterToken(token, tokens) {
        const hasColorSchemes = Boolean(tokens.classified.find(t => t.colorScheme && t.name === token.name));
        const isReference = !token.colorScheme && hasColorSchemes;
        
        return Boolean(token.type === 'purpose' && !isReference);
      },
      groupForToken(token) {
        return token.colorScheme ? token.colorScheme : 'base';
      }
    },

    // writer
    writer: {
      tool: 'style-dictionary',

      fileForToken(token) {
        const slashIndex = token.name.indexOf('/')
        return token.name.slice(0, slashIndex).replace(/\./g, '/');
      },

      pathForToken(token) {
        const path = token.name.replace('/', '.').split('.');

        if (token.colorScheme) {
          path.push(`$${token.colorScheme}`);
        }

        return path;
      }
    }
  },

  generate: {
    input: 'build',
    output: 'dist',
    auto: true,
    defaultColorScheme: 'light',
    colorSchemes: {
      light: {
        auto: true,
        manual: true
      },
      dark: {
        auto: true,
        manual: true
      }
    }
  }
};