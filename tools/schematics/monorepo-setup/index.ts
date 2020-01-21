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
import { addDepsToPackageJson, updateJsonInTree } from '@nrwl/workspace';

export default function(): Rule {
  return (host: Tree, context: SchematicContext) => {
    context.logger.debug('----- Monorepo Setup ------');
    const dependencies = {};
    const devDependencies = {
      '@commitlint/cli': '^8.2.0',
      '@commitlint/config-conventional': '^8.2.0',
      '@commitlint/prompt': '*',
      commitizen: '^4.0.3',
      'cz-conventional-changelog': '^3.0.2',
      husky: '^3.0.9',
      lerna: '^3.18.3',
      'lint-staged': '^9.4.2'
    };
    const shouldRunInstallTask = true;
    return chain([
      addDepsToPackageJson(dependencies, devDependencies, shouldRunInstallTask),
      updateJsonInTree('package.json', json => {
        json.scripts['----- SCRIPTS ---------'] = '';
        json.scripts.release = 'lerna version';
        json.scripts.commit = 'git-cz';
        json.scripts['----- SCRIPTS END -----'] = '';
        return json;
      }),
      mergeWith(apply(url('./files'), [move(host.root.path)]))
    ])(host, context);
  };
}
