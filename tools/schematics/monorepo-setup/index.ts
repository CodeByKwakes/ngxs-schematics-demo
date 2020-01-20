import {
  apply,
  chain,
  mergeWith,
  move,
  Rule,
  SchematicContext,
  Tree,
  url
} from '@angular-devkit/schematics';

export default function(): Rule {
  return (host: Tree, context: SchematicContext) => {
    context.logger.debug('----- Monorepo Setup ------');
    return chain([mergeWith(apply(url('./files'), [move(host.root.path)]))])(
      host,
      context
    );
  };
}
