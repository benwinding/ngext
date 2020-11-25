import { AngularCompilerPlugin } from '@ngtools/webpack';
import ts from 'typescript';

export const dummyTransformer = <T extends ts.Node>(context: ts.TransformationContext) => {
  return (rootNode: ts.SourceFile) => {
    console.log('Transforming file: ' + rootNode.fileName);
    function visit(node: ts.Node): ts.Node {
      return ts.visitEachChild(node, visit, context);
    }
    return ts.visitNode(rootNode, visit);
  };
};

function findAngularCompilerPlugin(webpackCfg): AngularCompilerPlugin | null {
  return webpackCfg.plugins.find(plugin =>  plugin instanceof AngularCompilerPlugin);
}

// The AngularCompilerPlugin has nog public API to add transformations, user private API _transformers instead.
function addTransformerToAngularCompilerPlugin(acp, transformer): void {
  acp._transformers = [transformer, ...acp._transformers];
}

export default {
  pre() {
    // This hook is not used in our example
  },

  // This hook is used to manipulate the webpack configuration
  config(cfg) {
    // Find the AngularCompilerPlugin in the webpack configuration
    const angularCompilerPlugin = findAngularCompilerPlugin(cfg);

    if (!angularCompilerPlugin) {
      console.error('Could not inject the typescript transformer: Webpack AngularCompilerPlugin not found');
      return;
    }

    addTransformerToAngularCompilerPlugin(angularCompilerPlugin, dummyTransformer);
    return cfg;
  },

  post() {
    // This hook is not used in our example
  }
};