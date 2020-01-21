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
      '@commitlint/prompt': '^8.3.5',
      commitizen: '^4.0.3',
      'cz-conventional-changelog': '^3.0.2',
      husky: '^3.0.9',
      lerna: '^3.18.3',
      'lint-staged': '^9.4.2'
    };
    const shouldRunInstallTask = true;
    return chain([
      addDepsToPackageJson(dependencies, devDependencies, shouldRunInstallTask),
      updatePackageJson(),
      updatePrettierrc(),
      mergeWith(apply(url('./files'), [move(host.root.path)]))
    ])(host, context);
  };
}

function updatePackageJson(): Rule {
  return updateJsonInTree('package.json', json => {
    const packageJson = {
      ...json,
      workspaces: ['apps/**', 'libs/**'],
      scripts: {
        ...json.scripts,
        '----- WORKSPACE SCRIPTS ---------': '',
        release: 'lerna version',
        commit: 'git-cz',
        '----- WORKSPACE SCRIPTS END -----': ''
      },
      config: {
        commitizen: {
          path: './node_modules/cz-conventional-changelog'
        }
      },
      husky: {
        hooks: {
          'commit-msg': 'commitlint -E HUSKY_GIT_PARAMS',
          'pre-commit': 'lint-staged'
        }
      },
      'lint-staged': {
        '*.{js,json,css,scss,less,md,ts,html,component.html}': [
          'prettier --write',
          'git add'
        ]
      }
    };

    return packageJson;
  });
}

function updatePrettierrc(): Rule {
  return updateJsonInTree('.prettierrc', json => {
    const prettierJson = {
      printWidth: 120,
      ...json,
      tabWidth: 2
    };
    return prettierJson;
  });
}
